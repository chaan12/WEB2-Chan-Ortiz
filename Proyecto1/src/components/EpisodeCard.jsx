import React, { useReducer, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/EpisodeCard.css';

function likeReducer(state, action) {
  switch (action.type) {
    case 'LIKE':
      return { ...state, likes: state.likes + 1 };
    case 'DISLIKE':
      return { ...state, dislikes: state.dislikes + 1 };
    default:
      return state;
  }
}

export default function EpisodeCard({ episode }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const storageKey = `likes-episode-${episode.id}`;

  const initialState = (() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : { likes: 0, dislikes: 0 };
  })();

  const [state, dispatch] = useReducer(likeReducer, initialState);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  useEffect(() => {
    if (episode.characters.length > 0) {
      fetch(episode.characters[0])
        .then(res => res.json())
        .then(data => setImage(data.image));
    }
  }, [episode.characters]);

  return (
    <div className="episode-card">
      {image && <img className="episode-img" src={image} alt={episode.name} />}
      <div className="episode-content" onClick={() => navigate(`/episode/${episode.id}`)}>
        <h3>{episode.name}</h3>
        <p className="episode-code">{episode.episode}</p>
        <p className="episode-air-date">📅 {episode.air_date}</p>
        <p className="episode-url">🔗 {episode.url}</p>
        <div className="vote-buttons" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => dispatch({ type: 'LIKE' })}>👍 {state.likes}</button>
          <button onClick={() => dispatch({ type: 'DISLIKE' })}>👎 {state.dislikes}</button>
        </div>
      </div>
    </div>
  );
}