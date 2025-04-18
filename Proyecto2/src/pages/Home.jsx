import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import "../styles/pages/Home.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const filteredResults = properties.filter((prop) =>
      prop.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredResults);
  }, [search, properties]);

  return (
    <>
      <div className="header">
        <h1>Book unique places to stay and things to do.</h1>
        <p>Unforgettable trips start with Airbnb.</p>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="main-content">
        {filtered.length > 0 ? (
          <div className="property-grid">
            {filtered.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />  
            ))}
          </div>
        ) : (
          <h4 className="no-results">Lo sentimos, no se encontraron propiedades.</h4>
        )}
      </div>
    </>
  );
}