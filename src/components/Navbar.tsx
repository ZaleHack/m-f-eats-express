import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, UtensilsCrossed, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { role } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const isAdminSession = localStorage.getItem('admin-session') === 'true';
      setIsAuthenticated(!!user || isAdminSession);
    };
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('admin-session');
    localStorage.removeItem('admin-role');
    await supabase.auth.signOut();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!role) return '/';
    return `/dashboard/${role}`;
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/how-it-works", label: "Comment ça marche" },
    ...(isAuthenticated
      ? [
          { href: getDashboardLink(), label: "Tableau de bord" },
          { href: "/profile", label: "Profil" },
        ]
      : [
          { href: "/become-partner", label: "Devenir partenaire" },
          { href: "/become-driver", label: "Devenir livreur" },
        ]),
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
          {isAuthenticated ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button asChild className="bg-gradient-hero hover:opacity-90 transition-opacity">
                <Link to="/signup">S'inscrire</Link>
              </Button>
            </>
          )}
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
                {isAuthenticated ? (
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/login">Connexion</Link>
                    </Button>
                    <Button asChild className="bg-gradient-hero">
                      <Link to="/signup">S'inscrire</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
