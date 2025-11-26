import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, UtensilsCrossed } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/become-partner", label: "Devenir partenaire" },
    { href: "/become-driver", label: "Devenir livreur" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <span className="bg-gradient-hero bg-clip-text text-transparent">M&F Eats</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Connexion</Link>
          </Button>
          <Button asChild className="bg-gradient-hero hover:opacity-90 transition-opacity">
            <Link to="/signup">S'inscrire</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" asChild>
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-gradient-hero">
                  <Link to="/signup">S'inscrire</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
