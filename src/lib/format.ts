import type { License, Sport } from "@/types";

export const SPORT_META: Record<Sport, { label: string; glyph: string }> = {
  football: { label: "Football", glyph: "⚽" },
  basketball: { label: "Basketball", glyph: "🏀" },
  tennis: { label: "Tennis", glyph: "🎾" },
  rugby: { label: "Rugby", glyph: "🏉" },
  motorsport: { label: "Motorsport", glyph: "🏎️" },
  hockey: { label: "Hockey", glyph: "🏒" },
  athletics: { label: "Athlétisme", glyph: "🏃" },
  cricket: { label: "Cricket", glyph: "🏏" },
  esport: { label: "E-sport", glyph: "🎮" },
};

export const LICENSE_META: Record<License, { label: string; tone: string }> = {
  "public-domain": { label: "Domaine public", tone: "text-emerald-300" },
  "creative-commons": { label: "Creative Commons", tone: "text-sky-300" },
  demo: { label: "Démo technique", tone: "text-amber-300" },
  official: { label: "Source officielle", tone: "text-violet-300" },
  "your-license": { label: "Votre licence", tone: "text-emerald-300" },
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

export function formatViewers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)} M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)} k`;
  return String(count);
}

export function relativeLabel(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  if (minutes <= 0) return "En cours";
  if (minutes < 60) return `Dans ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Dans ${hours} h`;
  const days = Math.round(hours / 24);
  return `Dans ${days} j`;
}
