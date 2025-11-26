import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bike, Clock3, Shield, Sparkles, MapPin, PhoneCall, ArrowRight } from "lucide-react";

const BecomeDriver = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    experience: "",
    vehicle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to Supabase function
    console.log("Driver form submitted", formData);
  };

  const perks = [
    {
      icon: Bike,
      title: "Revenus flexibles",
      description: "Roulez quand vous voulez et augmentez vos gains à votre rythme.",
    },
    {
      icon: Clock3,
      title: "Horaires libres",
      description: "Choisissez vos plages de livraison en fonction de votre planning.",
    },
    {
      icon: Shield,
      title: "Assistance dédiée",
      description: "Support local et formation pour démarrer rapidement en toute sécurité.",
    },
  ];

  const requirements = [
    "Permis de conduire en cours de validité",
    "Pièce d'identité ou passeport",
    "Smartphone avec connexion internet",
    "Moto ou vélo en bon état",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-12">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Livreurs partenaires
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Gagnez plus en livrant avec M&F Eats
            </h1>
            <p className="text-lg text-muted-foreground">
              Rejoignez notre communauté de livreurs, bénéficiez d'un accompagnement personnalisé et profitez de
              missions régulières partout au Sénégal.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bonus hebdomadaires</p>
                  <p className="font-semibold">pour les meilleurs livreurs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assistance</p>
                  <p className="font-semibold">disponible 7j/7</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90" asChild>
                <a href="#formulaire">
                  Rejoindre l'équipe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+221770000000">
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Appeler le support
                </a>
              </Button>
            </div>
          </div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Vos avantages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {perks.map((perk) => (
                <div key={perk.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                    <perk.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{perk.title}</h3>
                    <p className="text-muted-foreground">{perk.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Profil recherché</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requirements.map((req) => (
                  <div key={req} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-hero text-white flex items-center justify-center text-sm font-bold">
                      <Shield className="h-4 w-4" />
                    </div>
                    <p className="text-muted-foreground">{req}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Zones prioritaires</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {["Dakar", "Thiès", "Mbour", "Saint-Louis"].map((city) => (
                <div key={city} className="p-4 rounded-xl border bg-muted/30 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">{city}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="formulaire" className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Devenir livreur</h2>
            <p className="text-muted-foreground">
              Remplissez le formulaire pour que notre équipe vous recontacte et planifie votre session d'onboarding.
            </p>
            <Card className="shadow-card">
              <CardContent className="grid sm:grid-cols-2 gap-4 pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Formation</p>
                  <p className="text-xl font-semibold">en ligne et sur site</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paiement</p>
                  <p className="text-xl font-semibold">hebdomadaire</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assurance</p>
                  <p className="text-xl font-semibold">incluse</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Support</p>
                  <p className="text-xl font-semibold">communautés locales</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Formulaire livreur</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ex: Awa Diop"
                    required
                  />
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
                    <Label htmlFor="city">Ville de résidence</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ville"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Type de véhicule</Label>
                  <Input
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    placeholder="Moto, vélo, scooter..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience (facultatif)</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Précisez vos expériences précédentes"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-hero">
                  Envoyer ma candidature
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

export default BecomeDriver;
