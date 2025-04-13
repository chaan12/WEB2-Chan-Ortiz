import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/Busqueda.css";

export default function Busqueda() {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchCharacters = async () => {
    const query = new URLSearchParams();

    for (const key in filters) {
      if (filters[key]) {
        query.append(key, filters[key]);
      }
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?${query}`);
      const data = await res.json();

      if (data.results) {
        setResults(data.results);
      } else {
        setResults([]);
        setErrorMsg("No se encontraron personajes.");
      }
    } catch (err) {
      setErrorMsg("Ocurrió un error al buscar personajes.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [filters]);

  return (
    <div className="character-search-container">
      <h2>🔍 Buscador de Personajes</h2>

      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
        <select name="status" onChange={handleChange}>
          <option value="">Estado</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input type="text" name="species" placeholder="Especie" onChange={handleChange} />
        <input type="text" name="type" placeholder="Tipo" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Género</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </form>
      
    <div className="results-container">
        {loading && <p className="loading">Cargando...</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
        {!loading &&
            results.map((char) => (
            <CharacterCard key={char.id} character={char} showLikeButton={false} />
        ))}
    </div>
    </div>
  );
}