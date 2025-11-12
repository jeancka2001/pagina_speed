import React from "react";

import "./navbar.css";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src="src\img\logo.png" alt="Speed Logo" className="navbar-logo" />
          <div className="navbar-brand-text">
            
          </div>
        </div>

        <nav className="navbar-nav">
          <a href="#planes">Inicio </a>
          <a href="#cobertura">Contratar</a>
          <a href="#beneficios">Pagar servicio</a>
          
          
        </nav>

        <div className="navbar-actions">
          <button className="navbar-btn navbar-btn-ghost">Speed</button>
          
        </div>
      </div>
    </header>
  );
}