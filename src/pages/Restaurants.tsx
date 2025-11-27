import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, ShoppingCart, Clock, Star, CreditCard, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type MenuItem = Tables<"menu_items">;
type Restaurant = Tables<"restaurants"> & { menu_items: MenuItem[] };

interface CartItem extends MenuItem {
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}

const driverOrigin = { x: 40, y: 45 };

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("Toutes");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"wave" | "orange">("wave");
  const [transactionLog, setTransactionLog] = useState<
    { id: string; amount: number; method: string; status: string; reference: string }[]
  >([]);
  const [drivers, setDrivers] = useState(
    Array.from({ length: 4 }).map((_, index) => ({
      id: `driver-${index + 1}`,
      name: `Livreur ${index + 1}`,
      x: driverOrigin.x + Math.random() * 40,
      y: driverOrigin.y + Math.random() * 30,
      eta: `${10 + index * 3} min`,
    }))
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data } = await supabase
        .from("restaurants")
        .select("*, menu_items(*)")
        .eq("is_active", true)
        .order("name");

      if (data) {
        setRestaurants(
          data.map((restaurant) => ({
            ...restaurant,
            menu_items: restaurant.menu_items || [],
          }))
        );
      }

      setLoading(false);
    };

    fetchRestaurants();

    const interval = setInterval(() => {
      setDrivers((current) =>
        current.map((driver) => ({
          ...driver,
          x: Math.min(90, Math.max(10, driver.x + (Math.random() - 0.5) * 5)),
          y: Math.min(90, Math.max(10, driver.y + (Math.random() - 0.5) * 5)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const categories = useMemo(
    () => ["Toutes", ...new Set(restaurants.map((restaurant) => restaurant.category || "Autre"))],
    [restaurants]
  );

  const filteredRestaurants = useMemo(() => {
    if (category === "Toutes") return restaurants;
    return restaurants.filter((restaurant) => restaurant.category === category);
  }, [category, restaurants]);

  const addToCart = (item: MenuItem, restaurant: Restaurant) => {
    const price = Number(item.price || 0);

    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id && cartItem.restaurantId === restaurant.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id && cartItem.restaurantId === restaurant.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [
        ...current,
        {
          ...item,
          price,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (itemId: string, restaurantId: string, quantity: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId && item.restaurantId === restaurantId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) return;

    const transaction = {
      id: crypto.randomUUID(),
      amount: total,
      method: paymentMethod === "wave" ? "Wave" : "Orange Money",
      status: "Succès",
      reference: `${paymentMethod.toUpperCase()}-${Date.now()}`,
    };

    setTransactionLog((current) => [transaction, ...current]);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-10 mt-16 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-primary">Découvrir</p>
          <h1 className="text-4xl font-bold">Restaurants et menus</h1>
          <p className="text-muted-foreground">
            Filtrez par catégorie, ajoutez vos plats préférés au panier et suivez votre commande en temps réel.
          </p>
        </header>

        <Tabs value={category} onValueChange={setCategory} className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2 space-y-6">
            <TabsList className="gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid gap-4">
              {loading && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">Chargement des restaurants...</CardContent>
                </Card>
              )}
              {!loading && filteredRestaurants.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Aucun restaurant actif trouvé pour le moment.
                  </CardContent>
                </Card>
              )}
              {!loading && filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id}>
                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        {restaurant.name}
                        <Badge variant="secondary">{restaurant.category || "Restaurant"}</Badge>
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-sm text-foreground">
                          <Star className="h-4 w-4 text-amber-500" />
                          4,7 / 5
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" /> 20 - 35 min
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4" /> {restaurant.address}
                        </span>
                        <span className="text-sm text-muted-foreground">{restaurant.phone}</span>
                      </CardDescription>
                    </div>
                    <Badge className="w-fit" variant="outline">
                      Menus disponibles: {restaurant.menu_items.length}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {restaurant.menu_items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="relative h-32 w-full bg-muted">
                            <img
                              src={item.image_url || "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <CardTitle className="text-lg">{item.name}</CardTitle>
                                <CardDescription>{item.description || "Délicieux plat disponible à la livraison"}</CardDescription>
                              </div>
                              <Badge>{item.category || "Menu"}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="flex items-center justify-between">
                            <div className="font-semibold">{item.price.toLocaleString()} FCFA</div>
                            <Button size="sm" onClick={() => addToCart(item, restaurant)}>
                              Ajouter
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Mon panier</CardTitle>
                  <CardDescription>Finalisez votre commande et choisissez un paiement.</CardDescription>
                </div>
                <ShoppingCart className="h-5 w-5" />
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucun article pour le moment.</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.restaurantId}-${item.id}`} className="flex flex-col gap-2 rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.restaurantName}</p>
                          </div>
                          <p className="text-sm font-semibold">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Badge variant="secondary">{item.price.toLocaleString()} FCFA</Badge>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{total.toLocaleString()} FCFA</span>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm">Moyen de paiement</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Button
                          variant={paymentMethod === "wave" ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => setPaymentMethod("wave")}
                        >
                          <Smartphone className="h-4 w-4" /> Wave
                        </Button>
                        <Button
                          variant={paymentMethod === "orange" ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => setPaymentMethod("orange")}
                        >
                          <CreditCard className="h-4 w-4" /> Orange Money
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={checkout} disabled={cart.length === 0}>
                      Valider la commande
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suivi GPS en temps réel</CardTitle>
                <CardDescription>Visualisez la position des livreurs sur la carte.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative h-64 w-full overflow-hidden rounded-xl border bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
                  <div className="absolute inset-0" aria-hidden>
                    {[...Array(12)].map((_, idx) => (
                      <span
                        key={idx}
                        className="absolute h-px w-full bg-white/5"
                        style={{ top: `${(idx + 1) * 8}%` }}
                      />
                    ))}
                    {[...Array(8)].map((_, idx) => (
                      <span
                        key={`v-${idx}`}
                        className="absolute h-full w-px bg-white/5"
                        style={{ left: `${(idx + 1) * 10}%` }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-4 rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="grid h-full w-full place-items-center text-xs text-white/70">
                      <span>Zone de livraison</span>
                    </div>
                    <div className="absolute inset-0">
                      {drivers.map((driver) => (
                        <div
                          key={driver.id}
                          className="absolute flex items-center gap-1 text-xs text-white"
                          style={{ left: `${driver.x}%`, top: `${driver.y}%` }}
                        >
                          <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                          {driver.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{driver.id}</Badge>
                        <span>{driver.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {driver.x.toFixed(1)} / {driver.y.toFixed(1)}
                        </span>
                        <Badge>{driver.eta}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transactions récentes</CardTitle>
                <CardDescription>Historique des paiements Wave et Orange Money.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {transactionLog.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune transaction pour le moment.</p>
                ) : (
                  transactionLog.map((transaction) => (
                    <div key={transaction.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col">
                          <span className="font-semibold">{transaction.method}</span>
                          <span className="text-xs text-muted-foreground">Réf. {transaction.reference}</span>
                        </div>
                        <Badge variant="outline">{transaction.status}</Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                        <span>Montant</span>
                        <span className="font-semibold text-foreground">{transaction.amount.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
