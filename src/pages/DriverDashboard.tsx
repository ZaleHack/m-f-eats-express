import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bike, CheckCircle, MapPin, Package } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Driver = Tables<'drivers'>;
type Delivery = Tables<'deliveries'>;

const DriverDashboard = () => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: driverData } = await supabase
        .from('drivers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (driverData) {
        setDriver(driverData);

        const { data: deliveriesData } = await supabase
          .from('deliveries')
          .select('*')
          .eq('driver_id', driverData.id)
          .order('created_at', { ascending: false });

        if (deliveriesData) setDeliveries(deliveriesData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const activeDeliveries = deliveries.filter(d => !['delivered'].includes(d.status));
  const completedDeliveries = deliveries.filter(d => d.status === 'delivered');

  const toggleAvailability = async () => {
    if (!driver) return;
    
    const { error } = await supabase
      .from('drivers')
      .update({ is_available: !driver.is_available })
      .eq('id', driver.id);

    if (!error) {
      setDriver({ ...driver, is_available: !driver.is_available });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tableau de Bord Livreur</h1>
          <p className="text-muted-foreground">Gérez vos livraisons et votre disponibilité</p>
        </div>

        {loading ? (
          <Card><CardContent className="p-8 text-center">Chargement...</CardContent></Card>
        ) : !driver ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bike className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Vous n'êtes pas encore inscrit comme livreur</p>
              <Button>Devenir livreur</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="availability"
                      checked={driver.is_available || false}
                      onCheckedChange={toggleAvailability}
                    />
                    <Label htmlFor="availability">
                      {driver.is_available ? 'Disponible' : 'Indisponible'}
                    </Label>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Livraisons actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeDeliveries.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total livraisons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{driver.total_deliveries || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{driver.rating || 0}/5</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">
                  Livraisons en cours ({activeDeliveries.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Terminées ({completedDeliveries.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeDeliveries.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Aucune livraison en cours</p>
                    </CardContent>
                  </Card>
                ) : (
                  activeDeliveries.map((delivery) => (
                    <Card key={delivery.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Livraison #{delivery.id.slice(0, 8)}</CardTitle>
                          <Badge>{delivery.status}</Badge>
                        </div>
                        <CardDescription>
                          {new Date(delivery.created_at).toLocaleString('fr-FR')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button className="w-full">
                          <MapPin className="mr-2 h-4 w-4" />
                          Voir l'itinéraire
                        </Button>
                        <Button className="w-full" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marquer comme livrée
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedDeliveries.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">Aucune livraison terminée</p>
                    </CardContent>
                  </Card>
                ) : (
                  completedDeliveries.map((delivery) => (
                    <Card key={delivery.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Livraison #{delivery.id.slice(0, 8)}</CardTitle>
                          <Badge className="bg-green-500">Livrée</Badge>
                        </div>
                        <CardDescription>
                          Livrée le {new Date(delivery.delivered_at || '').toLocaleString('fr-FR')}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DriverDashboard;
