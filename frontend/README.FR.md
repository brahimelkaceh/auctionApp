# Application d'Enchères – Frontend

## Présentation

Ce projet est le frontend d'une application d'enchères en ligne, développé avec React, Vite et Material-UI. Il permet aux utilisateurs de s'inscrire en tant qu'acheteur ou vendeur, de gérer des produits, de placer des enchères et de suivre l'historique des offres.

## Fonctionnalités principales

- **Authentification** : Inscription et connexion sécurisées pour les acheteurs et vendeurs.
- **Gestion des produits** : Les vendeurs peuvent ajouter, modifier et supprimer des produits.
- **Navigation** : Interface utilisateur moderne avec une barre de navigation adaptative.
- **Liste des produits** : Les acheteurs peuvent parcourir les produits disponibles et accéder à leur détail.
- **Détail produit & enchères** : Affichage des détails d’un produit, historique des enchères, et possibilité de placer une nouvelle enchère (10% supérieure à la dernière).
- **Historique des enchères** : Les acheteurs peuvent consulter l’historique de leurs offres.
- **Dashboard** : Vue personnalisée selon le rôle (vendeur ou acheteur).
- **Routes protégées** : Certaines pages sont accessibles uniquement après authentification.

## Installation

1. **Prérequis** :

   - Node.js >= 16
   - npm >= 8

2. **Installation des dépendances** :

   ```bash
   npm install
   ```

3. **Lancement du serveur de développement** :

   ```bash
   npm run dev
   ```

4. **Build pour la production** :
   ```bash
   npm run build
   ```

## Structure des dossiers

```
frontend/
│
├── public/                # Fichiers statiques
├── src/
│   ├── api/               # Appels API (produits, enchères, clients)
│   ├── assets/            # Images et ressources statiques
│   ├── components/        # Composants réutilisables (Navbar, Formulaires, etc.)
│   ├── contexts/          # Contextes React (authentification, routes protégées)
│   ├── hooks/             # Hooks personnalisés (produits, enchères)
│   ├── pages/             # Pages principales (Dashboard, Login, Register, etc.)
│   ├── services/          # Logique métier (produits, enchères)
│   ├── style.css          # Styles globaux
│   └── main.jsx           # Point d'entrée principal
├── package.json           # Dépendances et scripts
├── vite.config.js         # Configuration Vite
└── README.FR.md           # Documentation (ce fichier)
```

## Aperçu technique

### Authentification

- Utilisation de `AuthContext` pour gérer l’état de connexion, l’enregistrement, la connexion, la déconnexion et le rafraîchissement du token.
- Les routes sensibles sont protégées via le composant `ProtectedRoute`.

### Gestion des produits

- Les vendeurs peuvent ajouter, modifier ou supprimer des produits via des formulaires dédiés.
- Les produits sont affichés dans des tableaux avec actions contextuelles.

### Système d’enchères

- Les acheteurs peuvent placer des enchères sur les produits actifs.
- Chaque nouvelle enchère doit être exactement 10% supérieure à la dernière offre.
- Historique des enchères affiché pour chaque produit et pour chaque utilisateur.

### Principaux composants/pages

- `Navbar` : Barre de navigation adaptative selon le rôle et l’état de connexion.
- `Dashboard` : Vue d’accueil personnalisée (liste des produits pour le vendeur, historique des enchères pour l’acheteur).
- `ProductsListPage` : Liste des produits disponibles.
- `ProductDetailPage` : Détail d’un produit et section d’enchères.
- `AddProductPage` / `EditProductPage` : Formulaires pour ajouter ou modifier un produit.
- `LoginPage` / `RegisterPage` : Authentification et inscription.

### Hooks personnalisés

- `useProduct` : Gestion des requêtes produits (CRUD).
- `useEnchere` : Gestion des enchères (récupération, création).

### Appels API

- Centralisés dans le dossier `src/api/` avec gestion automatique du token JWT via un intercepteur Axios.

## Dépendances principales

- **React** (19.x)
- **Vite** (7.x)
- **Material-UI** (MUI)
- **Formik** & **Yup** (gestion des formulaires)
- **Axios** (requêtes HTTP)
- **React Query** (`@tanstack/react-query`)

## Remarques

- Ce frontend nécessite un backend compatible (API REST sur http://localhost:8080/api).
- Les images des produits sont référencées par URL.
- Les enchères expirent automatiquement après 3 jours.

---
