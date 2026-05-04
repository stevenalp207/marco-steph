import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Bienvenido a Marco &amp; Steph</h1>
        <p className="hero-subtitle">
          Tu espacio de confianza para encontrar soluciones creativas y
          servicios de calidad.
        </p>
        <div className="hero-actions">
          <a href="#servicios" className="btn btn-primary">
            Ver servicios
          </a>
          <a href="#contacto" className="btn btn-outline">
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
