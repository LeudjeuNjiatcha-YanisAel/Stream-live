import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Home } from "@/pages/Home";
import { Live } from "@/pages/Live";
import { Replays } from "@/pages/Replays";
import { Competitions } from "@/pages/Competitions";
import { Competition } from "@/pages/Competition";
import { Watch } from "@/pages/Watch";
import { Favorites } from "@/pages/Favorites";
import { Search } from "@/pages/Search";
import { Sources } from "@/pages/Sources";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="live" element={<Live />} />
            <Route path="replays" element={<Replays />} />
            <Route path="competitions" element={<Competitions />} />
            <Route path="competitions/:id" element={<Competition />} />
            <Route path="watch/:id" element={<Watch />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="search" element={<Search />} />
            <Route path="sources" element={<Sources />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}
