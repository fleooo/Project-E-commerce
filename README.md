# Test Recrutement Teach'r 2024

## Description
Ce projet est une application de gestion de produits et de catégories avec un backend Symfony et un frontend React. Il inclut les fonctionnalités suivantes :
- Gestion des produits et des catégories (CRUD).
- Tableaux interactifs pour l'affichage des données.
- Gestion de l'état global avec Redux.
- Application stylisée avec Tailwind CSS.

## Technologies utilisées
- **Backend** : Symfony 6, API REST, JWT pour l'authentification.
- **Frontend** : React, Redux, Tailwind CSS.
- **Base de données** : MySQL.

---

## Instructions d'installation

### **Prérequis**
- PHP 8.1+
- Composer
- Node.js 16+ et npm
- MySQL 8+

### **Étapes**

#### 1. Clonez le repository
```bash

Installation du backend
Clonez le projet et accédez au dossier backend :
Cloner le repository : https://github.com/fleooo/Project-Teach-R.git
Configurez la base de données :
Localisez le fichier .env et mettez à jour la ligne suivante avec vos informations MySQL :
makefile
Copier le code
DATABASE_URL="mysql://UTILISATEUR:PASSWORD@127.0.0.1:3306/back_ecom?serverVersion=8.0"


Installez les dépendances backend :
Exécutez composer install pour installer toutes les dépendances nécessaires.
Configurez la base de données :
Créez la base de données et appliquez les migrations :
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
Lancez le serveur Symfony :
Utilisez la commande symfony server:start.

Installation du frontend
Installez les dépendances frontend : utilisez la commande npm install.
Lancez le serveur React avec la commande npm start.

Choix techniques
1. Backend : Symfony 6
Symfony a été choisi pour sa robustesse, sa flexibilité et sa large communauté. Il est particulièrement adapté pour les applications web complexes, offrant des outils puissants pour la gestion des entités, des requêtes SQL et des API REST.
API REST
L'API RESTful a été choisie pour permettre une communication claire et structurée entre le frontend React et le backend Symfony. Elle permet également une évolutivité facile, en facilitant l'intégration avec d'autres systèmes si nécessaire. L'architecture REST permet de séparer clairement les responsabilités entre le serveur (backend) et le client (frontend).
Doctrine ORM pour la gestion des entités et des relations
Doctrine ORM est utilisé pour gérer les entités et les relations entre elles. Il permet de gérer la persistance des données avec une abstraction du SQL, facilitant la gestion des objets en base de données.
Entité Product : Contient les informations liées aux produits, telles que le nom, la description, le prix, la catégorie, etc.
Entité Category : Contient les informations des catégories de produits, et utilise une relation OneToMany avec Product pour lier plusieurs produits à une catégorie.
Relations entre les entités : Une relation ManyToOne existe entre Product et Category, ce qui signifie qu'un produit appartient à une seule catégorie, tandis qu'une catégorie peut contenir plusieurs produits.
2. Frontend : React, Redux, Tailwind CSS
React a été choisi pour le développement du frontend en raison de sa popularité, de sa facilité d'utilisation et de son efficacité pour créer des interfaces utilisateur dynamiques. React permet de gérer l'état de l'application et de mettre à jour le DOM de manière optimisée grâce au Virtual DOM.
Gestion de l'état avec Redux
Redux est utilisé pour gérer l'état global de l'application, en particulier les produits et les catégories. L'utilisation de Redux permet de centraliser l'état et de garantir que toutes les parties de l'application qui en ont besoin puissent y accéder. Redux simplifie également le processus de gestion des données et assure une gestion de l'état prédictible.
Actions asynchrones : Des actions comme fetchProducts, addProduct, updateProduct, et deleteProduct sont définies comme des "thunks" (via createAsyncThunk) dans Redux, permettant d'effectuer des appels API et de gérer l'état en fonction des réponses.
Tailwind CSS pour le style
Ce framework utilitaire permet de créer des designs modernes en utilisant des classes CSS prédéfinies pour les marges, les espacements, les couleurs, etc. Il permet de personnaliser rapidement le style de l'application sans se soucier de la gestion des classes CSS longues et redondantes.
L'utilisation de Tailwind rend le développement plus rapide et modulaire, permettant de créer des interfaces réactives sans se perdre dans des fichiers CSS volumineux.
3. Base de données : MySQL
MySQL est utilisé comme base de données relationnelle pour stocker les informations des produits et des catégories. Elle a été choisie en raison de sa robustesse, de sa large adoption et de sa compatibilité avec Symfony et Doctrine ORM. La base de données permet de gérer efficacement les relations entre les entités (produits et catégories) et de faciliter les requêtes complexes.
