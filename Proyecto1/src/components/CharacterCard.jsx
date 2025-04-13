import '../styles/components/CharacterCard.css';
import { useNavigate } from 'react-router-dom';



export default function CharacterCard({ character, onLike, showLikeButton = true }) {
    const navigate = useNavigate();
  return (
    <div className={`character-wellness-card ${character.isNew ? 'fade-in' : ''}`}>
      <div className="character-wellness-info">
        <h3 className="wellness-title">{character.name}</h3>
        <p className="wellness-description">
          Este es un personaje que aparece en este episodio y aporta un toque único a la historia.
        </p>
        <div className="wellness-buttons">
        <button className="wellness-button" onClick={() => navigate(`/character/${character.id}`)} > Ver personaje </button>

          {showLikeButton && (
            <button className="wellness-button" onClick={() => onLike?.(character)}>
              ❤️ {character.likes}
            </button>
          )}
        </div>
      </div>
      <img className="wellness-image" src={character.image} alt={character.name} />
    </div>
  );
}