# 🎬 Movie App

## Description

Application React permettant de consulter des films via l’API **The Movie Database (TMDB)**.  
L’utilisateur peut parcourir des films, rechercher, voir les détails, les acteurs et gérer une wishlist.

---

## Fonctionnalités

- Liste de films par catégories (Popular, Now Playing, Top Rated, Upcoming)
- Recherche de films avec debounce
- Pagination (20 films par page)
- Page détail d’un film :
  - Informations détaillées
  - Acteurs principaux
  - Films similaires
- Wishlist :
  - Ajouter / retirer un film
  - État global avec Context API
  - Sauvegarde dans le localStorage

---

## Technologies utilisées

- React
- React Router
- Context API
- Hooks (useState, useEffect, useContext)
- CSS Modules
- Vite
- API TMDB

---

## Configuration

Créer un fichier `.env` à la racine du projet en vous appuyant sur le .env.example


## Lancer le projet

```bash
npm install
npm run dev