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

Clonez le repository : [URL_DU_REPOSITORY]
Allez dans le dossier backend : [NOM_DU_REPOSITORY]/back_ecom
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
