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
type Mission = {
  id: string;
  restaurant: string;
  address: string;
  payout: string;
  distance: string;
  status: 'en_attente' | 'acceptee' | 'refusee';
};

const DriverDashboard = () => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState<Mission[]>([
    { id: 'MSN-8723', restaurant: 'Yass Cooking', address: 'Fann Hock, Dakar', payout: '1 800 FCFA', distance: '3.2 km', status: 'en_attente' },
    { id: 'MSN-8724', restaurant: 'Teranga Burger', address: 'Plateau, Dakar', payout: '2 200 FCFA', distance: '4.5 km', status: 'en_attente' },
  ]);

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
  const pendingMissions = missions.filter((mission) => mission.status === 'en_attente');

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

  const updateMission = (id: string, status: Mission['status']) => {
    setMissions((current) => current.map((mission) => mission.id === id ? { ...mission, status } : mission));
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

            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Missions disponibles</CardTitle>
                  <CardDescription>Acceptez ou refusez les livraisons proposées en direct.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingMissions.length === 0 && (
                    <p className="text-sm text-muted-foreground">Aucune mission en attente.</p>
                  )}
                  {pendingMissions.map((mission) => (
                    <div key={mission.id} className="rounded-lg border p-4 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{mission.id}</p>
                        <p className="font-semibold">{mission.restaurant}</p>
                        <p className="text-sm text-muted-foreground">{mission.address}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary">{mission.distance}</Badge>
                          <Badge className="bg-green-500/80">{mission.payout}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" onClick={() => updateMission(mission.id, 'acceptee')}>Accepter</Button>
                        <Button size="sm" variant="outline" onClick={() => updateMission(mission.id, 'refusee')}>
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suivi GPS</CardTitle>
                  <CardDescription>Visualisez l'itinéraire de vos livraisons en cours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-primary/20 via-purple-400/20 to-green-400/20 relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#22c55e_0,transparent_45%)] opacity-60" />
                      <div className="absolute inset-4 border-2 border-white/50 rounded-xl" />
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                        Carte en direct
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prochaine étape</span>
                    <Badge>Retrait restaurant</Badge>
                  </div>
                  <Button className="w-full" variant="outline">
                    Ouvrir la navigation
                  </Button>
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
