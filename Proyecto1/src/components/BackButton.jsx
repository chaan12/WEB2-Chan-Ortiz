import { useNavigate } from 'react-router-dom';
import '../styles/components/BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <p className="hero-back" onClick={() => navigate(-1)}>
      &#8592; Volver
    </p>
  );
}