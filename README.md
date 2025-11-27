# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/fe80f397-1d15-41e0-816b-2dd95eb8cdec

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fe80f397-1d15-41e0-816b-2dd95eb8cdec) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fe80f397-1d15-41e0-816b-2dd95eb8cdec) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Configuration de la base de données MySQL locale

La plateforme M&F Eats est conçue pour fonctionner avec une base MySQL hébergée en local.

- **Hôte** : `localhost` (surchargé via `MYSQL_HOST`)
- **Utilisateur** : `root` (surchargé via `MYSQL_USER`)
- **Mot de passe** : vide (surchargé via `MYSQL_PASSWORD`)
- **Base utilisée** : `mf_eats` (surchargé via `MYSQL_DATABASE`, créée automatiquement)

Pour provisionner la base principale et toutes les tables métier (utilisateurs, restaurants, menus, commandes, livreurs, transactions, etc.), exécutez :

```sh
npm run setup:db
```

Les scripts utilisent les variables d'environnement suivantes (voir `.env.example`) :

```ini
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=mf_eats
```

La commande utilise le client MySQL local pour créer la base et l’ensemble du schéma relationnel nécessaire au fonctionnement de l’application. Vous pouvez ensuite ajuster la configuration de sécurité (mot de passe, hôtes autorisés) selon vos besoins d’administration.

> ℹ️ Lorsqu'on démarre l'application (`npm run dev` ou `npm run preview`), un script vérifie automatiquement l'existence de la base `mf_eats` et la crée si nécessaire, en s'appuyant sur le même fichier SQL. La commande manuelle reste disponible pour un provisionnement explicite.

> ⚠️ Si le client `mysql` n'est pas installé sur votre machine, le démarrage continuera mais le provisionnement automatique sera ignoré. Vous pouvez définir `MYSQL_CLIENT=mariadb` (client fourni par MariaDB) pour activer le provisioning ou installer le paquet `mysql-client` (ou équivalent). En cas d'absence totale de client, exécutez le fichier `scripts/setup-mysql.sql` avec l'outil de votre choix pour créer la base avant d'utiliser l'application.
