import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock3, Compass, ListChecks, Map, PackageCheck, Radar, ShieldCheck, Smartphone } from "lucide-react";

const Drivers = () => {
  const missions = [
    {
      title: "Gestion de planning",
      description: "Activez ou mettez en pause votre disponibilité et recevez les missions adaptées à votre zone.",
      icon: Clock3,
    },
    {
      title: "File d'attente intelligente",
      description: "Les commandes prioritaires apparaissent en premier avec les détails de retrait et de livraison.",
      icon: Radar,
    },
    {
      title: "Navigation guidée",
      description: "Ouvrez l'itinéraire en un clic et suivez les étapes pickup, livraison et validation.",
      icon: Compass,
    },
  ];

  const menuSteps = [
    {
      title: "Menus synchronisés",
      description: "Les cartes des restaurants se mettent à jour automatiquement pour éviter les articles indisponibles.",
    },
    {
      title: "Instructions claires",
      description: "Allergènes, options choisies et mode de remise sont affichés avant de récupérer la commande.",
    },
    {
      title: "Confirmation en photo",
      description: "Ajoutez une preuve de dépôt pour valider la livraison et rassurer le client.",
    },
  ];

  const orderTabs = [
    {
      id: "en-cours",
      label: "En cours",
      description: "Commandes que vous avez acceptées avec l'itinéraire et le timing.",
      items: [
        {
          title: "Retrait - Yass Cooking",
          details: "Commande prête, récupérer au comptoir 2",
          status: "À récupérer",
        },
        {
          title: "Livraison - Plateau",
          details: "Client disponible, appeler en cas de retard",
          status: "En route",
        },
      ],
    },
    {
      id: "a-venir",
      label: "À venir",
      description: "Missions proposées avec la distance, les gains et l'heure estimée.",
      items: [
        {
          title: "Mission 12h40 - Teranga Burger",
          details: "4,5 km • 2 200 FCFA",
          status: "Proposée",
        },
        {
          title: "Mission 13h10 - Bowl Factory",
          details: "3,1 km • 1 900 FCFA",
          status: "Proposée",
        },
      ],
    },
    {
      id: "terminees",
      label: "Terminées",
      description: "Historique détaillé avec les gains et les notes clients.",
      items: [
        {
          title: "Livraison validée",
          details: "Dépôt sans contact confirmé • +2 100 FCFA",
          status: "Complétée",
        },
        {
          title: "Commande groupée",
          details: "2 arrêts livrés • +3 500 FCFA",
          status: "Complétée",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-12">
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Espace livreurs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Gérez vos missions, menus et commandes en un seul endroit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Suivi en temps réel, navigation intégrée, consignes détaillées : tout est pensé pour livrer plus
              vite et en toute sécurité.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gradient-hero text-white">Disponibilités en direct</Badge>
              <Badge variant="secondary">Notifications push</Badge>
              <Badge variant="secondary">Support 7j/7</Badge>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90" asChild>
                <a href="/dashboard/driver">Ouvrir le dashboard</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/become-driver">Devenir livreur</a>
              </Button>
            </div>
          </div>
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Vue rapide</CardTitle>
              <CardDescription>Temps réel sur vos missions et vos zones actives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                {["Disponible", "En pause", "Occupé"].map((label) => (
                  <div key={label} className="p-4 rounded-xl border bg-muted/30 text-center">
                    <p className="text-sm text-muted-foreground">Statut</p>
                    <p className="font-semibold">{label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border p-4 bg-gradient-to-br from-primary/10 via-background to-muted/50">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Alertes livraison</p>
                    <p className="font-semibold">Nouvelles commandes à proximité</p>
                    <p className="text-sm text-muted-foreground">Vibration + notification push</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <Card key={mission.title} className="shadow-card-hover h-full">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
                  <mission.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{mission.title}</CardTitle>
                  <CardDescription>{mission.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-[1.05fr,0.95fr] gap-6 items-start">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Menus et consignes visibles avant le retrait</CardTitle>
              <CardDescription>Réduisez les erreurs grâce aux informations restaurant toujours à jour.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4 p-4 rounded-xl border bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Commandes centralisées</CardTitle>
              <CardDescription>Réception, suivi et validation sans changer d'écran.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en-cours" className="space-y-4">
                <TabsList className="grid grid-cols-3">
                  {orderTabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {orderTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="space-y-3">
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                    {tab.items.map((item) => (
                      <div key={item.title} className="p-4 rounded-xl border bg-muted/30">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.details}</p>
                          </div>
                          <Badge variant="secondary">{item.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Suivi de zone</CardTitle>
              <CardDescription>Localisez vos points de retrait et zones actives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-purple-400/20 to-green-400/20 relative">
                  <div className="absolute inset-4 border-2 border-white/50 rounded-xl" />
                  <Map className="absolute top-4 right-4 h-6 w-6 text-primary" />
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                    Carte des zones actives
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Synchronisé avec vos horaires et préférences.
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Temps moyen, notes et bonus disponibles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border bg-muted/40">
                  <p className="text-sm text-muted-foreground">Temps de livraison</p>
                  <p className="text-2xl font-bold">18 min</p>
                </div>
                <div className="p-4 rounded-xl border bg-muted/40">
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                  <p className="text-2xl font-bold">4,8 / 5</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <PackageCheck className="h-4 w-4 text-primary" />
                Bonus hebdo débloqué après 20 livraisons.
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Sécurité et support</CardTitle>
              <CardDescription>Assurance, assistance et vérifications en continu.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Assurance incluse</p>
                  <p className="text-sm text-muted-foreground">Protection trajet et responsabilité.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ListChecks className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Checklist de retrait</p>
                  <p className="text-sm text-muted-foreground">Numéro de commande, montant, consignes.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Support 7j/7</p>
                  <p className="text-sm text-muted-foreground">Chat, appel ou WhatsApp selon l'urgence.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Drivers;
