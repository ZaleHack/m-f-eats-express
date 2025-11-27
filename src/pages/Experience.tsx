import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Activity,
  ArrowRight,
  BellRing,
  Bike,
  ChartPie,
  CheckCircle2,
  Compass,
  CreditCard,
  Headphones,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Trophy,
  Users,
} from "lucide-react";

const Experience = () => {
  const roleTracks = [
    {
      title: "Client",
      description: "Recherche, menu enrichi, panier persistant et suivi GPS en direct.",
      highlights: ["Filtres avancés", "Options personnalisables", "Paiement multi-canaux"],
      icon: Sparkles,
    },
    {
      title: "Restaurant",
      description: "Dashboard temps réel, gestion menu/options, assignation livreurs.",
      highlights: ["Commandes live", "Gestion de stock", "Commissions maîtrisées"],
      icon: Store,
    },
    {
      title: "Livreur",
      description: "Navigation optimisée, preuves de livraison et gains visibles.",
      highlights: ["Statut en ligne", "Itinéraire optimisé", "Paiement hebdo"],
      icon: Bike,
    },
    {
      title: "Admin",
      description: "Gouvernance complète: vérifications, paiements, analytics globaux.",
      highlights: ["Audit trail", "Modération", "Rapports exportables"],
      icon: ChartPie,
    },
  ];

  const orderPipeline = [
    "Pending",
    "Accepted",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered",
  ];

  const trustSignals = [
    {
      title: "Paiements fluides",
      description: "Espèces, Wave et Orange Money avec relance automatique en cas d'échec.",
      icon: CreditCard,
    },
    {
      title: "Sécurité avancée",
      description: "Auth email/password, RLS par rôle et chiffrement bout-en-bout des données sensibles.",
      icon: ShieldCheck,
    },
    {
      title: "Notifications temps réel",
      description: "Commandes, changements d'état, messages et alertes d'assignation livreur.",
      icon: BellRing,
    },
    {
      title: "Support humain",
      description: "Chat, tickets, FAQ et suivi proactif des incidents critiques.",
      icon: Headphones,
    },
  ];

  const performance = [
    { label: "Temps moyen de livraison", value: "< 30 min", emphasis: "bg-primary/10 text-primary" },
    { label: "Satisfaction clients", value: "4.8/5", emphasis: "bg-green-500/10 text-green-600" },
    { label: "Disponibilité", value: "99.9%", emphasis: "bg-purple-500/10 text-purple-600" },
    { label: "Restaurants actifs", value: "450+", emphasis: "bg-amber-500/10 text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(74,222,128,0.06),transparent_25%)] pointer-events-none" />

        <section className="container relative z-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Plateforme full-stack</Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Toutes les fonctionnalités M&F Eats,
                <span className="block bg-gradient-hero bg-clip-text text-transparent">design ultra moderne</span>
                et fluidité absolue.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Expérience orchestrée pour les clients, restaurants, livreurs et administrateurs : parcours fluides,
                animations légères, micro-interactions et hiérarchie visuelle pensée pour l'action.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-hero shadow-glow hover:opacity-90" asChild>
                  <a href="/signup">
                    Démarrer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/how-it-works">Voir les parcours</a>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {performance.map((item) => (
                  <Card key={item.label} className="border-none bg-white/70 dark:bg-white/5 backdrop-blur shadow-card-hover">
                    <CardContent className="p-4 space-y-1">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-sm font-semibold ${item.emphasis}`}>
                        {item.value}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="shadow-card-hover bg-gradient-card border-none relative overflow-hidden">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -right-6 -bottom-12 h-40 w-40 rounded-full bg-green-400/20 blur-3xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Chaîne opérationnelle en temps réel
                </CardTitle>
                <CardDescription>Du clic à la livraison avec animations de statut.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-background/80 backdrop-blur border">
                    <p className="text-sm text-muted-foreground">Commandes</p>
                    <p className="text-2xl font-bold">1 240</p>
                    <p className="text-xs text-green-600">+18% cette semaine</p>
                  </div>
                  <div className="p-3 rounded-xl bg-background/80 backdrop-blur border">
                    <p className="text-sm text-muted-foreground">Taux d'acceptation</p>
                    <p className="text-2xl font-bold">97%</p>
                    <p className="text-xs text-primary">Flux sans friction</p>
                  </div>
                  <div className="p-3 rounded-xl bg-background/80 backdrop-blur border">
                    <p className="text-sm text-muted-foreground">Livreurs en ligne</p>
                    <p className="text-2xl font-bold">162</p>
                    <p className="text-xs text-muted-foreground">Assignation auto</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide">
                    <span>Pipeline de commande</span>
                    <span>Animé étape par étape</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {orderPipeline.map((step, index) => (
                      <div
                        key={step}
                        className="relative p-3 rounded-xl border bg-background/70 backdrop-blur flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{index + 1}</span>
                          <CheckCircle2 className={`h-4 w-4 ${index <= 3 ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <p className="text-sm font-semibold">{step}</p>
                        {index < orderPipeline.length - 1 && (
                          <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-0.5 w-4 bg-gradient-to-r from-primary to-orange-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container relative z-10 pb-16 space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <Badge variant="secondary" className="mb-3">Par rôle</Badge>
              <h2 className="text-3xl font-bold">Expérience cohérente pour chaque utilisateur</h2>
              <p className="text-muted-foreground max-w-2xl">
                Micro-interactions, gradients subtils et transitions fluides pour guider chaque rôle sans friction.
              </p>
            </div>
            <Button variant="ghost" asChild>
              <a href="/how-it-works">Spécifications détaillées</a>
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {roleTracks.map((role) => (
              <Card key={role.title} className="h-full border-none shadow-card-hover bg-white/80 dark:bg-white/5 backdrop-blur">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{role.title}</p>
                    <CardTitle className="text-lg">Parcours premium</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <div className="space-y-2">
                    {role.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <a href="/how-it-works" className="inline-flex items-center gap-1">
                      Voir le parcours
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container relative z-10 pb-16">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8">
            <Card className="shadow-card-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Suivi et géolocalisation fluides</CardTitle>
                <CardDescription>
                  Timeline colorée, carte interactive, ETA dynamique et preuves de livraison intégrées.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-orange-400/5 to-green-400/5 p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Commande #MF-2048</span>
                    <Badge className="bg-green-500 text-white">Out for Delivery</Badge>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="p-3 rounded-xl bg-background">
                      <p className="text-muted-foreground">Livreur</p>
                      <p className="font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Awa • 4.9⭐</p>
                    </div>
                    <div className="p-3 rounded-xl bg-background">
                      <p className="text-muted-foreground">Adresse</p>
                      <p className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Plateau, Dakar</p>
                    </div>
                    <div className="p-3 rounded-xl bg-background">
                      <p className="text-muted-foreground">ETA</p>
                      <p className="font-semibold flex items-center gap-2"><Compass className="h-4 w-4" /> 08:21 min</p>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-orange-400 to-green-500 animate-[pulse_2s_ease-in-out_infinite]" style={{ width: "72%" }} />
                  </div>
                  <div className="grid grid-cols-6 gap-2 text-xs text-muted-foreground uppercase tracking-wide">
                    {orderPipeline.map((step, index) => (
                      <div key={step} className="flex flex-col gap-2 items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${index <= 4 ? "border-primary/60 bg-primary/10" : "border-muted"}`}>
                          {index + 1}
                        </div>
                        <span className="text-[11px] leading-tight">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Preuve photo + signature optionnelle</p>
                  <p className="flex items-center gap-2"><Bike className="h-4 w-4 text-primary" /> Navigation optimisée toutes les 30s</p>
                  <p className="flex items-center gap-2"><BellRing className="h-4 w-4 text-primary" /> Notifications push multi-rôle</p>
                  <p className="flex items-center gap-2"><Trophy className="h-4 w-4 text-primary" /> Points de loyauté et récompenses</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {trustSignals.map((signal) => (
                <Card key={signal.title} className="shadow-card-hover border-none bg-white/80 dark:bg-white/5 backdrop-blur">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <signal.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{signal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{signal.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
