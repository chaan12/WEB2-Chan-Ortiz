import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🛸 Rick & Morty</Link>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Index</NavLink></li>
        <li><NavLink to="/estatica">Estática</NavLink></li>
        <li><NavLink to="/busqueda">Búsqueda</NavLink></li>
      </ul>
    </nav>
  );
}

