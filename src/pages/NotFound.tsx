import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="app-shell gradient-surface bg-background text-foreground">
      <Navbar />
      <main className="container relative z-10 flex-1 flex items-center justify-center py-16">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-primary/20 opacity-30 blur-3xl" />
        <Card className="glass-card max-w-3xl w-full shadow-card-hover">
          <CardHeader className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Page introuvable
            </div>
            <CardTitle className="text-4xl font-bold">Oups, on n'a pas trouvé cette page</CardTitle>
            <CardDescription className="text-base">
              Le lien que vous avez suivi semble incorrect ou a peut-être été déplacé. Choisissons ensemble la bonne
              direction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 rounded-2xl bg-muted/60 border shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-hero text-white flex items-center justify-center shadow-glow">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Retour au point de départ</h3>
                </div>
                <p className="text-muted-foreground">
                  Rejoignez la page d'accueil pour retrouver les restaurants, les offres partenaires et toutes nos
                  expériences culinaires.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/60 border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Actions rapides</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Explorer les restaurants populaires</li>
                  <li>• Devenir partenaire ou livreur</li>
                  <li>• Accéder à votre tableau de bord</li>
                </ul>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left text-muted-foreground">
                <p className="font-semibold text-foreground">Code 404</p>
                <p>La page « {location.pathname} » est indisponible.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link to="/restaurants">
                    Découvrir les restaurants
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-hero hover:opacity-90">
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
