# StreamLive

Plateforme premium de sport en direct et en rediffusion, avec une interface animée
(React + Vite + TypeScript + Tailwind CSS + Framer Motion + HLS.js).

> ⚠️ **Légalité.** Ce projet est conçu pour ne diffuser que des sources **légales,
> ouvertes ou sous licence que vous détenez**. Le catalogue par défaut n'utilise que
> des vidéos de démonstration libres (Creative Commons / exemples techniques).
> Aucun flux sportif sous droits n'est inclus et la redistribution non autorisée de
> flux est illégale. Voir la page « Sources » dans l'application.

## Fonctionnalités

- Page d'accueil avec hero animé auto-rotatif et carrousels horizontaux
- En direct & à venir, rediffusions, compétitions, recherche, favoris (localStorage)
- Lecteur HLS/MP4/iframe avec sélection de sources, plein écran, gestion du son
- Design premium : glassmorphism, dégradés, transitions de page, micro-interactions
- Responsive mobile → desktop

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production
npm run preview  # prévisualiser le build
```

## Ajouter vos sources légales

Tout le catalogue est centralisé dans `src/data/catalog.ts`. Ajoutez une entrée dans
le tableau `sources` d'un événement :

```ts
const MA_SOURCE = {
  id: "source-officielle-1",
  label: "Flux principal",
  kind: "hls",              // "hls" | "mp4" | "iframe"
  url: "https://exemple.com/live/master.m3u8",
  provider: "Mon fournisseur",
  quality: "1080p",
  language: "FR",
  license: "official",      // vous confirmez détenir les droits
};
```

Le champ `license` accepte : `public-domain`, `creative-commons`, `demo`,
`official`, `your-license`.

## Stack

- React 18, TypeScript, Vite
- Tailwind CSS v4
- Framer Motion
- hls.js
- React Router
- lucide-react
