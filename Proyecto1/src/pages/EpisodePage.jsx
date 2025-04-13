import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/pages/EpisodePage.css';
import CharacterCard from '../components/CharacterCard';

export default function EpisodePage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [displayCharacters, setDisplayCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(res => res.json())
      .then(data => {
        setEpisode(data);
        const chars = data.characters;
        const selected = [chars[0], chars[1], chars[chars.length - 2], chars[chars.length - 1]];
        return Promise.all(selected.map(url => fetch(url).then(res => res.json())));
      })
      .then(chars => {
        const withLikes = chars.map(char => {
          const key = `likes-character-${char.id}-episode-${id}`;
          const saved = JSON.parse(localStorage.getItem(key));
          return { ...char, likes: saved?.likes || 0 };
        });
        setDisplayCharacters(withLikes);
      });
  }, [id]);

  useEffect(() => {
    updateAllState(displayCharacters);
  }, [displayCharacters]);

  useEffect(() => {
    document.body.classList.add('beige-background');
    return () => document.body.classList.remove('beige-background');
  }, []);

  const updateAllState = async (baseList) => {
    if (!episode) return;

    const allKeys = Object.keys(localStorage).filter(k =>
      k.startsWith('likes-character-') && k.endsWith(`-episode-${id}`)
    );

    const allLiked = allKeys.map(key => {
      const data = JSON.parse(localStorage.getItem(key));
      const charId = parseInt(key.split('-')[2]);
      return { id: charId, likes: data.likes };
    });

    const top3 = allLiked
      .sort((a, b) => b.likes - a.likes)
      .filter(c => c.likes > 0)
      .slice(0, 3);

    const favs = await Promise.all(top3.map(char =>
      fetch(`https://rickandmortyapi.com/api/character/${char.id}`)
        .then(res => res.json())
        .then(data => ({ ...data, likes: char.likes }))
    ));
    setFavorites(favs);

    const usados = new Set([...favs.map(f => f.id)]);
    let filtered = baseList.filter(c => !usados.has(c.id));

    const nuevos = [];
    for (let url of episode.characters) {
      const idChar = parseInt(url.split('/').pop());
      if (!usados.has(idChar) && !filtered.some(f => f.id === idChar)) {
        const charData = await fetch(url).then(r => r.json());
        const key = `likes-character-${idChar}-episode-${id}`;
        const saved = JSON.parse(localStorage.getItem(key));
        nuevos.push({ ...charData, likes: saved?.likes || 0, isNew: true });
        usados.add(idChar);
        if (filtered.length + nuevos.length >= 4) break;
      }
    }

    const actualizados = [...filtered, ...nuevos];

    while (actualizados.length > 4) {
      const idx = actualizados.findLastIndex(c => c.isNew);
      if (idx !== -1) {
        actualizados.splice(idx, 1);
      } else {
        break;
      }
    }

    setDisplayCharacters(actualizados);
  };

  const handleLike = (character) => {
    const key = `likes-character-${character.id}-episode-${id}`;
    const current = JSON.parse(localStorage.getItem(key)) || { likes: 0 };
    const updated = { likes: current.likes + 1 };
    localStorage.setItem(key, JSON.stringify(updated));

    const updatedCharacters = displayCharacters.map(p =>
      p.id === character.id ? { ...p, likes: updated.likes } : p
    );

    setDisplayCharacters(updatedCharacters);

    setTimeout(() => {
      updateAllState(updatedCharacters);
    }, 100);
  };

  if (!episode) return <p className="loading-text">Cargando episodio...</p>;

  return (
    <div className="episode-page">
      <div className="episode-header">
        <div className="episode-line"></div>
          <h1 className="episode-title">{episode.name}</h1>
          <h3 className="episode-subtitle">{episode.air_date} — {episode.episode}</h3>
          <p className="episode-intro">
            En un universo donde lo absurdo y lo genial colisionan, Rick Sánchez arrastra a su nieto Morty a través de dimensiones insospechadas, experimentos peligrosos y dilemas existenciales. Cada episodio es un viaje entre el caos y la brillantez científica, donde las reglas del tiempo y la realidad se retuercen con humor ácido y aventuras impredecibles.
          </p>
        
          <h3 className="favorites-section-label">Los tres personajes favoritos</h3>
          <div className="episode-awards">
            {favorites.length === 0 ? ( <p className="no-favorites">No hay personajes favoritos.</p> ) : (
              favorites.map(char => (
                <div className="award-character" key={char.id}>
                  <img src={char.image} alt={char.name} />
                  <p>{char.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
  
        <h2 className="section-title">Personajes del episodio</h2>

        <div className='character-container wellness-style'>
          {displayCharacters
            .filter(char=> !favorites.some(fav => fav.id === char.id))
            .map(char => (
              <CharacterCard
                key={char.id}
                character={char}
                isNew={char.isNew}
                onLike={handleLike}
                showLikeButton={true}
              />
            ))}
        </div>

        {/* <div className="character-container wellness-style">
        {displayCharacters
            .filter(char => !favorites.some(fav => fav.id === char.id))
            .map(char => (
            <div className={`character-wellness-card ${char.isNew ? 'fade-in' : ''}`} key={char.id}>
                <div className="character-wellness-info">
                <h3 className="wellness-title">{char.name}</h3>
                <p className="wellness-description">
                    Este es un personaje que aparece en este episodio y aporta un toque único a la historia.
                </p>
                <div className="wellness-buttons">
                    <button className="wellness-button">Ver personaje</button>
                    <button className="wellness-button" onClick={() => handleLike(char)}>{char.likes}</button>
                </div>
                </div>
                <img className="wellness-image" src={char.image} alt={char.name} />
            </div>
            ))}
        </div> */}
    </div>
  );
}