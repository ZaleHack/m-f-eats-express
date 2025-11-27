import { Link } from "react-router-dom";
import { UtensilsCrossed, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="bg-gradient-hero bg-clip-text text-transparent">M&F Eats</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La plateforme de livraison de repas qui connecte restaurants, livreurs et clients au Sénégal.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Pour les clients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/restaurants" className="text-muted-foreground hover:text-primary transition-colors">
                  Découvrir les restaurants
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

        <div>
          <h3 className="font-semibold mb-4">Partenaires</h3>
          <ul className="space-y-2 text-sm">
              <li>
                <Link to="/become-partner" className="text-muted-foreground hover:text-primary transition-colors">
                  Devenir restaurant partenaire
                </Link>
              </li>
              <li>
                <Link to="/become-driver" className="text-muted-foreground hover:text-primary transition-colors">
                  Devenir livreur
                </Link>
              </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Centre d'aide
              </Link>
            </li>
            <li>
              <Link to="/legal" className="text-muted-foreground hover:text-primary transition-colors">
                Conditions d'utilisation
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>

          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 M&F Eats. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
