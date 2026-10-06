# i'ago Tech - Site Vitrine

Bienvenue sur le dépôt du site vitrine officiel de **i'ago Tech**.
Ce projet a été conçu avec Next.js (App Router), Tailwind CSS v4, Framer Motion et shadcn/ui, en suivant une architecture claire et les principes SOLID.

## Architecture & Structure (SOLID)

L'architecture du projet a été pensée pour être évolutive, lisible et performante :

- **Séparation des responsabilités (Single Responsibility Principle)** :
  - `src/components/layout/` : Contient uniquement les éléments structurels globaux (Header, Footer, Nav, ThemeProvider).
  - `src/components/sections/` : Contient les différentes sections fonctionnelles (Hero, Services, About, Process, Contact). Chaque section est indépendante.
  - `src/components/animations/` : Composants réutilisables d'animation (Framer Motion) pour isoler la logique complexe d'animation (`RevealOnScroll`).
  - `src/components/ui/` : Composants atomiques purs (shadcn/ui), sans logique métier.
- **Internationalisation (i18n)** :
  - Support multilingue (FR / EN) géré via `next-intl` (voir `src/i18n/` et `/messages`).
- **Design Tokens centralisés** :
  - Couleurs, typographies et bordures définies directement dans `src/app/globals.css` (Tailwind v4) via la charte graphique officielle.

## Technologies Utilisées

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Internationalisation** : [next-intl](https://next-intl-docs.vercel.app/)

## Installation & Lancement

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd iago-tech
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Le site sera accessible sur `http://localhost:3000`.

## Scripts Disponibles

- `npm run dev` : Lance le serveur en mode développement.
- `npm run build` : Compile l'application pour la production (optimisation SEO et assets).
- `npm run start` : Lance l'application compilée en production.
- `npm run lint` : Exécute ESLint pour vérifier la qualité du code.

## Déploiement

Le projet est prêt à être déployé sur des plateformes comme [Vercel](https://vercel.com/) ou via [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## Charte Graphique (Résumé)

- **Couleurs Principales** :
  - Brand (Bleu) : `#5170FF`
  - Encre : `#1D1D1B`
  - Brume (Fond Clair) : `#F2F4FB`
- **Typographie** : Archivo (Titres) et Inter (Corps de texte).
- **Style** : Moderne, propre, minimaliste (Grid 8px, Radius 10px).
