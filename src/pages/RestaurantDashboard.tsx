import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Store, ShoppingBag, Users } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Restaurant = Tables<'restaurants'>;
type Order = Tables<'orders'>;
type MenuItem = Tables<'menu_items'>;

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  const pendingOrders = orders.filter(o => ['pending', 'confirmed'].includes(o.status));

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
          <div className="grid gap-6 md:grid-cols-3 mb-8">
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
                    <CardContent>
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
              <div className="flex justify-end mb-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un plat
                </Button>
              </div>
              {menuItems.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Aucun élément au menu</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {menuItems.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="font-bold text-lg">{item.price} FCFA</div>
                        <Badge className="mt-2" variant={item.is_available ? 'default' : 'secondary'}>
                          {item.is_available ? 'Disponible' : 'Indisponible'}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="drivers">
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Gestion des livreurs à venir</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDashboard;
