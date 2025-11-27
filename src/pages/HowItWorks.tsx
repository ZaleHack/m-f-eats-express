import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShoppingBag,
  Timer,
  Bike,
  MapPin,
  ShieldCheck,
  Store,
  ChefHat,
  Coins,
} from "lucide-react";

const HowItWorks = () => {
  const clientSteps = [
    {
      title: "Choisissez votre repas",
      description: "Trouvez les restaurants proches de vous et ajoutez vos plats favoris au panier.",
      icon: ShoppingBag,
    },
    {
      title: "Passez commande",
      description: "Payez en ligne ou à la livraison. Nous notifions immédiatement le restaurant.",
      icon: Timer,
    },
    {
      title: "Suivez votre livreur",
      description: "Recevez des mises à jour en temps réel jusqu'à la livraison à votre porte.",
      icon: MapPin,
    },
  ];

  const restaurantSteps = [
    {
      title: "Inscription rapide",
      description: "Configurez votre fiche, vos horaires et votre menu en quelques minutes.",
      icon: Store,
    },
    {
      title: "Réception des commandes",
      description: "Gérez les commandes depuis le tableau de bord et ajustez la préparation.",
      icon: ChefHat,
    },
    {
      title: "Livraison optimisée",
      description: "Nos livreurs récupèrent vos commandes prêtes et assurent un service fiable.",
      icon: Bike,
    },
  ];

  const driverBenefits = [
    {
      title: "Gains hebdomadaires",
      description: "Paiement chaque semaine avec primes de performance locales.",
      icon: Coins,
    },
    {
      title: "Sécurité et assistance",
      description: "Assurance incluse et support 7j/7 pour vos questions et incidents.",
      icon: ShieldCheck,
    },
    {
      title: "Flexibilité totale",
      description: "Choisissez vos zones et vos horaires de livraison en toute liberté.",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-12">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Parcours client, restaurant et livreur
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Comment fonctionne M&F Eats ?
            </h1>
            <p className="text-lg text-muted-foreground">
              Une plateforme unique qui coordonne commandes, préparation et livraison pour offrir une expérience
              fluide aux clients, aux restaurants et aux livreurs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90" asChild>
                <a href="/signup">
                  Créer un compte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/restaurants">Découvrir les restaurants</a>
              </Button>
            </div>
          </div>
          <Card className="shadow-card bg-gradient-card border-none">
            <CardHeader>
              <CardTitle className="text-2xl">Une logistique coordonnée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Dès qu'une commande est validée, le restaurant est notifié, le livreur le plus proche est assigné et le
                client reçoit un suivi pas-à-pas.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["Notification instantanée", "Suivi en temps réel", "Support local"].map((item) => (
                  <div key={item} className="p-3 rounded-xl bg-background text-center text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          {clientSteps.map((step) => (
            <Card key={step.title} className="shadow-card-hover h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <step.icon className="h-6 w-6" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="shadow-card-hover">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center shadow-glow">
                  <Store className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Restaurants partenaires</p>
                  <CardTitle className="text-2xl">De la commande à la préparation</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {restaurantSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" asChild>
                <a href="/become-partner">
                  Devenir partenaire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card-hover">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Bike className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Livreurs</p>
                  <CardTitle className="text-2xl">Des tournées simples et sécurisées</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {driverBenefits.map((benefit) => (
                <div key={benefit.title} className="p-4 rounded-xl bg-muted/40 space-y-2">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-primary">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
              <div className="sm:col-span-2">
                <Button className="w-full bg-gradient-hero hover:opacity-90" asChild>
                  <a href="/become-driver">
                    Rejoindre les livreurs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-2xl border bg-muted/40 p-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <Badge variant="secondary">Support local 7j/7</Badge>
            <h2 className="text-3xl font-bold">Prêt à passer votre première commande ?</h2>
            <p className="text-muted-foreground">
              Créez un compte gratuitement, choisissez votre restaurant préféré et suivez la livraison en temps réel
              avec l'équipe M&F Eats.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-gradient-hero hover:opacity-90">
                <a href="/signup">S'inscrire</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/login">Déjà inscrit ? Connexion</a>
              </Button>
            </div>
          </div>
          <Card className="shadow-card">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-semibold">Paiement sécurisé</p>
              </div>
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-primary" />
                <p className="font-semibold">Suivi en temps réel</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="font-semibold">Livreurs vérifiés</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
