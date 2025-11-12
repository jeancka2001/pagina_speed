import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1: Marca */}
        <div className="footer-section">
          <h3>SPEED Ecuador</h3>
          <p>Marca registrada de Computecnicsnet S.A.</p>
        </div>

        {/* Columna 2: Recursos */}
        <div className="footer-section">
          <h3>Recursos</h3>
          <ul className="footer-links">
            <li>
              <a href="https://speed.com.ec/speedtest" target="_blank" rel="noopener noreferrer">
                Test de velocidad
              </a>
            </li>
            <li>
              <a href="#">Normativa ARCOTEL</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="footer-section">
          <h3>Contacto</h3>
          <ul className="footer-contact">
            <li>Ventas: 0997500911</li>
            <li>Soporte: 0997500911</li>
            <li>ventas@speed.com.ec</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}