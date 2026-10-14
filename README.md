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

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Internationalisation** : [next-intl](https://next-intl-docs.vercel.app/) (FR / EN)
- **Hébergement** : [Cloudflare Workers](https://workers.cloudflare.com/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

## Installation & Lancement

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd iago-tech
   ```

2. **Installer les dépendances** (gestionnaire requis : `pnpm ≥ 9`)
   ```bash
   pnpm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   pnpm run dev
   ```
   Le site sera accessible sur `http://localhost:3000`.

## Scripts Disponibles

- `pnpm run dev` : Lance le serveur Next.js en mode développement.
- `pnpm run build` : Compile l'application Next.js pour la production.
  > ⚠️ Doit rester `next build` uniquement : `opennextjs-cloudflare build` l'appelle déjà en interne (risque de boucle infinie sinon).
- `pnpm run start` : Lance l'application compilée en production (Node.js).
- `pnpm run lint` : Exécute ESLint pour vérifier la qualité du code.
- `pnpm run preview` : Build OpenNext + aperçu local dans l'environnement Cloudflare Workers (Miniflare).
- `pnpm run deploy` : Build OpenNext + **déploiement en production** sur Cloudflare Workers.
- `pnpm run upload` : Build OpenNext + upload sans activer (validation avant promotion).
- `pnpm run cf-typegen` : Génère les types des bindings Cloudflare (`cloudflare-env.d.ts`).

## Déploiement

Le projet est déployé sur **[Cloudflare Workers](https://workers.cloudflare.com/)** via [OpenNext](https://opennext.js.org/cloudflare), depuis la machine locale :

```bash
pnpm run deploy
```

📖 **Guide complet pour l'équipe : voir [DEPLOYMENT.md](./DEPLOYMENT.md)**
(prérequis, configuration Wrangler, variables d'environnement, domaine personnalisé, email professionnel, dépannage, FAQ).

## Contact

- **Email public** : `info@iago-tech.com` (section Contact, footer, JSON-LD) — redirigé via [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/) vers la boîte de l'équipe. Procédure de configuration dans le [DEPLOYMENT.md](./DEPLOYMENT.md#email-professionnel-cloudflare-email-routing).

## SEO

- `src/app/robots.ts` → `/robots.txt` : règles pour les moteurs de recherche (`Crawl-delay: 10`), blocage des bots IA d'entraînement et des scrapers SEO agressifs.
- `src/app/sitemap.ts` → `/sitemap.xml` : pages `/fr` et `/en` + sections avec anchors (`#services`, `#about`, `#process`, `#contact`), alternates `hreflang` et image OG.

## Charte Graphique (Résumé)

- **Couleurs Principales** :
  - Brand (Bleu) : `#5170FF`
  - Encre : `#1D1D1B`
  - Brume (Fond Clair) : `#F2F4FB`
- **Typographie** : Archivo (Titres) et Inter (Corps de texte).
- **Style** : Moderne, propre, minimaliste (Grid 8px, Radius 10px).
