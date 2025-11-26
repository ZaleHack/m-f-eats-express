import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Store, Calendar, ShieldCheck, Rocket, ArrowRight, Phone } from "lucide-react";

const BecomePartner = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to Supabase function
    console.log("Partner form submitted", formData);
  };

  const benefits = [
    {
      icon: Store,
      title: "Visibilité accrue",
      description: "Accédez à des milliers de clients actifs dans votre zone de livraison.",
    },
    {
      icon: Rocket,
      title: "Outils modernes",
      description: "Gérez vos menus, vos commandes et vos horaires en quelques clics.",
    },
    {
      icon: ShieldCheck,
      title: "Paiements sécurisés",
      description: "Vos revenus sont sécurisés et suivis en temps réel sur la plateforme.",
    },
  ];

  const steps = [
    {
      title: "Inscription",
      description: "Remplissez le formulaire avec les informations de votre restaurant.",
    },
    {
      title: "Validation",
      description: "Notre équipe vous contacte sous 24h pour finaliser l'intégration.",
    },
    {
      title: "Mise en ligne",
      description: "Publiez votre menu et commencez à recevoir vos premières commandes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-12">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Restaurants partenaires
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Développez votre restaurant avec M&F Eats
            </h1>
            <p className="text-lg text-muted-foreground">
              Rejoignez notre réseau de partenaires et augmentez votre chiffre d'affaires grâce à une visibilité
              maximale et des outils pensés pour vos équipes.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">+200 restaurants</p>
                  <p className="font-semibold">déjà partenaires</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Support 7j/7</p>
                  <p className="font-semibold">équipe dédiée</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90" asChild>
                <a href="#formulaire">
                  Commencer l'inscription
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+221770000000">
                  <Phone className="mr-2 h-5 w-5" />
                  Appeler le support
                </a>
              </Button>
            </div>
          </div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pourquoi choisir M&F Eats ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={step.title} className="shadow-card-hover">
              <CardContent className="pt-6 space-y-3">
                <div className="h-10 w-10 rounded-full bg-gradient-hero text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="formulaire" className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Devenir partenaire</h2>
            <p className="text-muted-foreground">
              Complétez les informations ci-dessous pour que notre équipe vous contacte rapidement et active votre
              espace restaurant.
            </p>
            <Card className="shadow-card">
              <CardContent className="grid sm:grid-cols-2 gap-4 pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Délai moyen d'activation</p>
                  <p className="text-xl font-semibold">24h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commissions flexibles</p>
                  <p className="text-xl font-semibold">adaptées à votre activité</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Matériel</p>
                  <p className="text-xl font-semibold">formations incluses</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accompagnement</p>
                  <p className="text-xl font-semibold">chef de secteur dédié</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Formulaire de partenariat</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Nom du restaurant</Label>
                    <Input
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      placeholder="Ex: Le Gourmet Dakar"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact principal</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Nom et prénom"
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+221 77 000 00 00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@restaurant.sn"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse du restaurant</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Quartier, ville"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (facultatif)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Précisions sur votre activité, vos horaires, etc."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-hero">
                  Envoyer ma demande
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomePartner;
