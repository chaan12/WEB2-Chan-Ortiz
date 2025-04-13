import { useEffect } from 'react';
import '../styles/pages/Estatica.css';
import facebookIcon from '../assets/icons/facebook.png';
import twitterIcon from '../assets/icons/x.png';
import emailIcon from '../assets/icons/gmail.png';
import linkIcon from '../assets/icons/enlace.png';
import logo from '../assets/images/logo.png';
import BackButton from '../components/BackButton';

export default function Estatica() {
    useEffect(() => {
        document.body.classList.remove('beige-background');
        document.body.style.backgroundColor = '#fff';
        
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);
    return (
    <div className="estatica-container">
        <section className="hero-section">
            <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick y Morty en la playa" className="hero-image"/>
            <div className="hero-text">
              <BackButton />
                <h1 className="hero-title"> APP DE RICK AND MORTY <br /> USANDO APIS Y REACT </h1>
            </div>
        </section>
        
        <section className="content-section">
            <p> Rick and Morty es una serie animada que combina humor negro, ciencia ficción y aventuras interdimensionales. Sigue a Rick, un genio científico excéntrico, y a su nieto Morty, mientras exploran universos paralelos, enfrentan criaturas extrañas y desafían las leyes del tiempo y el espacio. Cada episodio mezcla caos y reflexión en un viaje irreverente que ha conquistado a millones. </p>
            <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="" className="content-image" />
            
            <ul>
                <li>Todas las dimensiones cuentan ahora con zonas seguras para el uso de portales interdimensionales.</li>
                <li>Se requiere autorización especial para acceder a universos clasificados como inestables.</li>
                <li>Los portales ubicados en la Tierra deben seguir las regulaciones del Consejo Galáctico.</li>
                <li>Se prohíbe el transporte de criaturas hostiles sin permiso de la Federación.</li>
                <li>Rick Sanchez deberá abstenerse de abrir portales en baños públicos (por orden judicial).</li>
            </ul>
            
            <img src="https://rickandmortyapi.com/api/character/avatar/12.jpeg" alt="" className="content-image" />
            
            <p> La serie ha sido aclamada por su ingenio, creatividad y profundidad emocional. </p>
            
            <img src="https://rickandmortyapi.com/api/character/avatar/27.jpeg" alt="" className="content-image" />
                    
    </section>
    
    <section className="share-section">
        <hr />
        <div className="share-content">
            <p className="share-title">APP DE RICK AND MORTY USANDO APIS Y REACT</p>
            <div className="share-icons">
                <img src={facebookIcon} alt="Facebook" />
                <img src={twitterIcon} alt="Twitter / X" />
                <img src={emailIcon} alt="Email" />
                <img src={linkIcon} alt="Enlace" />
                </div>    
            </div>
        <hr />    
    </section>
    <section className="logo-divider-section">
        <img src={logo} alt="Rick & Morty Logo" className="footer-logo-divider" />
    </section>

    <section className="footer-section">
            

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Nuestros Sitios Web</h4>
            <ul>
              <li>Rick & Morty API</li>
              <li>Morty Tools</li>
              <li>Citadel Connect</li>
              <li>Portal Travel</li>
              <li>Dimension 35C</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Recursos</h4>
            <ul>
              <li>Guía de Uso</li>
              <li>Documentación</li>
              <li>Contacto</li>
              <li>Política de Seguridad</li>
              <li>Soporte</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Sobre Nosotros</h4>
            <ul>
              <li>Acerca de la App</li>
              <li>Conoce al Equipo</li>
              <li>Iniciativas Futuras</li>
            </ul>
          </div>

          <div className="footer-column subscribe">
            <h4>Suscríbete y recibe nuestras aventuras</h4>
            <form className="subscribe-form">
              <div className="form-row">
                <input type="text" placeholder="Nombre*" required />
                <input type="text" placeholder="Apellido*" required />
              </div>
              <div className="form-row">
                <input type="email" placeholder="Correo*" required />
                <select required>
                  <option value="">País</option>
                  <option value="mx">México</option>
                  <option value="us">EE.UU</option>
                  <option value="es">España</option>
                </select>
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  He leído y estoy de acuerdo con los <a href="#">Términos de Uso</a> y el <a href="#">Aviso de Privacidad</a> puestos a mi disposición.*
                </label>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom-icons">
          <img src={facebookIcon} alt="Facebook" />
          <img src={twitterIcon} alt="Twitter / X" />
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png" alt="Instagram" style={{ width: '24px' }} />
        </div>
    </section>
    </div>
  );
}