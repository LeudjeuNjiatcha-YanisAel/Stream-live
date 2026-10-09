import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, Tv, X } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/live", label: "En direct" },
  { to: "/replays", label: "Rediffusions" },
  { to: "/competitions", label: "Compétitions" },
  { to: "/sources", label: "Sources" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/30">
        <Tv className="h-5 w-5 text-white" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        Stream<span className="text-brand-400">Live</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
    setQuery("");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong py-2.5 shadow-2xl shadow-black/40" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-5 sm:px-8">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <form
            onSubmit={submitSearch}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 transition-colors focus-within:border-brand-400/60 focus-within:bg-white/10 md:flex"
          >
            <Search className="h-4 w-4 text-white/50" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un match…"
              className="w-40 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none xl:w-52"
            />
          </form>

          <Link
            to="/favorites"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Favoris"
          >
            <Heart className="h-4.5 w-4.5" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 overflow-hidden border-t border-white/5 bg-ink-900/95 px-5 lg:hidden"
          >
            <div className="flex flex-col py-3">
              <form
                onSubmit={submitSearch}
                className="mb-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 md:hidden"
              >
                <Search className="h-4 w-4 text-white/50" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </form>
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3.5 py-3 text-sm font-medium transition-colors",
                      isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
