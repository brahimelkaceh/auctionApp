# Application d'Enchères – Full Stack (Frontend & Backend)

## Présentation

Ce projet est une application web complète pour la gestion de ventes aux enchères en ligne. Il comprend :

- Un backend développé avec Spring Boot
- Un frontend développé avec React, Vite et Material-UI

Les utilisateurs peuvent s'inscrire (en tant qu'acheteur ou vendeur), publier des produits à vendre aux enchères, placer des offres, et suivre l'historique des enchères.

---

## Fonctionnalités principales

- **Authentification** : Inscription et connexion sécurisées pour les acheteurs et vendeurs (JWT)
- **Gestion des produits** : Les vendeurs peuvent ajouter, modifier et supprimer des produits
- **Système d’enchères** : Les acheteurs peuvent placer des enchères (10% supérieure à la dernière)
- **Historique des enchères** : Suivi pour chaque produit et chaque utilisateur
- **Dashboard** : Vue personnalisée selon le rôle (vendeur ou acheteur)
- **Routes protégées** : Certaines pages sont accessibles uniquement après authentification
- **Gestion des utilisateurs, produits et enchères**

---

## Installation

### Backend (Spring Boot)

1. **Prérequis** :
   - Java 17 ou supérieur
   - Maven
   - MySQL (base de données `auction_db`)
2. **Cloner le projet** :
   ```bash
   git clone https://github.com/brahimelkaceh/auctionApp.git
   cd backend
   ```
3. **Configurer la base de données** :
   Modifiez le fichier `src/main/resources/application.properties` si besoin :
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/auction_db
   spring.datasource.username=root
   spring.datasource.password=elkaceh@Brahim10
   ```
4. **Lancer l'application** :
   ```bash
   mvn spring-boot:run
   ```

### Frontend (React)

1. **Prérequis** :
   - Node.js >= 16
   - npm >= 8
2. **Installation des dépendances** :
   ```bash
   cd frontend
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

---

## Structure des dossiers

```
backend/
└── src/main/java/com/auction/springboot_auction_app/
    ├── controller/   # Contrôleurs REST (API)
    ├── service/      # Logique métier
    ├── repository/   # Accès aux données (JPA)
    ├── model/        # Entités JPA
    ├── dto/          # Objets de transfert de données
    ├── security/     # Utilitaires de sécurité (JWT)
    ├── config/       # Configuration (CORS, etc.)

frontend/
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
```

---

## Modèles principaux (Backend)

- **Client** : id, username, password, telephone, type (vendeur/acheteur)
- **Produit** : id, libelle, prix, statut (actif/inactif), image, proprietaire
- **Enchere** : id, date, prix, produit, client

---

## Endpoints principaux (Backend)

### Authentification

- `POST /api/clients/register` : Inscription
- `POST /api/clients/login` : Connexion (retourne accessToken et refreshToken)
- `POST /api/auth/refresh-token` : Rafraîchir le token d'accès

### Clients

- `GET /api/clients` : Liste des clients
- `GET /api/clients/{id}` : Détail d'un client
- `POST /api/clients` : Créer un client

### Produits

- `GET /api/produits` : Liste des produits
- `GET /api/produits/{id}` : Détail d'un produit
- `POST /api/produits` : Créer un produit
- `PUT /api/produits/{id}` : Modifier un produit
- `DELETE /api/produits/{id}` : Supprimer un produit

### Enchères

- `POST /api/encheres` : Placer une enchère (doit être exactement 10% supérieure à la dernière)
- `GET /api/encheres/produit/{id}` : Liste des enchères pour un produit
- `GET /api/encheres/client/{clientId}` : Liste des enchères d'un client

---

## Authentification & Sécurité (Backend)

- Authentification basée sur JWT (Json Web Token)
- Les tokens sont générés à la connexion et nécessaires pour accéder aux endpoints protégés
- Rafraîchissement du token via `/api/auth/refresh-token`
- Configuration CORS permettant l'accès depuis n'importe quelle origine pour faciliter le développement frontend

---

## Aperçu technique (Frontend)

- Utilisation de `AuthContext` pour gérer l’état de connexion, l’enregistrement, la connexion, la déconnexion et le rafraîchissement du token
- Les routes sensibles sont protégées via le composant `ProtectedRoute`
- Les vendeurs peuvent ajouter, modifier ou supprimer des produits via des formulaires dédiés
- Les produits sont affichés dans des tableaux avec actions contextuelles
- Les acheteurs peuvent placer des enchères sur les produits actifs (10% supérieure à la dernière offre)
- Historique des enchères affiché pour chaque produit et pour chaque utilisateur
- Principaux composants/pages : `Navbar`, `Dashboard`, `ProductsListPage`, `ProductDetailPage`, `AddProductPage`, `EditProductPage`, `LoginPage`, `RegisterPage`
- Hooks personnalisés : `useProduct` (gestion produits), `useEnchere` (gestion enchères)
- Appels API centralisés dans `src/api/` avec gestion automatique du token JWT via un intercepteur Axios

---

## Dépendances principales (Frontend)

- **React** (19.x)
- **Vite** (7.x)
- **Material-UI** (MUI)
- **Formik** & **Yup** (gestion des formulaires)
- **Axios** (requêtes HTTP)
- **React Query** (`@tanstack/react-query`)

---

## Démarrage rapide

1. Assurez-vous que MySQL tourne et que la base `auction_db` existe.
2. Lancez le backend avec `mvn spring-boot:run` (dans le dossier backend).
3. Lancez le frontend avec `npm run dev` (dans le dossier frontend).
4. Accédez à l’API via `http://localhost:8080` et à l’interface web via `http://localhost:5173` (par défaut).

---

## Remarques

- Ce frontend nécessite un backend compatible (API REST sur http://localhost:8080/api).
- Les images des produits sont référencées par URL.
- Les enchères expirent automatiquement après 3 jours.

---

## Ressources utiles

- [Documentation Spring Boot](https://spring.io/projects/spring-boot)
- [Guide RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Spring Data JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
