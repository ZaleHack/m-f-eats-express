# M&F Eats – Spécification Fonctionnelle

## Architecture technique
- **Frontend :** React 18, TypeScript, React Router v7
- **UI :** Tailwind CSS, icônes lucide-react
- **Backend :** Bolt Database (PostgreSQL + Auth + RLS)
- **Bdd :** 16 tables interconnectées avec contraintes et index
- **Auth :** Email/password via Bolt Database Auth
- **Sécurité :** Row Level Security par rôle utilisateur

## Rôles et parcours

### 1. Client
- Dashboard : recherche + filtres (note, livraison, minimum), liste des restaurants ouverts/vérifiés.
- Menu restaurant : catégories, images, tags, options modulant le prix, panier persistant avec résumé.
- Checkout : édition quantités, adresse, téléphone, notes, paiement (Espèces, Wave, Orange Money), validation.
- Suivi temps réel : statut de Pending → Delivered avec notifications, timeline, infos livreur + carte GPS.
- Profil : identité, adresse par défaut (géoloc), historique avec filtres, points de loyauté, adresses sauvegardées.
- Historique commandes : récap détaillé, recommander, évaluer restaurant/livreur, télécharger facture.

### 2. Restaurant
- Dashboard : statistiques (commandes, revenus), graphiques, alertes, actions rapides (horaires/fermeture).
- Profil établissement : identité, cuisine, adresse + GPS, horaires, minimum, frais livraison, commission, compte bancaire, statut vérification.
- Catégories de menu : CRUD + ordre et image, activation.
- Plats : CRUD avec description, prix, tags (végé/épicé/sans gluten), disponibilité, ordre, temps préparation, stock.
- Options : groupes (Tailles/Suppléments) avec prix modificateur, obligatoire vs optionnel.
- Commandes : flux Pending → Delivered, actions (Accepter/Rejeter, Prête, Assigner livreur), filtres et notes client.
- Livreurs : liste + statut, historique et évaluations, assignation/ retrait de commandes.
- Candidatures livreurs : approbation/rejet avec motif, historique.
- Rapports : revenus par période, commandes par heure, populaires, évaluations, performance livreurs.
- Paiements : coordonnées bancaires, historique virements, solde, commissions.

### 3. Livreur
- Dashboard : statut en ligne/offline, disponibilité, stats (totales/aujourd'hui), solde, note moyenne.
- Profil : identité, véhicule, plaque, ID/permis, compte bancaire, photo, documents vérification.
- Candidatures restaurants : liste + recherche, statut (En attente/Approuvé/Rejeté) avec motif.
- Tableau de bord livraisons : colonnes En attente, En cours, Historique avec détails et actions (Accepter/Refuser/Consulter).
- Détails livraison : infos commande/client/restaurant, itinéraire, estimation, actions navigation/appel.
- Suivi GPS/navigation : géoloc temps réel, carte, mise à jour 30 s, distance/direction, historique trajets.
- Gestion livraison : statuts Picked up/Delivered, photo preuve, signature optionnelle, feedback problème, évaluations reçues.
- Historique : filtres, montants payés, dates de paiement.
- Paiements : solde, gains par livraison, calendrier et montants, compte bancaire, commissions par restaurant.
- Notifications : nouvelles livraisons, changement de statut, messages, rappels.

### 4. Administrateur
- Dashboard global : KPIs (utilisateurs, restaurants actifs, commandes, livraisons, revenu), graphiques et alertes.
- Utilisateurs : liste + filtres par rôle/statut/date, recherche, actions (suspendre/activer, changer rôle, supprimer), historique activité, édition profil.
- Restaurants : liste + filtres (vérifié/actif/cuisine/ville), actions (approuver/rejeter/suspendre/supprimer), consultation menu et commandes, réglages commission/frais, stats.
- Livreurs : liste + statut vérification, actions (approuver/rejeter/suspendre), livraisons, historique/évaluations, documents, candidatures.
- Commandes globales : vue complète avec filtres/recherche, résolution (annulation/remboursement), audit.
- Livraisons globales : liste + filtres, carte GPS livreurs actifs, stats (taux réussite, temps moyen), gestion livreurs à risque.
- Paiements & finances : transactions, virements restaurants/livreurs, commissions, Wave/Orange Money, rapprochements.
- Commission : défaut, par restaurant, frais plateforme/paiement, historique des changements.
- Support/modération : signalements, réclamations, chat, tickets, FAQ/documentation, modération avis.
- Rapports/analytics : rapports mensuels, tendances, analyses géographiques, performances, export PDF/Excel.
- Paramètres plateforme : configuration générale, zones de couverture, horaires service, politiques, maintenance, logs.

## Fonctionnalités transversales
- Notifications temps réel (nouvelle commande, changement de statut, assignation, messages).
- Suivi GPS temps réel visible pour client et restaurant, ETA dynamique.
- Paiements : espèces, Wave, Orange Money avec gestion des échecs et reçus.
- Avis/évaluations : clients évaluent restaurant et livreur (1–5⭐) avec commentaires, preuves, historique, modération.
- Programme de loyauté : points, réductions, paliers (Or/Argent/Bronze), coupons/promo.
- Localisation : langue principale français, XOF, zones Dakar/Sénégal.
- Performance : mobile-first, PWA, temps de chargement <3s, optimisation assets.
- Sécurité/conformité : HTTPS, chiffrement, RLS, RGPD (droit à l’oubli), audit trail, protection injections SQL.

## Flux utilisateurs clés
- Client : Inscription/Connexion → Dashboard → Recherche restaurant → Menu → Panier → Checkout → Suivi → Évaluation.
- Restaurant : Inscription/Vérification → Profil → Menu → Dashboard → Commandes → Paiements.
- Livreur : Inscription → Vérification → Candidatures → Dashboard → Navigation → Livraison → Paiement.
- Admin : Connexion → Dashboard global → Modération → Paiements → Rapports.
