import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/pages/CharacterDetail.css';

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => setCharacter(data));
  }, [id]);

  if (!character) return <p className="loading-text">Cargando personaje...</p>;

  return (
    <div className="ui-layout">
      <div className="card-image-top">
        <img className="image-block" src={character.image} alt={character.name} />
        <div className="text-block">
          <div className="line short"><strong>{character.name}</strong></div>
          <div className="line shorter">{character.species}</div>
        </div>
      </div>

      <div className="card-horizontal">
        <div className="circle"></div>
        <div className="line long">🌍 {character.origin.name}</div>
      </div>

      <div className="card-full">
        <div className="square"></div>
        <div className="content">
          <div className="line medium">📌 <strong>Estado:</strong> {character.status}</div>
          <div className="line short">👤 <strong>Género:</strong> {character.gender}</div>
          {character.type && <div className="line short">🧬 <strong>Tipo:</strong> {character.type}</div>}
          <div className="line short">🧪 <strong>Especie:</strong> {character.species}</div>
          <div className="line short">🆔 <strong>ID:</strong> {character.id}</div>
          <div className="line short">⏱ <strong>Creado:</strong> {new Date(character.created).toLocaleDateString()}</div>
          {character.type && (
            <div className="line">🧬 <strong>Tipo:</strong> {character.type}</div>)}
        </div>
        <div className="footer-buttons">
          <div className="button wide">❤️ Fan favorito</div>
          <div className="button short">⭐️ Top</div>
        </div>
      </div>

      <div className="list-item">
        <div className="circle small"></div>
        <div className="line mid">🎬 Aparece en {character.episode.length} episodios</div>
        <div className="icon-grid">🎞</div>
      </div>

      <div className="list-item">
        <div className="circle small"></div>
        <div className="line mid">📍 {character.location.name}</div>
        <div className="icon-grid">📌</div>
      </div>
    </div>
  );
}
