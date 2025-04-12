import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EpisodePage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(res => res.json())
      .then(data => setEpisode(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!episode) return <p>Cargando episodio...</p>;

  return (
    <div>
      <h2>{episode.name}</h2>
      <p><strong>Código:</strong> {episode.episode}</p>
      <p><strong>Fecha:</strong> {episode.air_date}</p>
    </div>
  );
}