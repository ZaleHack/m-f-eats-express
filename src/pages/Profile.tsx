import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Smartphone, UserRound } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 mt-16 space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase text-muted-foreground tracking-wide">Mon compte</p>
          <h1 className="text-4xl font-bold">Profil & Sécurité</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos informations personnelles, vos préférences de contact et sécurisez votre accès à M&F Eats.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.55fr]">
          <div className="space-y-6">
            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Vos coordonnées sont visibles par les livreurs et restaurants uniquement.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstname">Prénom</Label>
                  <Input id="firstname" placeholder="Fatou" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input id="lastname" placeholder="Ndiaye" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="vous@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" placeholder="+221 77 000 00 00" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Adresse principale</Label>
                  <Textarea id="address" placeholder="Ex: 12 rue des Manguiers, Dakar" rows={3} />
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full">Mettre à jour mon profil</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Sécurité & mot de passe</CardTitle>
                    <CardDescription>Renforcez votre protection avec un mot de passe unique.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Nouveau mot de passe</Label>
                    <Input id="password" type="password" placeholder="********" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-confirm">Confirmer le mot de passe</Label>
                    <Input id="password-confirm" type="password" placeholder="********" />
                  </div>
                </div>
                <div className="rounded-lg border p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">Authentification renforcée</p>
                    <p className="text-sm text-muted-foreground">Recevez un code SMS avant chaque connexion sensible.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="2fa" />
                    <Label htmlFor="2fa">Activer</Label>
                  </div>
                </div>
                <Button className="w-full">Mettre à jour la sécurité</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Notifications & contacts</CardTitle>
                    <CardDescription>Choisissez comment nous vous tenons informé(e).</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Notifications push</p>
                    <p className="text-sm text-muted-foreground">Suivi en temps réel des commandes et promotions.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Appels du livreur</p>
                    <p className="text-sm text-muted-foreground">Autoriser les livreurs à vous joindre si besoin.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Emails récapitulatifs</p>
                    <p className="text-sm text-muted-foreground">Factures et confirmations envoyées automatiquement.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <CardTitle>Adresses sauvegardées</CardTitle>
                <CardDescription>Préparez vos points de livraison favoris.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Maison", "Bureau"].map((label) => (
                  <div key={label} className="rounded-lg border p-4 flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="secondary" className="mb-2">{label}</Badge>
                      <p className="font-medium">12 rue des Manguiers</p>
                      <p className="text-sm text-muted-foreground">Dakar, Point E</p>
                    </div>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </div>
                ))}
                <Separator />
                <Button className="w-full" variant="outline">
                  Ajouter une nouvelle adresse
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
