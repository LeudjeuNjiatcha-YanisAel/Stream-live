import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
      <p className="font-display text-7xl font-black text-gradient sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
        Cette page a quitté le terrain
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/50">
        Le lien que vous avez suivi n'existe pas ou a été déplacé.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-white px-6 py-3.5 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-105"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
