import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Activity, Bike, DollarSign, Eye, ShoppingBag, Store, Users } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Order = Tables<'orders'>;
type Driver = Tables<'drivers'>;
type Restaurant = Tables<'restaurants'>;
type Profile = Tables<'profiles'>;

const formatCurrency = (value: number) => `${value.toLocaleString('fr-FR')} FCFA`;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalDrivers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [profilesRes, restaurantsRes, driversRes, ordersRes, customersRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('restaurants').select('*', { count: 'exact' }),
        supabase.from('drivers').select('*', { count: 'exact' }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('user_type', 'client'),
      ]);

      const ordersData = ordersRes.data || [];
      const restaurantsData = restaurantsRes.data || [];
      const driversData = driversRes.data || [];
      const customersData = customersRes.data || [];

      const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      setStats({
        totalUsers: profilesRes.count || customersData.length,
        totalRestaurants: restaurantsRes.count || restaurantsData.length,
        totalDrivers: driversRes.count || driversData.length,
        totalOrders: ordersData.length,
        totalRevenue,
      });

      setOrders(ordersData);
      setRestaurants(restaurantsData);
      setDrivers(driversData);
      setCustomers(customersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const statusBreakdown = useMemo(() => {
    return orders.reduce<Record<string, number>>((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);

  const revenueByRestaurant = useMemo(() => {
    const revenueMap = orders.reduce<Record<string, number>>((acc, order) => {
      acc[order.restaurant_id] = (acc[order.restaurant_id] || 0) + Number(order.total_amount || 0);
      return acc;
    }, {});

    return restaurants
      .map((restaurant) => ({
        ...restaurant,
        revenue: revenueMap[restaurant.id] || 0,
        orders: orders.filter((order) => order.restaurant_id === restaurant.id).length,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  }, [orders, restaurants]);

  const customerOrders = useMemo(() => {
    const orderCount = orders.reduce<Record<string, number>>((acc, order) => {
      acc[order.customer_id] = (acc[order.customer_id] || 0) + 1;
      return acc;
    }, {});

    return customers
      .map((customer) => ({
        ...customer,
        orderCount: orderCount[customer.id] || 0,
      }))
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 8);
  }, [customers, orders]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Administration</h1>
          <p className="text-muted-foreground">Vue d'ensemble complète des commandes, livreurs, clients et restaurants</p>
        </div>

        {loading ? (
          <Card><CardContent className="p-8 text-center">Chargement...</CardContent></Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Restaurants</CardTitle>
                  <Store className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRestaurants}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Livreurs</CardTitle>
                  <Bike className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDrivers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">Ticket moyen {formatCurrency(Math.round(stats.totalRevenue / Math.max(1, stats.totalOrders)))}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-8">
              <Card className="shadow-card lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Flux temps réel</CardTitle>
                    <p className="text-sm text-muted-foreground">Suivi rapide des statuts et priorités</p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-2"><Activity className="h-4 w-4" />Live</Badge>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'En attente', value: statusBreakdown.pending || 0, tone: 'bg-yellow-100 text-yellow-800' },
                    { label: 'En préparation', value: statusBreakdown.preparing || 0, tone: 'bg-orange-100 text-orange-800' },
                    { label: 'En livraison', value: statusBreakdown.in_delivery || 0, tone: 'bg-blue-100 text-blue-800' },
                    { label: 'Livrées', value: statusBreakdown.delivered || 0, tone: 'bg-green-100 text-green-800' },
                    { label: 'Confirmées', value: statusBreakdown.confirmed || 0, tone: 'bg-primary/10 text-primary' },
                    { label: 'Annulées', value: statusBreakdown.cancelled || 0, tone: 'bg-red-100 text-red-800' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border p-3 bg-muted/40">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xl font-semibold">{item.value}</span>
                        <span className={`text-[10px] px-2 py-1 rounded-full ${item.tone}`}>Statut</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Gains par restaurant</CardTitle>
                  <p className="text-sm text-muted-foreground">Répartition des commissions et volumes</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {revenueByRestaurant.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-start justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-semibold">{restaurant.name}</p>
                        <p className="text-xs text-muted-foreground">{restaurant.orders} commandes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatCurrency(restaurant.revenue)}</p>
                        <p className="text-[10px] text-muted-foreground">{restaurant.is_active ? 'Actif' : 'En pause'}</p>
                      </div>
                    </div>
                  ))}
                  {revenueByRestaurant.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">Aucun chiffre pour le moment</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="drivers">Livreurs</TabsTrigger>
                <TabsTrigger value="customers">Clients</TabsTrigger>
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Toutes les commandes</CardTitle>
                      <p className="text-sm text-muted-foreground">Historique et statut des commandes</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-2"><Eye className="h-4 w-4" />Vue détaillée</Badge>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Paiement</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono">#{order.id.slice(0, 8)}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleString('fr-FR')}</TableCell>
                            <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                            <TableCell>
                              <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'cancelled' ? 'destructive' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>
                                {order.payment_status || order.payment_method}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        {orders.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              Aucune commande enregistrée pour le moment
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drivers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Livreurs et disponibilité</CardTitle>
                    <p className="text-sm text-muted-foreground">Suivi des performances et statuts de connexion</p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Livreur</TableHead>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Livraisons</TableHead>
                          <TableHead>Note</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {drivers.map((driver) => (
                          <TableRow key={driver.id}>
                            <TableCell className="font-medium">{driver.user_id.slice(0, 8)}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{driver.vehicle_type || 'Non renseigné'}</TableCell>
                            <TableCell>{driver.total_deliveries ?? 0}</TableCell>
                            <TableCell>{driver.rating ? `${driver.rating.toFixed(1)}/5` : 'N/A'}</TableCell>
                            <TableCell>
                              <Badge variant={driver.is_available ? 'default' : 'secondary'}>
                                {driver.is_available ? 'Disponible' : 'Occupé'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        {drivers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">Aucun livreur enregistré</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Clients fidèles</CardTitle>
                    <p className="text-sm text-muted-foreground">Volume de commandes et contact</p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Commandes</TableHead>
                          <TableHead>Dernière activité</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerOrders.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.full_name}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{customer.orderCount} commandes</Badge>
                            </TableCell>
                            <TableCell>{new Date(customer.updated_at).toLocaleDateString('fr-FR')}</TableCell>
                          </TableRow>
                        ))}
                        {customerOrders.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">Aucun client enregistré</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="restaurants" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Réseau de restaurants</CardTitle>
                    <p className="text-sm text-muted-foreground">Coordonnées, statut et volume</p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Adresse</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Gains</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {restaurants.map((restaurant) => (
                          <TableRow key={restaurant.id}>
                            <TableCell className="font-medium">{restaurant.name}</TableCell>
                            <TableCell>{restaurant.address}</TableCell>
                            <TableCell>{restaurant.phone}</TableCell>
                            <TableCell>{formatCurrency(revenueByRestaurant.find((r) => r.id === restaurant.id)?.revenue || 0)}</TableCell>
                            <TableCell>
                              <Badge variant={restaurant.is_active ? 'default' : 'secondary'}>
                                {restaurant.is_active ? 'Actif' : 'Inactif'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        {restaurants.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">Aucun restaurant actif</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Commissions & règles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="commission">Commission plateforme (%)</Label>
                    <Input id="commission" type="number" defaultValue={15} min={0} max={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-fee">Frais de livraison minimum (FCFA)</Label>
                    <Input id="delivery-fee" type="number" defaultValue={1000} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-min">Montant minimum de commande</Label>
                    <Input id="order-min" type="number" defaultValue={3500} />
                  </div>
                  <Button className="w-full">Mettre à jour</Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Support utilisateur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="support-email">File de support prioritaire</Label>
                    <Input id="support-email" type="email" placeholder="support@mf-eats.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-note">Notes internes</Label>
                    <Textarea id="support-note" rows={4} placeholder="Résumé des tickets critiques en cours" />
                  </div>
                  <Button variant="outline" className="w-full">Ouvrir le centre d'aide</Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Gestion des accès</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[{ role: 'Admin', count: stats.totalUsers }, { role: 'Restaurant', count: stats.totalRestaurants }, { role: 'Livreur', count: stats.totalDrivers }].map((item) => (
                    <div key={item.role} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-semibold">{item.role}</p>
                        <p className="text-xs text-muted-foreground">{item.count} comptes</p>
                      </div>
                      <Badge variant="secondary">Actif</Badge>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full">Gérer les rôles avancés</Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
