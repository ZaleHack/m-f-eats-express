import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Bell, Database, Mail } from "lucide-react";

const Privacy = () => {
  const principles = [
    {
      title: "Collecte minimale",
      description: "Nous collectons uniquement les informations nécessaires : coordonnées, adresses de livraison et préférences de paiement.",
      icon: Database,
    },
    {
      title: "Sécurité renforcée",
      description: "Chiffrement des communications, contrôles d'accès par rôle et surveillance des connexions suspectes.",
      icon: Lock,
    },
    {
      title: "Contrôle utilisateur",
      description: "Vous pouvez télécharger, corriger ou supprimer vos données depuis votre profil et via notre support.",
      icon: Shield,
    },
  ];

  const rights = [
    "Accès et portabilité de vos données personnelles.",
    "Rectification ou mise à jour des informations inexactes.",
    "Suppression sur demande ou en cas d'inactivité prolongée, selon nos obligations légales.",
    "Opposition au marketing et gestion fine des notifications.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-10">
        <section className="space-y-4 text-center">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Confidentialité
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Politique de confidentialité</h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            Transparence sur la façon dont M&F Eats collecte, utilise et protège vos données dans le respect du RGPD et des exigences locales.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {principles.map((item) => (
            <Card key={item.title} className="shadow-card-hover h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Vos droits</CardTitle>
            <CardDescription>Vous gardez le contrôle de vos informations personnelles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            {rights.map((right) => (
              <div key={right} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="h-4 w-4" />
                </div>
                <p className="leading-relaxed">{right}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <section className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Notifications et consentement</CardTitle>
              <CardDescription>Choisissez ce que vous recevez.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Gérez vos préférences pour les notifications push, emails transactionnels et messages marketing. Vous pouvez retirer votre consentement à tout moment depuis le tableau de bord ou en nous écrivant.
              </p>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Centre de préférences</p>
                  <p className="text-sm text-muted-foreground">Notifications par rôle et par canal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Sécurité des paiements</CardTitle>
              <CardDescription>Protection des transactions locales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Les paiements mobiles (Wave, Orange Money) et espèces sont journalisés. Les données sensibles sont traitées par nos partenaires de paiement et ne sont jamais stockées en clair sur M&F Eats.
              </p>
              <Separator />
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">DPO</p>
                  <p className="text-sm text-muted-foreground">privacy@mfeats.sn</p>
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

export default Privacy;
