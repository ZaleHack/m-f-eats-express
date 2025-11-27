import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Gift,
  Repeat,
  Sparkles,
  MapPin,
  Layers,
  Percent,
  Eye,
  MessageCircle,
  Clock,
  Bell,
} from "lucide-react";
import { useMemo } from "react";

const featureCards = [
  {
    icon: Gift,
    title: "Programme de fidélité",
    status: "Actif",
    description: "Cumulez des points à chaque commande, appliquez des bonus et gérez l'expiration des récompenses.",
    highlights: [
      "Points configurables par commande et par produit",
      "Expiration automatique via tâche planifiée",
      "Module de redemption intégré au checkout",
    ],
    actions: ["Règles de points", "Catalogue de récompenses", "Notifications clients"],
  },
  {
    icon: Repeat,
    title: "Abonnements & récurrence",
    status: "En cours de déploiement",
    description: "Planifiez des paniers récurrents, gérez les renouvellements et prévenez les utilisateurs à l'avance.",
    highlights: [
      "Plans hebdomadaires ou mensuels avec remises",
      "Génération automatique des commandes récurrentes",
      "Alertes avant renouvellement et gestion de pauses",
    ],
    actions: ["Plans récurrents", "Scheduler", "Webhooks paiement"],
  },
  {
    icon: Sparkles,
    title: "Recommandations personnalisées",
    status: "Actif",
    description: "Suggestions contextuelles basées sur la popularité, la catégorie et l'historique client.",
    highlights: [
      "Carrousels sur pages produit et panier",
      "Cache pour les résultats populaires",
      "API dédiée aux recommandations contextuelles",
    ],
    actions: ["Service ML simplifié", "Cache", "Carrousels"],
  },
  {
    icon: Eye,
    title: "Suivi temps réel",
    status: "Actif",
    description: "Mises à jour live des statuts de commande avec notifications et estimation dynamique du trajet.",
    highlights: [
      "WebSocket / Supabase Realtime intégré",
      "Normalisation des statuts et timeline visuelle",
      "Notifications multi-canal (push / email)",
    ],
    actions: ["Flux temps réel", "Notifications", "Timeline"],
  },
  {
    icon: MapPin,
    title: "Multi-restaurant / entrepôt",
    status: "Enrichi",
    description: "Scope des menus par établissement, gestion des zones desservies et des frais dynamiques.",
    highlights: [
      "Catalogues associés à chaque site",
      "Disponibilité ajustée à la localisation client",
      "Back-office pour horaires et capacités",
    ],
    actions: ["Catalogues locaux", "Zones de livraison", "Capacité"],
  },
  {
    icon: Percent,
    title: "Promotions & bundles",
    status: "Actif",
    description: "Moteur de règles avancées pour les combos, réductions contextuelles et offres limitées.",
    highlights: [
      "Conditions flexibles (montant, horaire, combo)",
      "Actions variées (réduction, article offert)",
      "Validation au checkout avec économies affichées",
    ],
    actions: ["Règles promo", "Bundles", "Editeur admin"],
  },
  {
    icon: Layers,
    title: "Accessibilité & mobile",
    status: "Actif",
    description: "Grille responsive renforcée, contrôle du focus et tests automatisés pour l'accessibilité.",
    highlights: [
      "Audit axe DevTools des pages clés",
      "Barre d'action fixe sur mobile",
      "Tests automatisés a11y (axe/playwright)",
    ],
    actions: ["Audit", "Correctifs responsive", "Tests a11y"],
  },
  {
    icon: MessageCircle,
    title: "Support & chat contextualisé",
    status: "Bêta",
    description: "FAQ dynamique par page et chat relié à l'historique client pour accélérer les réponses.",
    highlights: [
      "FAQ contextuelle via composant HelpDrawer",
      "Chat connecté au compte et pré-réponses",
      "Journalisation pour enrichir la base de connaissances",
    ],
    actions: ["FAQ", "Chat", "Analytics"],
  },
];

const operationalTracks = [
  {
    title: "Automatisation",
    percent: 82,
    steps: [
      "Scheduler des commandes récurrentes",
      "Expiration automatique des points",
      "Notifications d'alerte renouvellement",
    ],
  },
  {
    title: "Personnalisation",
    percent: 74,
    steps: [
      "Recommandations par popularité et catégorie",
      "Segmentation des promos et bundles",
      "Contextualisation de la FAQ et du chat",
    ],
  },
  {
    title: "Fiabilité temps réel",
    percent: 68,
    steps: [
      "Normalisation des statuts de commande",
      "Suivi live livreur / client",
      "Webhooks de paiement et de livraison",
    ],
  },
];

const PlatformFeatures = () => {
  const activeCount = useMemo(() => featureCards.filter((f) => f.status !== "Brouillon").length, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <header className="bg-muted/40 border-b">
        <div className="container py-12 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary/40">
              Suite produit
            </Badge>
            <span className="text-sm text-muted-foreground">{activeCount} modules prêts à être activés</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Toutes les fonctionnalités avancées prêtes à l'emploi
              </h1>
              <p className="text-lg text-muted-foreground">
                Fidélité, récurrence, recommandations, suivi temps réel, multi-établissements, promotions, accessibilité et
                support : une vue consolidée pour orchestrer chaque levier de croissance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-hero">Démarrer un parcours</Button>
                <Button variant="outline">Voir la configuration détaillée</Button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Prêt pour les clients</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Déploiement progressif</div>
                <div className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notifications configurables</div>
              </div>
            </div>
            <Card className="shadow-card">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle>Checklist d'activation</CardTitle>
                  <Badge variant="secondary">Pilote</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Visualisez les modules critiques avant ouverture aux utilisateurs finaux.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {featureCards.slice(0, 4).map((feature) => (
                  <div key={feature.title} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <feature.icon className="h-5 w-5 text-primary" />
                        <p className="font-semibold">{feature.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{feature.description}</p>
                    </div>
                    <Switch checked readOnly aria-label={`Module ${feature.title} activé`} />
                  </div>
                ))}
                <Separator />
                <div className="text-sm text-muted-foreground">
                  Personnalisez les paramètres depuis chaque module pour aligner la plateforme avec vos objectifs.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 bg-background">
          <div className="container grid lg:grid-cols-3 gap-6">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="shadow-card hover:shadow-card-hover transition-all">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <feature.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <Badge variant={feature.status === "Actif" ? "default" : "outline"}>{feature.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {feature.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {feature.actions.map((action) => (
                      <Badge key={action} variant="secondary" className="rounded-full">
                        {action}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">Accéder au module</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12 bg-muted/40 border-t">
          <div className="container grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <CardTitle>Parcours opérationnels</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Trois fils conducteurs pour orchestrer les fonctionnalités sans perdre en qualité de service.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {operationalTracks.map((track) => (
                  <div key={track.title} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{track.title}</p>
                      <span className="text-sm text-muted-foreground">{track.percent}% prêt</span>
                    </div>
                    <Progress value={track.percent} />
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {track.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Notifications clés</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gardez vos utilisateurs informés à chaque étape : commande, paiement, livraison et assistance.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Statuts commande</div>
                  <Badge variant="outline">Temps réel</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><Gift className="h-4 w-4 text-primary" /> Points fidélité</div>
                  <Badge variant="outline">Après checkout</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><Repeat className="h-4 w-4 text-primary" /> Récurrence</div>
                  <Badge variant="outline">J-2 avant renouvellement</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-primary" /> Surveillance a11y</div>
                  <Badge variant="outline">Hebdomadaire</Badge>
                </div>
                <Button className="w-full mt-4">Configurer les notifications</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlatformFeatures;
