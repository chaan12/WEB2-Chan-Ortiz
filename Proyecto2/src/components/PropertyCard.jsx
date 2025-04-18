import { FaStar, FaUser, FaBed } from "react-icons/fa";
import "../styles/components/PropertyCard.css";

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img
        src={property.image}
        alt={property.title}
        className="property-image"
      />

      <div className="property-content">
        {property.superhost && <div className="superhost-tag">Superhost ⭐</div>}
        <h3 className="property-title">{property.title}</h3>
        <p className="property-description">{property.description}</p>

        <div className="property-info">
          <span>
            <FaBed className="icon" /> {property.capacity.bedroom} BedRoom
          </span>
          <span>
            <FaUser className="icon" /> {property.capacity.people} Guest
          </span>
        </div>

        <div className="property-footer">
          <span className="property-price">${property.price}/night</span>
          <span className="property-rating">
            <FaStar className="icon star" /> {property.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
