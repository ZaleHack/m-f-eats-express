import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone, ShieldCheck, Timer, MapPin } from "lucide-react";

const Support = () => {
  const faqs = [
    {
      question: "Comment suivre ma commande en temps réel ?",
      answer:
        "Depuis votre tableau de bord client, ouvrez la commande en cours pour voir la position du livreur, l'ETA et la timeline des statuts.",
    },
    {
      question: "Que faire en cas de problème sur une livraison ?",
      answer:
        "Contactez le support depuis la commande concernée en détaillant le problème (photo, message). Nous revenons vers vous en priorité.",
    },
    {
      question: "Puis-je modifier mon adresse après validation ?",
      answer:
        "Oui tant que la commande n'est pas prise en charge par un livreur. Mettez à jour l'adresse et prévenez le support pour confirmation.",
    },
    {
      question: "Comment récupérer mes gains de livreur ou de restaurant ?",
      answer:
        "Consultez la section Paiements de votre tableau de bord pour voir le solde, les virements planifiés et mettre à jour vos coordonnées bancaires.",
    },
  ];

  const contactChannels = [
    {
      title: "Chat prioritaire",
      description: "Disponible 7j/7 pour les commandes en cours et les incidents critiques.",
      icon: MessageCircle,
      action: "Ouvrir le chat",
    },
    {
      title: "Ligne assistance",
      description: "Un conseiller M&F Eats pour les urgences de livraison ou de paiement.",
      icon: Phone,
      action: "+221 33 000 00 00",
    },
    {
      title: "Email support",
      description: "Détails de dossiers, pièces jointes et suivi documentaire.",
      icon: Mail,
      action: "support@mfeats.sn",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 mt-16 space-y-10">
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Assistance M&F Eats
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Support clients, restaurants et livreurs</h1>
            <p className="text-lg text-muted-foreground">
              Une équipe locale pour résoudre vos demandes : suivi des commandes, incidents de paiement, mise à jour de profil ou documents de vérification.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gradient-hero text-white">Réponse moyenne &lt; 5 minutes</Badge>
              <Badge variant="secondary">Support Dakar et régions</Badge>
              <Badge variant="secondary">Français / Wolof</Badge>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90" asChild>
                <a href="#contact">Contacter le support</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#faq">Voir la FAQ</a>
              </Button>
            </div>
          </div>

          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle>Suivi en direct</CardTitle>
              <CardDescription>Commandes, livreurs et paiements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Timer className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Priorité commandes en cours</p>
                  <p className="text-sm">Alertes et notifications en temps réel</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Coordonnées vérifiées</p>
                  <p className="text-sm">Assistance géolocalisée pour restaurants et livreurs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Escalade conformité</p>
                  <p className="text-sm">Sécurité des paiements et vérifications documentaires</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6" id="contact">
          {contactChannels.map((channel) => (
            <Card key={channel.title} className="shadow-card-hover h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <channel.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-primary">{channel.action}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-6" id="faq">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>FAQ rapide</CardTitle>
              <CardDescription>Les réponses aux questions les plus fréquentes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((item, index) => (
                  <AccordionItem value={`faq-${index}`} key={item.question}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Envoyer une demande</CardTitle>
              <CardDescription>Détaillez votre besoin et une équipe vous répond.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="topic">
                  Sujet
                </label>
                <Input id="topic" placeholder="Ex: commande non livrée, virement, document livreur" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="message">
                  Détail de la demande
                </label>
                <Textarea id="message" placeholder="Expliquez votre situation en quelques lignes" rows={5} />
              </div>
              <Button className="w-full bg-gradient-hero hover:opacity-90">Envoyer au support</Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
