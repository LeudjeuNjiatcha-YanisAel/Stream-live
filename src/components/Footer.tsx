import { Link } from "react-router-dom";
import { Tv } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-900/60">
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500">
                <Tv className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-extrabold text-white">
                Stream<span className="text-brand-400">Live</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Plateforme premium de sport en direct et en rediffusion. Conçue pour
              n'agréger que des sources légales, ouvertes ou sous licence que vous
              détenez. Aucun contenu diffusé sans autorisation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Navigation</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>
                <Link to="/live" className="transition-colors hover:text-white">
                  En direct
                </Link>
              </li>
              <li>
                <Link to="/replays" className="transition-colors hover:text-white">
                  Rediffusions
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="transition-colors hover:text-white">
                  Compétitions
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="transition-colors hover:text-white">
                  Mes favoris
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Transparence</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>
                <Link to="/sources" className="transition-colors hover:text-white">
                  Sources &amp; licences
                </Link>
              </li>
              <li>
                <Link to="/sources" className="transition-colors hover:text-white">
                  Ajouter une source légale
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} StreamLive. Projet de démonstration.</p>
          <p>Fait avec React, Vite, Tailwind &amp; HLS.js.</p>
        </div>
      </div>
    </footer>
  );
}
