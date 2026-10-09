import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Maximize,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { StreamSource } from "@/types";
import { LiveBadge } from "@/components/LiveBadge";
import { LICENSE_META } from "@/lib/format";
import { cn } from "@/lib/cn";

interface VideoPlayerProps {
  source: StreamSource;
  isLive: boolean;
  title: string;
  poster?: string;
}

type Status = "loading" | "ready" | "error";

export function VideoPlayer({ source, isLive, title, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setStatus("loading");
    setPlaying(false);

    if (source.kind === "iframe") return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const canPlayNative = video.canPlayType("application/vnd.apple.mpegurl");

    const onReady = () => {
      setStatus("ready");
      video.play().catch(() => setPlaying(false));
    };
    const onError = () => setStatus("error");

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", onError);

    if (source.kind === "hls" && Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
      hls.loadSource(source.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus("ready");
        video.play().catch(() => setPlaying(false));
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setStatus("error");
      });
    } else if (source.kind === "hls" && canPlayNative) {
      video.src = source.url;
    } else {
      video.src = source.url;
    }

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
      hls?.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [source, reloadKey]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const goFullscreen = () => {
    shellRef.current?.requestFullscreen?.();
  };

  const license = LICENSE_META[source.license];

  return (
    <div
      ref={shellRef}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/60"
    >
      {source.kind === "iframe" ? (
        <iframe
          src={source.url}
          title={title}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full bg-black object-contain"
          poster={poster}
          playsInline
          muted={muted}
          onClick={togglePlay}
        />
      )}

      {status !== "ready" && source.kind !== "iframe" && (
        <div className="absolute inset-0 grid place-items-center bg-ink-950/80 backdrop-blur-sm">
          {status === "loading" ? (
            <div className="flex flex-col items-center gap-4">
              <span className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-brand-400" />
              <p className="text-sm text-white/60">Connexion au flux…</p>
            </div>
          ) : (
            <div className="flex max-w-sm flex-col items-center gap-4 px-6 text-center">
              <AlertTriangle className="h-10 w-10 text-amber-400" />
              <p className="text-sm text-white/70">
                Flux indisponible pour le moment. La source a peut-être changé ou est bloquée
                par votre réseau.
              </p>
              <button
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
                Réessayer
              </button>
            </div>
          )}
        </div>
      )}

      {source.kind !== "iframe" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            {isLive && <LiveBadge />}
            <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
              {source.quality ?? "Auto"}
            </span>
          </div>
          <span className={cn("rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium backdrop-blur", license.tone)}>
            {license.label}
          </span>
        </div>
      )}

      {source.kind !== "iframe" && (
        <motion.div
          initial={false}
          className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/85 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            aria-label={playing ? "Pause" : "Lecture"}
          >
            {playing ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            aria-label={muted ? "Activer le son" : "Couper le son"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <div className="ml-2 hidden flex-col sm:flex">
            <span className="text-sm font-semibold text-white">{title}</span>
            <span className="text-xs text-white/50">{source.provider}</span>
          </div>

          <button
            type="button"
            onClick={goFullscreen}
            className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            aria-label="Plein écran"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </motion.div>
      )}

      {muted && status === "ready" && source.kind !== "iframe" && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-4 top-16 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-500/40 transition-transform hover:scale-105"
        >
          Activer le son
        </button>
      )}
    </div>
  );
}
