import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export function LegalBanner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-white/5 bg-brand-500/10 px-4 py-2 text-center text-xs text-brand-100/90">
      <Info className="h-3.5 w-3.5 text-brand-300" />
      <span>
        Mode démonstration : les vidéos sont des contenus libres (Creative Commons / exemples
        techniques).
      </span>
      <Link to="/sources" className="font-semibold text-white underline-offset-2 hover:underline">
        Connecter vos sources légales
      </Link>
    </div>
  );
}
