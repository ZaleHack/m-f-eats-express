import { useMemo, useState, type FormEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, MapPin, Plus, Shield, Store, Utensils } from 'lucide-react';

const statusFlow = ['reçue', 'confirmée', 'en_preparation', 'prête', 'en_livraison', 'livrée'];

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  preparationTime: string;
  isAvailable: boolean;
};

type Order = {
  id: string;
  client: string;
  total: number;
  status: (typeof statusFlow)[number];
  items: string;
};

const RestaurantCreation = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    deliveryZones: '',
    openingHours: '',
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 'item-1', name: 'Yassa Poulet', price: 6500, category: 'Plats', preparationTime: '15 min', isAvailable: true },
    { id: 'item-2', name: 'Thiebou Dieun', price: 7500, category: 'Plats', preparationTime: '20 min', isAvailable: true },
    { id: 'item-3', name: 'Bissap', price: 1500, category: 'Boissons', preparationTime: '3 min', isAvailable: false },
  ]);
  const [orders, setOrders] = useState<Order[]>([
    { id: 'cmd-248', client: 'Awa Diop', total: 12500, status: 'confirmée', items: '2x Yassa, 1x Bissap' },
    { id: 'cmd-249', client: 'Khalil Ndiaye', total: 8900, status: 'en_preparation', items: '1x Thiebou Dieun' },
    { id: 'cmd-250', client: 'Fatou Sarr', total: 15000, status: 'prête', items: '2x Thiebou, 1x Bissap' },
  ]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    preparationTime: '',
  });

  const availabilityRate = useMemo(() => {
    if (menuItems.length === 0) return 0;
    const available = menuItems.filter((item) => item.isAvailable).length;
    return Math.round((available / menuItems.length) * 100);
  }, [menuItems]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simule la sauvegarde du restaurant côté back-office
  };

  const addMenuItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newItem.name || !newItem.price) return;
    const item: MenuItem = {
      id: crypto.randomUUID(),
      name: newItem.name,
      price: Number(newItem.price),
      category: newItem.category || 'Divers',
      preparationTime: newItem.preparationTime || '10 min',
      isAvailable: true,
    };

    setMenuItems((current) => [item, ...current]);
    setNewItem({ name: '', price: '', category: '', preparationTime: '' });
  };

  const toggleAvailability = (id: string) => {
    setMenuItems((current) =>
      current.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const advanceOrder = (id: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        const index = statusFlow.indexOf(order.status);
        const nextStatus = statusFlow[Math.min(index + 1, statusFlow.length - 1)];
        return { ...order, status: nextStatus };
      })
    );
  };

  const statusLabel = (status: Order['status']) => {
    switch (status) {
      case 'reçue':
        return 'Reçue';
      case 'confirmée':
        return 'Confirmée';
      case 'en_preparation':
        return 'En préparation';
      case 'prête':
        return 'Prête';
      case 'en_livraison':
        return 'En livraison';
      case 'livrée':
        return 'Livrée';
      default:
        return status;
    }
  };

  const nextStatusLabel = (status: Order['status']) => {
    const index = statusFlow.indexOf(status);
    return index < statusFlow.length - 1 ? statusLabel(statusFlow[index + 1]) : null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 mt-20 space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr] items-start">
          <div className="space-y-4">
            <Badge className="w-fit" variant="secondary">
              Nouveau parcours
            </Badge>
            <h1 className="text-4xl font-bold leading-tight">Créez votre restaurant et pilotez votre activité</h1>
            <p className="text-lg text-muted-foreground">
              Un espace unique pour configurer votre fiche, publier vos plats, suivre les commandes et coordonner les livreurs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">Commencer la création</Button>
              <Button size="lg" variant="outline">Parler à un expert</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Ouverture moyenne</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">15 min</div>
                  <p className="text-xs text-muted-foreground">Validation & menu en ligne</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Taux de disponibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{availabilityRate}%</div>
                  <p className="text-xs text-muted-foreground">Plats en stock</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Satisfaction client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">4,8</div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">Basé sur les dernières commandes</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="shadow-card border-primary/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">Checklist express</p>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">1</Badge>
                  Renseigner le profil (nom, adresse, zones de livraison)
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">2</Badge>
                  Publier au moins 3 plats dans votre carte
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">3</Badge>
                  Activer la gestion de commandes en temps réel
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">4</Badge>
                  Inviter vos livreurs ou activer le réseau M&F
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Assistance 7j/7 par chat et téléphone</p>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profil" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profil">Profil & opérations</TabsTrigger>
            <TabsTrigger value="menu">Menus</TabsTrigger>
            <TabsTrigger value="commandes">Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="profil" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Informations du restaurant</CardTitle>
                  <CardDescription>Préparez votre fiche publique avant publication.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom commercial</Label>
                        <Input
                          id="name"
                          placeholder="Ex: Teranga Lounge"
                          value={restaurantInfo.name}
                          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          placeholder="+221 77 000 00 00"
                          value={restaurantInfo.phone}
                          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          placeholder="Point E, Dakar"
                          value={restaurantInfo.address}
                          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zones">Zones desservies</Label>
                        <Input
                          id="zones"
                          placeholder="Plateau, Almadies, Mermoz..."
                          value={restaurantInfo.deliveryZones}
                          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, deliveryZones: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="opening">Horaires</Label>
                        <Input
                          id="opening"
                          placeholder="Lun-Dim 11h - 23h"
                          value={restaurantInfo.openingHours}
                          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, openingHours: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description courte</Label>
                        <Textarea
                          id="description"
                          rows={3}
                          placeholder="Cuisine sénégalaise authentique, plats faits maison"
                          value={restaurantInfo.description}
                          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button type="submit">Enregistrer le profil</Button>
                      <Button type="button" variant="outline">Prévisualiser la fiche</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Contrôle opérationnel</CardTitle>
                  <CardDescription>Activez vos canaux avant le lancement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="font-semibold">Commande en ligne</p>
                      <p className="text-sm text-muted-foreground">Acceptez automatiquement les commandes sur la zone définie.</p>
                    </div>
                    <Badge variant="secondary">Actif</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="font-semibold">Gestion des stocks</p>
                      <p className="text-sm text-muted-foreground">Recevez des alertes dès qu'un plat passe en rupture.</p>
                    </div>
                    <Badge variant="secondary">Automatique</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="font-semibold">Réseau livreurs</p>
                      <p className="text-sm text-muted-foreground">Choisissez vos coursiers internes ou ceux du réseau M&F.</p>
                    </div>
                    <Badge variant="secondary">2 options</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Créer le menu</CardTitle>
                  <CardDescription>Ajoutez vos plats, précisez la catégorie et le temps de préparation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addMenuItem} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="item-name">Nom du plat</Label>
                        <Input
                          id="item-name"
                          placeholder="Ex: Mafé boeuf"
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
                          placeholder="Plats, Entrées, Boissons"
                          value={newItem.category}
                          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-time">Temps de préparation</Label>
                        <Input
                          id="item-time"
                          placeholder="Ex: 12 min"
                          value={newItem.preparationTime}
                          onChange={(e) => setNewItem({ ...newItem, preparationTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter au menu
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Conseils menu</CardTitle>
                  <CardDescription>Optimisez vos ventes dès le lancement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <Utensils className="h-5 w-5 text-primary" />
                    3 à 5 plats phares avec photo augmentent le taux de conversion de 22%.
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    Renseignez un temps de préparation précis pour améliorer la ponctualité des livreurs.
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    Adaptez vos prix et disponibilité selon les zones de livraison les plus actives.
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Vos plats</CardTitle>
                <CardDescription>Activez ou désactivez la disponibilité en un clic.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                  <div key={item.id} className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge variant={item.isAvailable ? 'default' : 'secondary'}>
                        {item.isAvailable ? 'Disponible' : 'Indisponible'}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold">{item.price.toLocaleString('fr-FR')} FCFA</p>
                    <p className="text-xs text-muted-foreground">Préparation: {item.preparationTime}</p>
                    <Button size="sm" variant="outline" onClick={() => toggleAvailability(item.id)}>
                      {item.isAvailable ? 'Marquer en rupture' : 'Remettre en vente'}
                    </Button>
                  </div>
                ))}
                {menuItems.length === 0 && (
                  <div className="col-span-full rounded-lg border p-6 text-center text-muted-foreground">
                    Ajoutez vos premiers plats pour construire votre carte.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commandes" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Flux de commandes</CardTitle>
                <CardDescription>Suivez chaque étape de la réception à la livraison.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => {
                  const index = statusFlow.indexOf(order.status);
                  const progression = Math.round((index / (statusFlow.length - 1)) * 100);
                  const nextLabel = nextStatusLabel(order.status);

                  return (
                    <div key={order.id} className="rounded-lg border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">#{order.id}</p>
                        <Badge>{statusLabel(order.status)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.client} • {order.items}</p>
                      <p className="text-lg font-bold">{order.total.toLocaleString('fr-FR')} FCFA</p>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div className="h-2 bg-primary" style={{ width: `${progression}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Prochaine étape</span>
                        <span>{nextLabel ?? 'Livrée'}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => advanceOrder(order.id)} disabled={!nextLabel}>
                        {nextLabel ? `Marquer ${nextLabel.toLowerCase()}` : 'Terminée'}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Résumé opérationnel</CardTitle>
                <CardDescription>Visualisez vos priorités du jour.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Commandes actives</p>
                  <p className="text-3xl font-bold">{orders.filter((o) => o.status !== 'livrée').length}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Plats disponibles</p>
                  <p className="text-3xl font-bold">{menuItems.filter((m) => m.isAvailable).length}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Temps moyen</p>
                  <p className="text-3xl font-bold">14 min</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Taux de conformité</p>
                  <p className="text-3xl font-bold">96%</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantCreation;
