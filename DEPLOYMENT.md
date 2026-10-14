# 🚀 Guide de Déploiement — i'ago Tech sur Cloudflare Workers

Ce document décrit **tout le processus de déploiement** du site i'ago Tech vers Cloudflare Workers via OpenNext. Il est destiné à tous les membres de l'équipe.

---

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture du déploiement](#architecture-du-déploiement)
- [Prérequis](#prérequis)
- [Fichiers de configuration](#fichiers-de-configuration)
- [Commandes de déploiement](#commandes-de-déploiement)
- [Processus pas à pas](#processus-pas-à-pas)
- [Domaine personnalisé (iago.tech)](#domaine-personnalisé-iagotech)
- [Email professionnel (Cloudflare Email Routing)](#email-professionnel-cloudflare-email-routing)
- [Développement local avec Cloudflare](#développement-local-avec-cloudflare)
- [Variables d'environnement](#variables-denvironnement)
- [Dépannage (Troubleshooting)](#dépannage-troubleshooting)
- [FAQ](#faq)

---

## Vue d'ensemble

Le site est une application **Next.js 16** déployée sur **Cloudflare Workers** grâce à l'adaptateur **[@opennextjs/cloudflare](https://opennext.js.org/cloudflare)**.

```
Code Source (Next.js)
        │
        ▼
   next build          ← Compile le site Next.js
        │
        ▼
opennextjs-cloudflare  ← Transforme le build Next.js en Cloudflare Worker
   build
        │
        ▼
opennextjs-cloudflare  ← Déploie le Worker + assets sur Cloudflare
   deploy
        │
        ▼
 Cloudflare Workers    ← Site en production 🌍
```

### Pourquoi ce setup ?

- **Cloudflare Workers** offre un edge computing ultra-rapide (< 50ms de latence mondiale)
- **OpenNext** adapte Next.js (conçu pour Node.js/Vercel) pour fonctionner sur Cloudflare Workers
- Le déploiement se fait **depuis la machine locale** (pas via CI/CD Cloudflare Pages) car le build OpenNext est gourmand en mémoire

---

## Architecture du déploiement

```
┌────────────────────────────────────────────────────────┐
│                   Machine Locale                        │
│                                                        │
│  1. pnpm run deploy                                    │
│     └─► opennextjs-cloudflare build                    │
│         ├─► next build (compile Next.js)               │
│         └─► Bundle le Worker (.open-next/worker.js)    │
│     └─► opennextjs-cloudflare deploy                   │
│         ├─► Upload des assets statiques                │
│         └─► Upload du Worker                           │
│                                                        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                  Cloudflare Workers                     │
│                                                        │
│  Worker: iago-tech                                     │
│  URL: https://iago-tech.tatierovalalaina.workers.dev   │
│                                                        │
│  ├── worker.js        (SSR + routing)                  │
│  └── /assets/         (JS, CSS, images, fonts)         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Prérequis

| Outil        | Version   | Installation                           |
|-------------|-----------|----------------------------------------|
| Node.js     | ≥ 18      | https://nodejs.org/                    |
| pnpm        | ≥ 9       | `npm install -g pnpm`                  |
| Wrangler    | ≥ 4.150   | Installé automatiquement (devDep)      |
| Compte Cloudflare | —  | https://dash.cloudflare.com/sign-up    |

### Première utilisation

```bash
# 1. Cloner et installer
git clone <url-du-repo>
cd iago-tech
pnpm install

# 2. Se connecter à Cloudflare (une seule fois)
npx wrangler login
# → Ouvre le navigateur, autorisez l'accès
# → Le token est stocké dans ~/.wrangler/config/default.toml
```

---

## Fichiers de configuration

### `wrangler.jsonc` — Configuration Cloudflare Workers

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",      // Point d'entrée du Worker (généré par OpenNext)
  "name": "iago-tech",                 // Nom du Worker sur Cloudflare
  "compatibility_date": "2025-03-01",  // Version de l'API Workers
  "compatibility_flags": [
    "nodejs_compat",                   // Active les API Node.js dans Workers
    "global_fetch_strictly_public"
  ],
  "assets": {
    "directory": ".open-next/assets",  // Dossier des assets statiques (JS, CSS, images)
    "binding": "ASSETS"
  },
  "services": [{
    "binding": "WORKER_SELF_REFERENCE",
    "service": "iago-tech"             // Référence au Worker lui-même (pour le middleware)
  }],
  "observability": { "enabled": true } // Logs et métriques activés
}
```

### `open-next.config.ts` — Configuration OpenNext

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig({});
```

Fichier minimal. Possibilité d'ajouter des options avancées :
- `minify: true` pour réduire la taille du Worker
- Custom cache handlers
- Voir : https://opennext.js.org/cloudflare/get-started

### `next.config.mjs` — Configuration Next.js

Les lignes suivantes sont **obligatoires** pour le support Cloudflare en développement :

```js
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
```

### `.dev.vars` — Variables d'environnement Cloudflare (local)

```
NEXTJS_ENV=development
```

> ⚠️ Ce fichier **ne doit PAS** être commité. Il est l'équivalent de `.env.local` pour Cloudflare.

### `package.json` — Scripts pertinents

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload"
  }
}
```

---

## Commandes de déploiement

| Commande | Description |
|----------|-------------|
| `pnpm run dev` | Lancer le serveur de développement Next.js (localhost:3000) |
| `pnpm run preview` | Builder + lancer un aperçu local via Cloudflare Workers (Miniflare) |
| `pnpm run deploy` | **Builder + déployer en production** sur Cloudflare Workers |
| `pnpm run upload` | Builder + upload sans activer (pour tester avant de promouvoir) |

---

## Processus pas à pas

### Déployer en production

```bash
# 1. S'assurer d'être sur la branche main à jour
git checkout main
git pull origin main

# 2. Installer les dépendances (si nouveau pull)
pnpm install

# 3. Déployer
pnpm run deploy
```

Le script exécute automatiquement :
1. `opennextjs-cloudflare build` → appelle `next build` en interne + bundle le Worker
2. `opennextjs-cloudflare deploy` → upload les assets + le Worker vers Cloudflare

> **⚠️ IMPORTANT** : Le script `"build"` dans package.json **doit rester** `"next build"` uniquement.
> `opennextjs-cloudflare build` appelle déjà `pnpm run build` en interne. Si on y ajoute `opennextjs-cloudflare build`, cela crée une **boucle infinie récursive** qui fait crasher le build (OOM).

### Vérifier le déploiement

```bash
# Voir le statut du Worker
npx wrangler deployments list

# Voir les logs en temps réel
npx wrangler tail
```

### Vérifier le SEO (robots + sitemap)

Après chaque déploiement, contrôler que les fichiers SEO sont bien servis :

```bash
BASE=https://iago.tech  # ou l'URL du Worker

# robots.txt — doit lister les règles + le sitemap
curl -s $BASE/robots.txt

# sitemap.xml — doit lister /fr, /en et les anchors (#services, …)
curl -s $BASE/sitemap.xml | head -30
```

Ces fichiers sont générés par `src/app/robots.ts` et `src/app/sitemap.ts`.
Les URLs utilisent `SITE_URL` (`src/lib/constants.ts`), alimentée par
`NEXT_PUBLIC_SITE_URL` au moment du build — voir [Domaine personnalisé](#domaine-personnalisé-iagotech).

---

## Domaine personnalisé (iago.tech)

Le Worker est servi par défaut sur `https://iago-tech.<compte>.workers.dev`.
Pour exposer le site sur `https://iago.tech` :

1. **Attacher le domaine au Worker** (une seule fois) :
   Dashboard Cloudflare → Workers & Pages → `iago-tech` → Settings → Domains & Routes → Add → Custom Domain → `iago.tech` (et `www.iago.tech` si besoin).
   Le certificat TLS est provisionné automatiquement.

2. **Figer l'URL canonique au build** : `SITE_URL` vaut `https://iago.tech` par défaut
   (`src/lib/constants.ts`). Pour la surcharger, définir la variable **au moment du build** :

   ```bash
   NEXT_PUBLIC_SITE_URL=https://iago.tech pnpm run deploy
   ```

   > ⚠️ `NEXT_PUBLIC_*` est injectée dans le bundle JS **à la compilation**.
   > La modifier après le déploiement (via `wrangler secret` ou le dashboard)
   > n'a aucun effet sans rebuild. En local, utiliser `.dev.vars` ou `.env.local`.

---

## Email professionnel (Cloudflare Email Routing)

L'adresse publique du site est **`info@iago-tech.com`** (constante `CONTACT_EMAIL`
dans `src/lib/constants.ts`, affichée dans la section Contact, le footer et le JSON-LD).
Les messages envoyés à cette adresse sont **redirigés gratuitement** vers la boîte
`fitiavanaandrianirina57@gmail.com` via **Cloudflare Email Routing**.

### Fonctionnement

```
Visiteur (formulaire mailto: / client mail)
        │
        ▼  To: info@iago-tech.com
Cloudflare Email Routing (MX de iago.tech)
        │
        ▼  Redirection
fitiavanaandrianirina57@gmail.com  ← boîte de réception de l'équipe
```

> ⚠️ **Email Routing ne fait que recevoir et rediriger.** Il ne permet pas
> d'envoyer des emails depuis `info@iago-tech.com`. Les réponses de l'équipe
> partent donc de l'adresse Gmail, sauf à configurer un « Envoyer en tant que »
> côté Gmail (voir [Limites](#limites-connues) ci-dessous).

### Prérequis

- Le domaine `iago.tech` doit être **géré par Cloudflare** (nameservers Cloudflare,
  zone active) — c'est déjà le cas si le [domaine personnalisé](#domaine-personnalisé-iagotech) est en place.

### Configuration pas à pas (une seule fois)

1. **Activer Email Routing** :
   Dashboard Cloudflare → `iago.tech` → Email → Email Routing → Get started,
   puis suivre l'assistant (Cloudflare ajoute automatiquement les enregistrements
   DNS `MX`, `SPF` (`TXT`) et `DKIM` nécessaires à la réception).

2. **Ajouter l'adresse de destination et la vérifier** :
   Email → Email Routing → Destination addresses → Add →
   `fitiavanaandrianirina57@gmail.com`, puis cliquer sur le **lien de
   vérification** reçu dans la boîte Gmail (statut `Verified` requis).

3. **Créer l'adresse personnalisée** :
   Email → Email Routing → Routing rules → Create address →
   Custom address `info` (→ `info@iago-tech.com`) → Destination
   `fitiavanaandrianirina57@gmail.com` → Save.

4. **(Optionnel) Catch-All** : activer `Catch-All address` vers la même
   destination pour recevoir aussi les emails envoyés à des adresses
   inexistantes de `iago.tech` (ex. fautes de frappe comme `contact@`).

### Tester

```bash
# Depuis n'importe quelle boîte mail, envoyer un message à :
#   To: info@iago-tech.com
# → Le message doit arriver dans fitiavanaandrianirina57@gmail.com
#   (délai habituel : quelques secondes, vérifier les spams la 1ʳᵉ fois)
```

### Limites connues

- **Pas d'envoi** : pour répondre en affichant `info@iago-tech.com` comme
  expéditeur, configurer dans Gmail : Paramètres → Comptes et importation →
  « Envoyer des e-mails en tant que » → ajouter `info@iago-tech.com`
  (nécessite un SMTP externe — ex. compte SMTP d'un hébergeur mail ou service
  transactionnel — Cloudflare ne fournit pas de SMTP sortant).
- **Pièces jointes** : limite de 25 Mo par message redirigé.
- **Filtrage spam** : les messages suspects peuvent être rejetés avant
  redirection ; en cas de message manquant, vérifier Email → Email Routing →
  Overview → Activity log.

---

## Développement local avec Cloudflare

Pour tester le site dans un environnement Workers local (Miniflare) :

```bash
pnpm run preview
```

Cela reproduit l'environnement Cloudflare Workers en local, utile pour :
- Tester les bindings Cloudflare (KV, D1, etc.)
- Vérifier le comportement du middleware
- Débugger des problèmes spécifiques à Workers

---

## Variables d'environnement

### En local

Créer un fichier `.dev.vars` à la racine :

```
NEXTJS_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### En production

Les variables d'environnement se configurent via :

```bash
# Ajouter un secret
npx wrangler secret put NOM_DE_LA_VARIABLE

# Ou via le dashboard Cloudflare :
# Dashboard → Workers & Pages → iago-tech → Settings → Variables
```

---

## Dépannage (Troubleshooting)

### ❌ "Could not find compiled Open Next config"

**Cause** : Le build OpenNext n'a pas été exécuté avant le deploy.
**Solution** : Utiliser `pnpm run deploy` (et non `npx wrangler deploy` seul).

### ❌ OOM (Out of Memory) en CI/CD

**Cause** : `opennextjs-cloudflare build` consomme beaucoup de mémoire. Les containers CI (Vercel, Cloudflare Pages) ont des limites de RAM.
**Solution** : Déployer depuis la machine locale avec `pnpm run deploy`.

### ❌ Boucle infinie de builds

**Cause** : Le script `"build"` contient `opennextjs-cloudflare build`.
**Solution** : Le script `"build"` doit être **uniquement** `"next build"`. OpenNext appelle déjà `pnpm run build` en interne.

### ❌ "Attempting to login via OAuth..."

**Cause** : Wrangler n'est pas authentifié.
**Solution** : Exécuter `npx wrangler login` et autoriser via le navigateur. Le token est stocké localement dans `~/.wrangler/`.

### ❌ Le navigateur OAuth s'est fermé sans autorisation

**Solution** : Relancer `pnpm run deploy` ou `npx wrangler login` séparément pour réouvrir la page.

### ❌ Worker trop volumineux (> 10 MB)

**Solution** :
- Vérifier les images dans `/public` (les optimiser ou les servir via un CDN externe)
- Activer la minification dans `open-next.config.ts`
- Externaliser les grosses dépendances

---

## FAQ

### Peut-on déployer via CI/CD (GitHub Actions, etc.) ?

Oui, en utilisant un **API Token Cloudflare** au lieu de OAuth :

```bash
# Dans les secrets GitHub Actions
CLOUDFLARE_API_TOKEN=<votre-token>
CLOUDFLARE_ACCOUNT_ID=<votre-account-id>
```

```yaml
# .github/workflows/deploy.yml
- name: Deploy to Cloudflare
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  run: pnpm run deploy
```

> Note : Le runner doit avoir suffisamment de RAM (≥ 4 GB recommandé).

### Où voir les logs de production ?

```bash
npx wrangler tail
```

Ou via le dashboard : [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → iago-tech → Logs.

### Comment faire un rollback ?

```bash
# Lister les versions déployées
npx wrangler deployments list

# Rollback à une version précédente
npx wrangler rollback <deployment-id>
```

### Quelle est la différence entre `deploy` et `upload` ?

- `deploy` : Upload + active immédiatement la nouvelle version
- `upload` : Upload seulement (la version n'est pas activée). Utile pour valider avant de promouvoir manuellement.

---

## Liens utiles

- [Documentation OpenNext pour Cloudflare](https://opennext.js.org/cloudflare)
- [Documentation Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Dashboard Cloudflare](https://dash.cloudflare.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
