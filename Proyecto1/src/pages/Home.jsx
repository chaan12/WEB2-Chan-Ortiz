import React, { useEffect, useState } from 'react';
import EpisodeCard from '../components/EpisodeCard';
import '../styles/pages/Home.css';

export default function Home() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((res) => res.json())
      .then((data) => setEpisodes(data.results))
      .catch((err) => console.error('Error al obtener episodios:', err));
  }, []);

  return (
    <div>
      <h2 className="home-title">Lista de Episodios</h2>
      <div className="episode-list">
        {episodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </div>
  );
}