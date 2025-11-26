import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, MapPin, Clock, DollarSign } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Order = Tables<'orders'>;

const ClientDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const featuredRestaurants = [
    { name: 'Yass Cooking', cuisine: 'Africain', eta: '20-30 min', rating: 4.8 },
    { name: 'Teranga Burger', cuisine: 'Fast-food', eta: '15-25 min', rating: 4.5 },
    { name: 'Noflaye Sushi', cuisine: 'Fusion', eta: '25-35 min', rating: 4.7 },
  ];
  const highlightedMenu = [
    { title: 'Thieb Bowl', price: '4 500 FCFA', description: 'Poisson grillé, riz rouge, légumes', tags: ['Épicé', 'Signature'] },
    { title: 'Burger Dakar', price: '3 200 FCFA', description: 'Boeuf local, sauce yassa, frites maison', tags: ['Combo', 'Halal'] },
    { title: 'Poké mangue', price: '5 000 FCFA', description: 'Saumon, mangue, avocat, sésame', tags: ['Healthy'] },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      preparing: 'bg-orange-500',
      ready: 'bg-green-500',
      in_delivery: 'bg-purple-500',
      delivered: 'bg-green-700',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mon Tableau de Bord</h1>
          <p className="text-muted-foreground">Gérez vos commandes et suivez vos livraisons</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Restaurants disponibles</CardTitle>
              <CardDescription>Sélectionnez une enseigne et explorez son menu.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {featuredRestaurants.map((restaurant) => (
                <div key={restaurant.name} className="rounded-lg border p-4 space-y-2 bg-muted/40">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{restaurant.name}</p>
                    <Badge variant="secondary">{restaurant.rating.toFixed(1)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                  <p className="text-xs text-muted-foreground">Livraison : {restaurant.eta}</p>
                  <Button variant="outline" size="sm" className="w-full">Voir le menu</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Suivi commande en direct</CardTitle>
              <CardDescription>Suivez l'état et la position du livreur.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-orange-400/20 to-amber-300/20 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#f97316_0,transparent_35%)] opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">Carte en temps réel</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Livreur</span>
                <Badge>Awa • 4 min</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-green-500" style={{ width: '65%' }} />
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>Préparation</span>
                <span className="font-semibold text-foreground">•</span>
                <span>En route</span>
                <span className="font-semibold text-primary">•</span>
                <span>Livraison imminente</span>
              </div>
              <Button className="w-full">Ouvrir le suivi</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Menus en vedette</CardTitle>
            <CardDescription>Détails des plats avant de valider votre commande.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {highlightedMenu.map((item) => (
              <div key={item.title} className="rounded-lg border p-4 space-y-2 bg-muted/30">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{item.title}</p>
                  <Badge variant="secondary">{item.price}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">Personnaliser</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.8fr] mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Composer ma commande</CardTitle>
              <CardDescription>Ajoutez des options et instructions avant paiement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dish">Plat</Label>
                  <Input id="dish" placeholder="Choisissez un plat" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="options">Options</Label>
                  <Input id="options" placeholder="Sauce, cuisson, extra" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Instructions</Label>
                <Input id="note" placeholder="Ex: pas de piment" />
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total estimé</span>
                <span className="text-lg font-semibold">6 700 FCFA</span>
              </div>
              <Button className="w-full">Valider la commande</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Historique rapide</CardTitle>
              <CardDescription>Retrouvez vos commandes préférées.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pastOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <Badge variant="secondary">{order.total_amount} FCFA</Badge>
                </div>
              ))}
              {pastOrders.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucun historique pour l'instant.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">
              Commandes en cours ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              Historique ({pastOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {loading ? (
              <Card><CardContent className="p-8 text-center">Chargement...</CardContent></Card>
            ) : activeOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucune commande en cours</p>
                  <Button className="mt-4">Commander maintenant</Button>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Commande #{order.id.slice(0, 8)}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      <Clock className="inline h-4 w-4 mr-1" />
                      {new Date(order.created_at).toLocaleString('fr-FR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{order.delivery_address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-semibold">{order.total_amount} FCFA</span>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full">Suivre la livraison</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pastOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Aucune commande dans l'historique</p>
                </CardContent>
              </Card>
            ) : (
              pastOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Commande #{order.id.slice(0, 8)}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(order.created_at).toLocaleString('fr-FR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{order.delivery_address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-semibold">{order.total_amount} FCFA</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
