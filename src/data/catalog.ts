import type { Competition, EventItem, StreamSource } from "@/types";

/**
 * Catalogue de démonstration.
 *
 * IMPORTANT — Légalité :
 * Tous les flux ci-dessous sont des vidéos de démonstration ouvertes
 * (Big Buck Bunny, Sintel, Tears of Steel, exemples Apple/Google) diffusées
 * sous licence libre ou à titre de démonstration technique.
 * Aucun flux sportif sous droits n'est inclus.
 *
 * Pour brancher VOS sources légales (droits possédés, API partenaire,
 * flux officiel public), remplacez simplement les URLs dans `sources`
 * ou branchez votre propre backend sur ce modèle de données.
 */

const HOUR = 3600_000;
const MIN = 60_000;
const now = Date.now();
const at = (offsetMs: number): string => new Date(now + offsetMs).toISOString();

const DEMO_HLS_A: StreamSource = {
  id: "bbb-hls",
  label: "Multi-cam 1080p",
  kind: "hls",
  url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  provider: "Mux Test Stream",
  quality: "1080p",
  language: "VO",
  license: "creative-commons",
};

const DEMO_HLS_B: StreamSource = {
  id: "sintel-hls",
  label: "Caméra principale",
  kind: "hls",
  url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  provider: "Bitmovin / Sintel",
  quality: "720p",
  language: "VO",
  license: "creative-commons",
};

const DEMO_HLS_C: StreamSource = {
  id: "tos-hls",
  label: "Vue tactique",
  kind: "hls",
  url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  provider: "Unified Streaming",
  quality: "1080p",
  language: "VO",
  license: "creative-commons",
};

const DEMO_MP4: StreamSource = {
  id: "blazes-mp4",
  label: "Replay HD",
  kind: "mp4",
  url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  provider: "Google Sample Media",
  quality: "720p",
  language: "VO",
  license: "demo",
};

const DEMO_HLS_D: StreamSource = {
  id: "bipbop-hls",
  label: "Flux adaptatif",
  kind: "hls",
  url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
  provider: "Apple Developer",
  quality: "Adaptatif",
  language: "VO",
  license: "demo",
};

export const EVENTS: EventItem[] = [
  {
    id: "derby-capitale",
    title: "Derby de la Capitale",
    competition: "Ligue Élite",
    sport: "football",
    status: "live",
    startTime: at(-42 * MIN),
    durationMin: 110,
    poster: { from: "#6d5efc", to: "#1b1f4b", glyph: "⚽" },
    accent: "#6d5efc",
    description:
      "Affiche au sommet entre les deux cadors de la ligue. Analyse tactique, stats en direct et multi-caméras (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_A, DEMO_HLS_C, DEMO_HLS_D],
    tags: ["En direct", "Multiplex", "Analyse"],
    score: { home: "Paris", away: "Marseille", homeScore: 2, awayScore: 1 },
    viewers: 184_300,
    featured: true,
  },
  {
    id: "gp-urbain",
    title: "Grand Prix Urbain",
    competition: "World Racing Series",
    sport: "motorsport",
    status: "live",
    startTime: at(-18 * MIN),
    durationMin: 120,
    poster: { from: "#ff4d6d", to: "#3a0d1c", glyph: "🏎️" },
    accent: "#ff4d6d",
    description:
      "Course nocturne sur circuit urbain : caméra embarquée, télémétrie et classement en temps réel (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_B, DEMO_HLS_D],
    tags: ["Onboard", "Télémétrie", "Nuit"],
    viewers: 92_100,
    featured: true,
  },
  {
    id: "finale-tennis",
    title: "Finale — Court Central",
    competition: "Open International",
    sport: "tennis",
    status: "upcoming",
    startTime: at(35 * MIN),
    durationMin: 180,
    poster: { from: "#22d3ee", to: "#0b2f3d", glyph: "🎾" },
    accent: "#22d3ee",
    description:
      "Duel au sommet du tableau. Point par point, hawkeye et ralentis haute vitesse (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_A, DEMO_HLS_B],
    tags: ["Court central", "Ralentis"],
    featured: true,
  },
  {
    id: "match-basket",
    title: "Choc au Sommet",
    competition: "Pro Basket League",
    sport: "basketball",
    status: "upcoming",
    startTime: at(2 * HOUR + 15 * MIN),
    durationMin: 120,
    poster: { from: "#f59e0b", to: "#3d2606", glyph: "🏀" },
    accent: "#f59e0b",
    description:
      "Deux prétendants au titre s'affrontent dans une salle à guichets fermés (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_C, DEMO_MP4],
    tags: ["Playoffs", "Statistiques"],
  },
  {
    id: "test-rugby",
    title: "Test Match",
    competition: "Six Nations Cup",
    sport: "rugby",
    status: "upcoming",
    startTime: at(5 * HOUR),
    durationMin: 100,
    poster: { from: "#34d399", to: "#0c3325", glyph: "🏉" },
    accent: "#34d399",
    description:
      "Confrontation physique et engagée entre deux nations historiques (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_A, DEMO_HLS_B],
    tags: ["Mêlée", "Multiplex"],
  },
  {
    id: "replay-hockey",
    title: "Replay — Série Éliminatoire",
    competition: "Elite Hockey Tour",
    sport: "hockey",
    status: "replay",
    startTime: at(-26 * HOUR),
    durationMin: 150,
    poster: { from: "#60a5fa", to: "#0d2242", glyph: "🏒" },
    accent: "#60a5fa",
    description:
      "Revivez la remontée spectaculaire du match 7 en intégralité (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_C, DEMO_MP4],
    tags: ["Intégral", "Temps forts"],
    score: { home: "Lynx", away: "Ours", homeScore: 4, awayScore: 3 },
    viewers: 41_800,
  },
  {
    id: "replay-athletics",
    title: "Replay — Meeting d'Athlétisme",
    competition: "Diamond Circuit",
    sport: "athletics",
    status: "replay",
    startTime: at(-2 * 24 * HOUR),
    durationMin: 135,
    poster: { from: "#a78bfa", to: "#241640", glyph: "🏃" },
    accent: "#a78bfa",
    description:
      "100 m, 400 m haies et relais : les meilleurs temps de la saison réunis (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_B, DEMO_HLS_D],
    tags: ["Temps forts", "Records"],
    viewers: 27_500,
  },
  {
    id: "replay-cricket",
    title: "Replay — T20 International",
    competition: "Global Cricket Series",
    sport: "cricket",
    status: "replay",
    startTime: at(-3 * 24 * HOUR),
    durationMin: 210,
    poster: { from: "#fb7185", to: "#3a1220", glyph: "🏏" },
    accent: "#fb7185",
    description:
      "Une finale de T20 décidée dans la dernière over (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_A, DEMO_MP4],
    tags: ["T20", "Résumé"],
  },
  {
    id: "esport-arena",
    title: "Arena Masters — Grande Finale",
    competition: "Esport World Arena",
    sport: "esport",
    status: "live",
    startTime: at(-65 * MIN),
    durationMin: 180,
    poster: { from: "#c084fc", to: "#2a103f", glyph: "🎮" },
    accent: "#c084fc",
    description:
      "BO5 haletant entre les deux meilleures équipes du circuit (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_D, DEMO_HLS_A, DEMO_HLS_C],
    tags: ["BO5", "Live"],
    viewers: 305_700,
  },
  {
    id: "match-foot-fem",
    title: "Affiche — Ligue Féminine",
    competition: "Ligue Élite Féminine",
    sport: "football",
    status: "upcoming",
    startTime: at(28 * HOUR),
    durationMin: 105,
    poster: { from: "#f472b6", to: "#3d1030", glyph: "⚽" },
    accent: "#f472b6",
    description:
      "Le duel au sommet de la Ligue Féminine (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_B, DEMO_HLS_D],
    tags: ["Ligue", "Multiplex"],
  },
  {
    id: "replay-basket",
    title: "Replay — All-Star Game",
    competition: "Pro Basket League",
    sport: "basketball",
    status: "replay",
    startTime: at(-5 * 24 * HOUR),
    durationMin: 140,
    poster: { from: "#fbbf24", to: "#3d2a06", glyph: "🏀" },
    accent: "#fbbf24",
    description:
      "Le spectacle des meilleurs joueurs réunis lors du week-end des étoiles (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_C, DEMO_MP4],
    tags: ["All-Star", "Moments forts"],
    viewers: 78_200,
  },
  {
    id: "gp-qualifs",
    title: "Qualifications — Circuit Côtier",
    competition: "World Racing Series",
    sport: "motorsport",
    status: "upcoming",
    startTime: at(9 * HOUR),
    durationMin: 60,
    poster: { from: "#f87171", to: "#3a0d0d", glyph: "🏁" },
    accent: "#f87171",
    description:
      "La lutte pour la pole position heure par heure (contenu vidéo de démonstration).",
    sources: [DEMO_HLS_A, DEMO_HLS_D],
    tags: ["Qualifs", "Pole"],
  },
];

export const COMPETITIONS: Competition[] = [
  { id: "ligue-elite", name: "Ligue Élite", sport: "football", glyph: "⚽", accent: "#6d5efc" },
  { id: "world-racing", name: "World Racing Series", sport: "motorsport", glyph: "🏎️", accent: "#ff4d6d" },
  { id: "open-intl", name: "Open International", sport: "tennis", glyph: "🎾", accent: "#22d3ee" },
  { id: "pro-basket", name: "Pro Basket League", sport: "basketball", glyph: "🏀", accent: "#f59e0b" },
  { id: "esport-arena", name: "Esport World Arena", sport: "esport", glyph: "🎮", accent: "#c084fc" },
  { id: "elite-hockey", name: "Elite Hockey Tour", sport: "hockey", glyph: "🏒", accent: "#60a5fa" },
];

export function getEventById(id: string): EventItem | undefined {
  return EVENTS.find((event) => event.id === id);
}

export function getLiveEvents(): EventItem[] {
  return EVENTS.filter((event) => event.status === "live");
}

export function getUpcomingEvents(): EventItem[] {
  return EVENTS.filter((event) => event.status === "upcoming").sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );
}

export function getReplayEvents(): EventItem[] {
  return EVENTS.filter((event) => event.status === "replay").sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );
}

export function getFeatured(): EventItem[] {
  return EVENTS.filter((event) => event.featured);
}
