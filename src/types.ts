export type Sport =
  | "football"
  | "basketball"
  | "tennis"
  | "rugby"
  | "motorsport"
  | "hockey"
  | "athletics"
  | "cricket"
  | "esport";

export type EventStatus = "live" | "upcoming" | "replay";

export type SourceKind = "hls" | "mp4" | "iframe";

export type License =
  | "public-domain"
  | "creative-commons"
  | "demo"
  | "official"
  | "your-license";

export interface StreamSource {
  id: string;
  label: string;
  kind: SourceKind;
  url: string;
  provider: string;
  quality?: string;
  language?: string;
  license: License;
  geoNote?: string;
}

export interface Poster {
  from: string;
  to: string;
  glyph: string;
}

export interface Score {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
}

export interface EventItem {
  id: string;
  title: string;
  competition: string;
  sport: Sport;
  status: EventStatus;
  startTime: string;
  durationMin?: number;
  poster: Poster;
  accent: string;
  description: string;
  sources: StreamSource[];
  tags: string[];
  score?: Score;
  viewers?: number;
  featured?: boolean;
}

export interface Competition {
  id: string;
  name: string;
  sport: Sport;
  glyph: string;
  accent: string;
}
