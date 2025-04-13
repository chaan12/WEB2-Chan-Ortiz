import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';
import BackButton from './BackButton'; 
export default function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <BackButton />
        <div className="navbar-logo">
          <Link to="/">🛸 Rick & Morty</Link>
        </div>
      </div>

      <ul className="navbar-links">
        <li><NavLink to="/" end>Index</NavLink></li>
        <li><NavLink to="/estatica">Estática</NavLink></li>
        <li><NavLink to="/busqueda">Búsqueda</NavLink></li>
      </ul>
    </nav>
  );
}