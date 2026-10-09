import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalBanner } from "@/components/LegalBanner";

export function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 noise opacity-70" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[60vh] bg-gradient-to-b from-ink-900 to-transparent" />

      <div className="relative">
        <Navbar />
        <div className="pt-[68px]">
          <LegalBanner />
        </div>

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}
