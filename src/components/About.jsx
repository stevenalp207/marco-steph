import './About.css'

function About() {
  return (
    <section id="nosotros" className="about">
      <div className="about-inner">
        <div className="about-text">
          <h2>Nosotros</h2>
          <p>
            Somos Marco y Steph, un equipo apasionado por la tecnología y el
            diseño. Nos dedicamos a construir experiencias digitales que
            conectan marcas con sus audiencias de forma auténtica y efectiva.
          </p>
          <p>
            Con años de experiencia en el sector, combinamos creatividad y
            rigor técnico para ofrecer productos que superan las expectativas
            de nuestros clientes.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Proyectos</span>
          </div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Clientes</span>
          </div>
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Años</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
