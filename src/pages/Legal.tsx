import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Scale, FileText, PhoneCall, Globe2 } from "lucide-react";

const Legal = () => {
  const commitments = [
    {
      title: "Conditions d'utilisation",
      description: "Utilisation responsable de la plateforme, exactitude des informations fournies et respect des autres usagers.",
      icon: FileText,
    },
    {
      title: "Responsabilités partagées",
      description: "Les restaurants garantissent la conformité sanitaire, les livreurs assurent la bonne remise et les clients vérifient leurs coordonnées.",
      icon: ShieldCheck,
    },
    {
      title: "Conformité locale",
      description: "Service opéré au Sénégal avec respect des exigences de paiement mobile et des obligations fiscales locales.",
      icon: Globe2,
    },
  ];

  const rules = [
    "Respecter les horaires de retrait et de livraison communiqués dans l'application.",
    "Ne pas contourner les règles de paiement ni partager son compte avec un tiers.",
    "Signaler immédiatement tout incident : problème de commande, comportement inapproprié, fraude présumée.",
    "Accepter les mises à jour de conditions en continuant d'utiliser M&F Eats.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-10">
        <section className="space-y-4 text-center">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Informations légales
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Conditions générales de M&F Eats</h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            Cadre contractuel pour les clients, restaurants, livreurs et administrateurs. Ces informations complètent nos politiques de confidentialité et de sécurité des paiements.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {commitments.map((item) => (
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
            <CardTitle className="text-2xl">Règles d'usage essentielles</CardTitle>
            <CardDescription>
              Les principes à respecter pour garantir une expérience sécurisée et équitable pour toutes les parties prenantes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            {rules.map((rule) => (
              <div key={rule} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Scale className="h-4 w-4" />
                </div>
                <p className="leading-relaxed">{rule}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <section className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Gestion des litiges</CardTitle>
              <CardDescription>Procédure simplifiée pour résoudre les différends.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                En cas de contestation (commande manquante, comportement inapproprié, paiement bloqué), nous encourageons le signalement via l'application ou par email. Les dossiers sont analysés avec les preuves disponibles (photos, traces GPS, reçus).
              </p>
              <Separator />
              <ul className="list-disc list-inside space-y-2">
                <li>Première réponse en moins de 24h ouvrées.</li>
                <li>Suspension préventive des comptes en cas de fraude présumée.</li>
                <li>Remboursement ou avoir selon les politiques restaurant et plateforme.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Contact légal</CardTitle>
              <CardDescription>Joindre notre équipe conformité.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Pour toute question juridique, envoyez un email à <span className="font-semibold">legal@mfeats.sn</span> ou contactez notre support.</p>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Assistance 7j/7</p>
                  <p className="text-sm text-muted-foreground">+221 33 000 00 00</p>
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

export default Legal;
