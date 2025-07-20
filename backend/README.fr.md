# Spring Boot Auction App

## Description

Ce projet est une application web complète pour la gestion de ventes aux enchères en ligne. Il s'agit d'un backend développé avec Spring Boot, destiné à être utilisé avec un frontend  React.js. Les utilisateurs peuvent s'inscrire, publier des produits à vendre aux enchères et placer des offres.

## Fonctionnalités principales

- Inscription et authentification des utilisateurs (vendeur/acheteur)
- Publication de produits
- Enchères sur les produits
- Gestion des utilisateurs, produits et enchères
- Authentification JWT

## Installation

1. **Prérequis** :
   - Java 17 ou supérieur
   - Maven
   - MySQL (base de données `auction_db`)
2. **Cloner le projet** :
   ```bash
   git clone <repo-url>
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

## Architecture du projet

```
src/main/java/com/auction/springboot_auction_app/
├── controller/   # Contrôleurs REST (API)
├── service/      # Logique métier
├── repository/   # Accès aux données (JPA)
├── model/        # Entités JPA
├── dto/          # Objets de transfert de données
├── security/     # Utilitaires de sécurité (JWT)
├── config/       # Configuration (CORS, etc.)
```

## Modèles principaux

- **Client** : id, username, password, telephone, type (vendeur/acheteur)
- **Produit** : id, libelle, prix, statut (actif/inactif), image, proprietaire
- **Enchere** : id, date, prix, produit, client

## Endpoints principaux

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

## Authentification & Sécurité

- Authentification basée sur JWT (Json Web Token)
- Les tokens sont générés à la connexion et nécessaires pour accéder aux endpoints protégés
- Rafraîchissement du token via `/api/auth/refresh-token`

## Configuration CORS

La configuration CORS permet l'accès depuis n'importe quelle origine pour faciliter le développement frontend.

## Démarrage rapide

1. Assurez-vous que MySQL tourne et que la base `auction_db` existe.
2. Lancez l'application avec `mvn spring-boot:run`.
3. Accédez à l'API via `http://localhost:8080`.

## Ressources utiles

- [Documentation Spring Boot](https://spring.io/projects/spring-boot)
- [Guide RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Spring Data JPA](https://spring.io/guides/gs/accessing-data-jpa/)

---
