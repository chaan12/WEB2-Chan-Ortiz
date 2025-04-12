import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Estatica from '../pages/Estatica';
import Busqueda from '../pages/Busqueda';
import Navbar from '../components/Navbar';
import EpisodePage from '../pages/EpisodePage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estatica" element={<Estatica />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;