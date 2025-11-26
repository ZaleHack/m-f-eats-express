-- Créer le type enum pour les rôles utilisateurs
CREATE TYPE public.app_role AS ENUM ('client', 'restaurant', 'driver', 'admin');

-- Créer le type enum pour les statuts de commande
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'in_delivery', 'delivered', 'cancelled');

-- Créer le type enum pour les méthodes de paiement
CREATE TYPE public.payment_method AS ENUM ('cash', 'wave', 'orange_money');

-- Créer le type enum pour les statuts de livraison
CREATE TYPE public.delivery_status AS ENUM ('assigned', 'accepted', 'picked_up', 'in_transit', 'delivered');

-- Table des profils utilisateurs (extension de auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  user_type app_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des rôles utilisateurs (séparée pour la sécurité)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Table des restaurants
CREATE TABLE public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT true,
  opening_hours JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des éléments du menu
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  is_available BOOLEAN DEFAULT true,
  options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des livreurs
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
  vehicle_type TEXT,
  license_number TEXT,
  is_available BOOLEAN DEFAULT true,
  is_approved BOOLEAN DEFAULT false,
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  rating DECIMAL(3, 2) DEFAULT 0,
  total_deliveries INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des commandes
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL NOT NULL,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
  status order_status DEFAULT 'pending' NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  delivery_address TEXT NOT NULL,
  delivery_latitude DECIMAL(10, 8),
  delivery_longitude DECIMAL(11, 8),
  customer_notes TEXT,
  payment_method payment_method NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des éléments de commande
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE SET NULL,
  menu_item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des livraisons
CREATE TABLE public.deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL UNIQUE,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL NOT NULL,
  status delivery_status DEFAULT 'assigned' NOT NULL,
  picked_up_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Table des transactions/commissions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL NOT NULL,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  commission_amount DECIMAL(10, 2) NOT NULL,
  commission_rate DECIMAL(5, 2) DEFAULT 10.00,
  transaction_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON public.restaurants
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON public.drivers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Fonction pour créer automatiquement le profil utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilisateur'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE((NEW.raw_user_meta_data->>'user_type')::app_role, 'client')
  );
  
  -- Ajouter le rôle correspondant
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'user_type')::app_role, 'client'));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger pour créer le profil automatiquement
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour vérifier si un utilisateur a un rôle spécifique
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$ LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public;

-- Enable RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies pour profiles
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies pour user_roles
CREATE POLICY "Les utilisateurs peuvent voir leurs propres rôles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Les admins peuvent gérer tous les rôles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies pour restaurants
CREATE POLICY "Tout le monde peut voir les restaurants actifs"
  ON public.restaurants FOR SELECT
  USING (is_active = true);

CREATE POLICY "Les propriétaires peuvent gérer leurs restaurants"
  ON public.restaurants FOR ALL
  USING (auth.uid() = owner_id);

CREATE POLICY "Les admins peuvent gérer tous les restaurants"
  ON public.restaurants FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies pour menu_items
CREATE POLICY "Tout le monde peut voir les éléments de menu disponibles"
  ON public.menu_items FOR SELECT
  USING (is_available = true);

CREATE POLICY "Les propriétaires de restaurants peuvent gérer leurs menus"
  ON public.menu_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = menu_items.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- RLS Policies pour drivers
CREATE POLICY "Les livreurs peuvent voir leur propre profil"
  ON public.drivers FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Les livreurs peuvent mettre à jour leur propre profil"
  ON public.drivers FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Les restaurants peuvent voir leurs livreurs"
  ON public.drivers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = drivers.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

CREATE POLICY "Les admins peuvent gérer tous les livreurs"
  ON public.drivers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies pour orders
CREATE POLICY "Les clients peuvent voir leurs propres commandes"
  ON public.orders FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Les clients peuvent créer des commandes"
  ON public.orders FOR INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Les restaurants peuvent voir leurs commandes"
  ON public.orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = orders.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

CREATE POLICY "Les restaurants peuvent mettre à jour leurs commandes"
  ON public.orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = orders.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

CREATE POLICY "Les livreurs peuvent voir leurs commandes"
  ON public.orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = orders.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

-- RLS Policies pour order_items
CREATE POLICY "Les utilisateurs peuvent voir les items de leurs commandes"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (
        orders.customer_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.restaurants
          WHERE restaurants.id = orders.restaurant_id
          AND restaurants.owner_id = auth.uid()
        )
      )
    )
  );

-- RLS Policies pour deliveries
CREATE POLICY "Les livreurs peuvent voir leurs livraisons"
  ON public.deliveries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = deliveries.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

CREATE POLICY "Les livreurs peuvent mettre à jour leurs livraisons"
  ON public.deliveries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = deliveries.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

CREATE POLICY "Les clients peuvent voir leurs livraisons"
  ON public.deliveries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = deliveries.order_id
      AND orders.customer_id = auth.uid()
    )
  );

-- RLS Policies pour transactions
CREATE POLICY "Les admins peuvent voir toutes les transactions"
  ON public.transactions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Les restaurants peuvent voir leurs transactions"
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = transactions.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

CREATE POLICY "Les livreurs peuvent voir leurs transactions"
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = transactions.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

-- Indexes pour améliorer les performances
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_restaurants_owner_id ON public.restaurants(owner_id);
CREATE INDEX idx_restaurants_is_active ON public.restaurants(is_active);
CREATE INDEX idx_menu_items_restaurant_id ON public.menu_items(restaurant_id);
CREATE INDEX idx_menu_items_is_available ON public.menu_items(is_available);
CREATE INDEX idx_drivers_user_id ON public.drivers(user_id);
CREATE INDEX idx_drivers_restaurant_id ON public.drivers(restaurant_id);
CREATE INDEX idx_drivers_is_available ON public.drivers(is_available);
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_restaurant_id ON public.orders(restaurant_id);
CREATE INDEX idx_orders_driver_id ON public.orders(driver_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_deliveries_order_id ON public.deliveries(order_id);
CREATE INDEX idx_deliveries_driver_id ON public.deliveries(driver_id);
CREATE INDEX idx_transactions_order_id ON public.transactions(order_id);