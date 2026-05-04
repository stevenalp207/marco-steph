import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="header-logo">
          Marco &amp; Steph
        </a>
        <nav className="header-nav">
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
