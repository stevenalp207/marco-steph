import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="footer-brand">Marco &amp; Steph</span>
        <p className="footer-copy">
          &copy; {year} Marco &amp; Steph. Todos los derechos reservados.
        </p>
        <nav className="footer-nav">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
