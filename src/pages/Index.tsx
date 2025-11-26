import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Truck, Store, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-food.jpg";

const Index = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Pour les clients",
      description: "Commandez vos plats préférés et suivez votre livraison en temps réel",
      link: "/signup",
    },
    {
      icon: Store,
      title: "Pour les restaurants",
      description: "Développez votre activité et gérez vos commandes facilement",
      link: "/become-partner",
    },
    {
      icon: Truck,
      title: "Pour les livreurs",
      description: "Gagnez de l'argent en livrant selon votre propre emploi du temps",
      link: "/become-driver",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Paiement sécurisé",
      description: "Payez en espèces, Wave ou Orange Money",
    },
    {
      icon: Truck,
      title: "Suivi en temps réel",
      description: "Suivez votre commande et votre livreur en direct sur la carte",
    },
    {
      icon: Store,
      title: "Large choix",
      description: "Des centaines de restaurants partenaires à votre disposition",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Vos repas préférés
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  livrés en un clic
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Découvrez les meilleurs restaurants du Sénégal et faites-vous livrer rapidement avec M&F Eats
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-glow">
                  <Link to="/signup">
                    Commander maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/restaurants">Découvrir les restaurants</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Délicieux plats de nourriture"
                className="relative rounded-2xl shadow-card-hover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Une plateforme pour tous
            </h2>
            <p className="text-lg text-muted-foreground">
              Que vous soyez client, restaurant ou livreur, M&F Eats vous accompagne
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Button variant="link" asChild className="p-0 h-auto text-primary">
                    <Link to={feature.link}>
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi choisir M&F Eats ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-hero mx-auto flex items-center justify-center shadow-glow">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prêt à commencer ?
          </h2>
          <p className="text-lg opacity-90">
            Rejoignez des milliers d'utilisateurs satisfaits sur M&F Eats
          </p>
          <Button size="lg" variant="secondary" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/signup">
              S'inscrire gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
