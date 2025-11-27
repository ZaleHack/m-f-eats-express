import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Store, ShoppingBag, Users } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Restaurant = Tables<'restaurants'>;
type Order = Tables<'orders'>;
type MenuItem = Tables<'menu_items'>;
type DriverOverview = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  zones: string;
  isAvailable: boolean;
};

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [driverPool, setDriverPool] = useState<DriverOverview[]>([
    { id: 'drv-01', name: 'Awa Diop', phone: '+221770000001', vehicle: 'Moto', zones: 'Plateau, Point E', isAvailable: true },
    { id: 'drv-02', name: 'Moussa Fall', phone: '+221780000002', vehicle: 'Scooter', zones: 'Almadies, Ouakam', isAvailable: false },
    { id: 'drv-03', name: 'Khady Sow', phone: '+221760000003', vehicle: 'Vélo', zones: 'Fann, Mermoz', isAvailable: true },
  ]);
  const [assignedDrivers, setAssignedDrivers] = useState<DriverOverview[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imagePreview: '',
    isAvailable: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: restaurantData } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (restaurantData) {
        setRestaurant(restaurantData);

        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('restaurant_id', restaurantData.id)
          .order('created_at', { ascending: false });

        const { data: menuData } = await supabase
          .from('menu_items')
          .select('*')
          .eq('restaurant_id', restaurantData.id);

        if (ordersData) setOrders(ordersData);
        if (menuData) setMenuItems(menuData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setNewItem((current) => ({ ...current, imagePreview: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddMenuItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!restaurant || !newItem.name || !newItem.price) return;

    setSaving(true);
    const { data, error } = await supabase
      .from('menu_items')
      .insert({
        name: newItem.name,
        description: newItem.description,
        price: Number(newItem.price),
        category: newItem.category || 'Divers',
        image_url: newItem.imagePreview || null,
        is_available: newItem.isAvailable,
        options: null,
        restaurant_id: restaurant.id,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Erreur lors de l'ajout",
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setMenuItems((items) => [data, ...items]);
      toast({ title: 'Plat ajouté', description: `${data.name} a été ajouté au menu.` });
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: '',
        imagePreview: '',
        isAvailable: true,
      });
    }

    setSaving(false);
  };

  const toggleAvailability = async (id: string) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    if (!item) return;

    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available })
      .eq('id', id);

    if (error) {
      toast({
        title: "Impossible de mettre à jour",
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    setMenuItems((items) =>
      items.map((menuItem) =>
        menuItem.id === id
          ? { ...menuItem, is_available: !menuItem.is_available, updated_at: new Date().toISOString() }
          : menuItem
      )
    );
  };

  const removeMenuItem = async (id: string) => {
    const { error } = await supabase.from('menu_items').delete().eq('id', id);

    if (error) {
      toast({
        title: "Suppression impossible",
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    setMenuItems((items) => items.filter((item) => item.id !== id));
    toast({ title: 'Plat supprimé', description: 'Le plat a été retiré du menu.' });
  };

  const assignDriver = (driverId: string) => {
    const driver = driverPool.find((d) => d.id === driverId);
    if (!driver) return;
    setAssignedDrivers((current) => [...current, driver]);
    setDriverPool((current) => current.filter((d) => d.id !== driverId));
  };

  const unassignDriver = (driverId: string) => {
    const driver = assignedDrivers.find((d) => d.id === driverId);
    if (!driver) return;
    setDriverPool((current) => [driver, ...current]);
    setAssignedDrivers((current) => current.filter((d) => d.id !== driverId));
  };

  const pendingOrders = orders.filter(o => ['pending', 'confirmed'].includes(o.status));
  const getOrderStep = (status: string) => {
    const steps = ['pending', 'confirmed', 'preparing', 'ready', 'in_delivery', 'delivered'];
    const index = steps.indexOf(status);
    return index === -1 ? 0 : index;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {restaurant?.name || 'Mon Restaurant'}
          </h1>
          <p className="text-muted-foreground">Gérez votre restaurant, menu et commandes</p>
        </div>

        {loading ? (
          <Card><CardContent className="p-8 text-center">Chargement...</CardContent></Card>
        ) : !restaurant ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Vous n'avez pas encore créé de restaurant</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Créer mon restaurant
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Commandes en attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pendingOrders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Éléments au menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{menuItems.length}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Profil restaurant</CardTitle>
                  <CardDescription>Mettez à jour vos horaires, contacts et zones de livraison.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nom commercial</span>
                    <span className="font-semibold">{restaurant.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-semibold">{restaurant.phone || '+221 77 000 00 00'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Adresse</span>
                    <span className="font-semibold text-right">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Statut</span>
                    <Badge variant={restaurant.is_active ? 'default' : 'secondary'}>
                      {restaurant.is_active ? 'Ouvert' : 'Fermé'}
                    </Badge>
                  </div>
                  <Button className="w-full" variant="outline">Mettre à jour le profil</Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Flux de commandes en temps réel</CardTitle>
                  <CardDescription>Visualisez immédiatement chaque nouvelle commande.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="rounded-lg border p-4 bg-muted/40">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                        <Badge>{order.status}</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 bg-gradient-to-r from-primary to-purple-600"
                          style={{ width: `${(getOrderStep(order.status) / 5) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(order.created_at).toLocaleTimeString('fr-FR')} • Validation, préparation puis passage au livreur
                      </p>
                    </div>
                  ))}
                  {pendingOrders.length === 0 && (
                    <p className="text-sm text-muted-foreground">En attente de nouvelles commandes...</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {restaurant && (
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="menu">
                <Store className="mr-2 h-4 w-4" />
                Menu
              </TabsTrigger>
              <TabsTrigger value="drivers">
                <Users className="mr-2 h-4 w-4" />
                Livreurs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {pendingOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Aucune commande en attente</p>
                  </CardContent>
                </Card>
              ) : (
                pendingOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Commande #{order.id.slice(0, 8)}</CardTitle>
                        <Badge>{order.status}</Badge>
                      </div>
                      <CardDescription>
                        {new Date(order.created_at).toLocaleString('fr-FR')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 bg-gradient-to-r from-primary to-green-500"
                          style={{ width: `${(getOrderStep(order.status) / 5) * 100}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Validation', 'Préparation', 'Prêt', 'Livreur', 'Livré'].map((label, index) => (
                          <Badge key={label} variant={getOrderStep(order.status) >= index ? 'default' : 'secondary'}>
                            {label}
                          </Badge>
                        ))}
                      </div>
                      <Separator />
                      <div className="grid gap-3 md:grid-cols-2">
                        <Button variant="outline">Valider la préparation</Button>
                        <Button variant="outline">Marquer prêt pour livraison</Button>
                        <Button variant="outline">Notifier un livreur</Button>
                        <Button variant="outline">Afficher le suivi en direct</Button>
                      </div>
                      <div className="flex gap-2">
                        <Button>Accepter</Button>
                        <Button variant="outline">Refuser</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="menu" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Ajouter un plat</CardTitle>
                    <CardDescription>
                      Remplissez les détails et ajoutez une image pour publier rapidement sur votre carte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleAddMenuItem}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="item-name">Nom du plat</Label>
                          <Input
                            id="item-name"
                            placeholder="Ex: Bowl sénégalais"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item-price">Prix (FCFA)</Label>
                          <Input
                            id="item-price"
                            type="number"
                            min="0"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item-category">Catégorie</Label>
                          <Input
                            id="item-category"
                            placeholder="Plats, Desserts, Boissons"
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item-availability">Disponibilité</Label>
                          <div className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                            <Badge variant={newItem.isAvailable ? 'default' : 'secondary'}>
                              {newItem.isAvailable ? 'Disponible' : 'Indisponible'}
                            </Badge>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => setNewItem({ ...newItem, isAvailable: !newItem.isAvailable })}
                            >
                              Basculer
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-description">Description</Label>
                        <Textarea
                          id="item-description"
                          placeholder="Ingrédients, sauce ou accompagnement"
                          value={newItem.description}
                          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-image">Image du plat</Label>
                        <Input id="item-image" type="file" accept="image/*" onChange={handleImageUpload} />
                        {newItem.imagePreview && (
                          <div className="overflow-hidden rounded-lg border">
                            <img src={newItem.imagePreview} alt="Aperçu du plat" className="h-40 w-full object-cover" />
                          </div>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={saving}>
                        <Plus className="mr-2 h-4 w-4" /> {saving ? 'Publication...' : 'Publier le plat'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mes plats</CardTitle>
                    <CardDescription>Activez ou désactivez la disponibilité et mettez à jour vos visuels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {menuItems.length === 0 ? (
                      <div className="rounded-lg border p-6 text-center text-muted-foreground">
                        Vous n'avez encore aucun plat. Ajoutez votre première recette ci-contre.
                      </div>
                    ) : (
                      <div className="grid gap-3 md:grid-cols-2">
                        {menuItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="h-32 w-full bg-muted">
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                  Aucune image
                                </div>
                              )}
                            </div>
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <CardTitle className="text-lg">{item.name}</CardTitle>
                                  <CardDescription>{item.description}</CardDescription>
                                  <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                <Badge variant={item.is_available ? 'default' : 'secondary'}>
                                  {item.is_available ? 'Disponible' : 'Indisponible'}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold">{Number(item.price).toLocaleString()} FCFA</span>
                                <span className="text-xs text-muted-foreground">Maj {new Date(item.updated_at).toLocaleDateString('fr-FR')}</span>
                              </div>
                              <Separator />
                              <div className="flex flex-wrap items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => toggleAvailability(item.id)}>
                                  {item.is_available ? 'Marquer indisponible' : 'Remettre en vente'}
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => removeMenuItem(item.id)}>
                                  Supprimer
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="drivers">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Livreurs associés ({assignedDrivers.length})</CardTitle>
                    <CardDescription>Autorisez l'accès à vos commandes en temps réel.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignedDrivers.length === 0 && (
                      <p className="text-sm text-muted-foreground">Aucun livreur associé pour le moment.</p>
                    )}
                    {assignedDrivers.map((driver) => (
                      <div key={driver.id} className="rounded-lg border p-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">{driver.phone} • {driver.vehicle}</p>
                          <p className="text-xs text-muted-foreground">Zones : {driver.zones}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge variant={driver.isAvailable ? 'default' : 'secondary'}>
                            {driver.isAvailable ? 'Disponible' : 'En pause'}
                          </Badge>
                          <Button size="sm" variant="ghost" onClick={() => unassignDriver(driver.id)}>
                            Retirer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Associer un livreur</CardTitle>
                    <CardDescription>Connectez vos coursiers internes ou freelances.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {driverPool.map((driver) => (
                      <div key={driver.id} className="rounded-lg border p-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">{driver.phone} • {driver.vehicle}</p>
                          <p className="text-xs text-muted-foreground">Zones : {driver.zones}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge variant={driver.isAvailable ? 'default' : 'secondary'}>
                            {driver.isAvailable ? 'Disponible' : 'En pause'}
                          </Badge>
                          <Button size="sm" onClick={() => assignDriver(driver.id)}>
                            Associer
                          </Button>
                        </div>
                      </div>
                    ))}
                    {driverPool.length === 0 && (
                      <p className="text-sm text-muted-foreground">Tous vos livreurs sont déjà associés.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDashboard;
