import { useEffect, useState } from 'react';
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
import { Users, Store, Bike, DollarSign, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalDrivers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [
        { count: usersCount },
        { count: restaurantsCount },
        { count: driversCount },
        { data: ordersData },
        { data: restaurantsData },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('restaurants').select('*', { count: 'exact', head: true }),
        supabase.from('drivers').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('restaurants').select('*').limit(10),
      ]);

      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalRestaurants: restaurantsCount || 0,
        totalDrivers: driversCount || 0,
        totalOrders: ordersData?.length || 0,
        totalRevenue,
      });

      setOrders(ordersData || []);
      setRestaurants(restaurantsData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Administration</h1>
          <p className="text-muted-foreground">Vue d'ensemble et gestion de la plateforme</p>
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
                  <div className="text-2xl font-bold">{stats.totalRevenue} FCFA</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList>
                <TabsTrigger value="orders">Commandes récentes</TabsTrigger>
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Dernières commandes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono">#{order.id.slice(0, 8)}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleDateString('fr-FR')}</TableCell>
                            <TableCell>{order.total_amount} FCFA</TableCell>
                            <TableCell>
                              <Badge>{order.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="restaurants">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurants actifs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Adresse</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {restaurants.map((restaurant) => (
                          <TableRow key={restaurant.id}>
                            <TableCell className="font-medium">{restaurant.name}</TableCell>
                            <TableCell>{restaurant.address}</TableCell>
                            <TableCell>{restaurant.phone}</TableCell>
                            <TableCell>
                              <Badge variant={restaurant.is_active ? 'default' : 'secondary'}>
                                {restaurant.is_active ? 'Actif' : 'Inactif'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
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
