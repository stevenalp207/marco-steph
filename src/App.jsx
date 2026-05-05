import { useEffect, useState } from 'react'
import './App.css'

const weddingDate = new Date('2026-11-21T16:00:00-06:00')

const navItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#confirmar', label: 'Confirmar Asistencia' },
  { href: '#itinerario', label: 'Itinerario' },
  { href: '#ubicaciones', label: 'Ubicaciones' },
  { href: '#historia', label: 'Nuestra Historia' },
  { href: '#regalos', label: 'Mesa de regalos' },
  { href: '#dresscode', label: 'Codigo de vestimenta' },
  { href: '#deseos', label: 'Buenos deseos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#canciones', label: 'Sugerencia de canciones' },
  { href: '#contactos', label: 'Contactos' },
]

const itinerary = [
  { event: 'Ceremonia', time: '4:00 PM' },
  { event: 'Recepcion', time: '6:00 PM' },
  { event: 'Cena', time: '8:30 PM' },
  { event: 'Fiesta', time: '9:30 PM' },
]

const palette = ['#dcd9de', '#c7c2b2', '#7a7c53', '#cbbcae', '#1f1f20', '#5f4a36']

const timeline = [
  {
    year: '2018',
    title: 'Nos conocimos',
    text: 'Despues de algunos dias hablando por mensajes, tuvimos nuestra primera salida a un picnic en lo alto de la ciudad.',
  },
  {
    year: '2021',
    title: 'Construimos nuestro hogar',
    text: 'Entre viajes, desvelos y muchas risas fuimos descubriendo que queriamos compartir cada etapa juntos.',
  },
  {
    year: '2026',
    title: 'Nos casamos',
    text: 'Hoy celebramos el inicio de una nueva familia con las personas mas importantes de nuestras vidas.',
  },
]

function getCountdown() {
  const diff = weddingDate.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function App() {
  const [countdown, setCountdown] = useState(getCountdown)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <header className="wedding-header">
        <div className="header-top">
          <a href="#inicio" className="brand-mark">
            Marco &amp; Stephanie
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <span className="menu-toggle-line" />
            <span className="menu-toggle-line" />
            <span className="menu-toggle-line" />
          </button>
        </div>
        <nav
          id="main-menu"
          className={`wedding-nav ${isMenuOpen ? 'open' : ''}`}
          aria-label="Navegacion principal"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="invitation-main">
        <section id="inicio" className="screen intro-screen reveal">
          <div className="overlay" />
          <div className="screen-content">
            <p className="script-text intro-names">Marco &amp; Stephanie</p>
            <h1 className="hero-title">El dia mas importante de nuestras vidas ha llegado</h1>
            <p className="lead">Es un placer invitarlos</p>

            <div className="guest-box">
              <p>Aqui va el nombre de tus invitados</p>
              <p>Aqui va el mensaje a tus invitados</p>
              <div className="passes-row">
                <span className="passes-number">0</span>
                <span>Pases</span>
              </div>
            </div>

            <a href="#confirmar" className="button button-primary">
              Confirmar asistencia
            </a>
          </div>
        </section>

        <section id="confirmar" className="screen countdown-screen reveal">
          <div className="overlay" />
          <div className="screen-content compact">
            <p className="script-text">Nos Casamos</p>
            <p className="date-main">21 NOVIEMBRE 2026</p>

            <div className="countdown-grid" role="timer" aria-live="polite">
              <div>
                <span>{countdown.days}</span>
                <small>Dias</small>
              </div>
              <div>
                <span>{String(countdown.hours).padStart(2, '0')}</span>
                <small>Hrs</small>
              </div>
              <div>
                <span>{String(countdown.minutes).padStart(2, '0')}</span>
                <small>Mins</small>
              </div>
              <div>
                <span>{String(countdown.seconds).padStart(2, '0')}</span>
                <small>Segs</small>
              </div>
            </div>

            <a
              className="button button-secondary"
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Marco+y+Stephanie&dates=20261121T220000Z%2F20261122T050000Z&details=Nos+encantara+compartir+este+dia+contigo.&location=Hacienda+Lagunillas%2C+Queretaro%2C+Mexico"
              target="_blank"
              rel="noreferrer"
            >
              Agregar a calendario
            </a>
          </div>
        </section>

        <section className="split-section beige reveal">
          <div className="split-media media-one" aria-hidden="true" />
          <div className="split-panel">
            <p className="split-caption">Comparte con nosotros este momento unico</p>
            <div className="paper-card center">
              <h2 className="gold-title">Con la bendicion de nuestros padres</h2>
              <h3 className="script-text small">Padres de la novia</h3>
              <p>Kattia Gamboa</p>
              <p>Alexander Alpízar</p>
              <h3 className="script-text small">Padres del novio</h3>
              <p>Tania Guerra</p>
              <p>Enrique Cena</p>
            </div>
          </div>
        </section>

        <section id="itinerario" className="paper-wrap reveal">
          <article className="itinerary-card">
            <h2 className="script-text">Itinerario</h2>
            <div className="itinerary-grid">
              {itinerary.map((item) => (
                <article key={item.event}>
                  <h3 className="script-text small">{item.event}</h3>
                  <p>{item.time}</p>
                </article>
              ))}
            </div>
            <p className="initials">M &amp; S</p>
          </article>
        </section>

        <section id="ubicaciones" className="locations-section reveal">
          <div className="location-item">
            <div className="location-content">
              <div>
                <h2 className="gold-title">Parroquia del</h2>
                <h3 className="script-title">Sagrado Corazon de Jesus</h3>
                <p>Lagunillas, Queretaro</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Parroquia+del+Sagrado+Corazon+de+Jesus+Lagunillas+Queretaro"
                  target="_blank"
                  rel="noreferrer"
                  className="location-link"
                >
                  🔍 Ir a ubicacion
                </a>
              </div>
              <div className="location-photo photo-church" aria-hidden="true" />
            </div>
          </div>

          <div className="location-item">
            <div className="location-content">
              <div>
                <h2 className="gold-title">Recepcion:</h2>
                <h3 className="script-title">Hacienda Lagunillas</h3>
                <p>Lagunillas, Queretaro</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hacienda+Lagunillas+Queretaro+Mexico"
                  target="_blank"
                  rel="noreferrer"
                  className="location-link"
                >
                  🔍 Ir a ubicacion
                </a>
              </div>
              <div className="location-photo photo-hacienda" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="historia" className="paper-wrap reveal">
          <article className="history-card">
            <div>
              <h2 className="gold-title">Nuestra</h2>
              <p className="script-text xl">Historia</p>
            </div>
            <div className="history-detail">
              {timeline.map((item) => (
                <article key={item.year}>
                  <p className="year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section id="regalos" className="panel reveal">
          <h2>Mesa de Regalos</h2>
          <p>
            Que nos acompanes es lo mas importante. Si esta en tu disposicion
            realizar una muestra de carino, estaremos muy agradecidos.
          </p>
          <div className="panel-actions">
            <a className="button button-secondary" href="https://www.amazon.com.mx/" target="_blank" rel="noreferrer">
              Ir a Amazon
            </a>
            <a className="button button-secondary" href="https://www.liverpool.com.mx/" target="_blank" rel="noreferrer">
              Ir a Liverpool
            </a>
          </div>
          <p className="quote">
            &quot;La lluvia de sobres es la tradicion de regalar dinero en efectivo en
            un sobre el dia del evento&quot;.
          </p>
          <details className="bank-details">
            <summary>Ver datos bancarios</summary>
            <p>Banco: BBVA</p>
            <p>Cuenta: 0000000000</p>
            <p>CLABE: 000000000000000000</p>
          </details>
        </section>

        <section id="dresscode" className="paper-wrap reveal">
          <article className="dress-layout">
            <div>
              <h2 className="script-text">Codigo de Vestimenta</h2>
              <p className="gold-title">Formal</p>
              <p>Hombres: Traje completo</p>
              <p>Mujeres: Vestido largo</p>

              <h3 className="script-text">Paleta de colores</h3>
              <div className="palette-row" aria-label="Paleta de colores sugerida">
                {palette.map((color) => (
                  <span
                    key={color}
                    className="swatch"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="script-text">Inspiracion</h3>
              <div className="inspo-card" aria-hidden="true" />
            </div>
          </article>
        </section>

        <section className="paper-wrap reveal">
          <article className="notes-card big">
            <h3 className="script-text">A Tomar en Cuenta</h3>
            <ol>
              <li>Llegar al menos 20 minutos antes del inicio del evento.</li>
              <li>Seguir el codigo de vestimenta especificado en la invitacion.</li>
              <li>Confirmar asistencia con anticipacion para una mejor organizacion.</li>
              <li>Evitar llevar acompanantes no incluidos en la invitacion.</li>
              <li>Seguir las indicaciones del personal del evento.</li>
              <li>Respetar la hora de cierre del evento.</li>
            </ol>
          </article>
        </section>

        <section id="deseos" className="panel reveal">
          <h2>Buenos Deseos</h2>
          <blockquote>
            Que Dios los colme de bendiciones y los guie en este nuevo camino
            juntos. Les deseamos toda la felicidad del universo.
            <cite>Norma Alvarez Ojeda</cite>
          </blockquote>
          <form className="mini-form" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Tu nombre" required />
            <textarea rows={4} placeholder="Escribe tus buenos deseos" required />
            <button className="button button-primary" type="submit">
              Enviar buenos deseos
            </button>
          </form>
        </section>

        <section id="galeria" className="panel reveal">
          <h2>Galeria de fotos</h2>
          <p className="hashtag">#MarcoyStephanie</p>
          <div className="gallery-grid" role="list" aria-label="Galeria de recuerdos">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={`photo-${index + 1}`} role="listitem" className="gallery-item">
                <span>Foto {index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="canciones" className="panel reveal">
          <h2>Sugerencia de Canciones</h2>
          <p>Teresa - Gracias por compartir tu cancion favorita.</p>
          <form className="mini-form" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Tu nombre" required />
            <input type="text" placeholder="Cancion y artista" required />
            <button className="button button-primary" type="submit">
              Enviar sugerencia de cancion
            </button>
          </form>
        </section>

        <section id="contactos" className="split-section final reveal">
          <div className="split-panel">
            <div className="paper-card center">
              <h2 className="script-text">Contactos</h2>
              <div className="contacts-grid">
                <a href="https://wa.me/5210000000000" target="_blank" rel="noreferrer">
                  Novia
                </a>
                <a href="https://wa.me/5210000000000" target="_blank" rel="noreferrer">
                  Novio
                </a>
              </div>
            </div>
          </div>
          <div className="split-media media-final" aria-hidden="true" />
        </section>

        <section className="screen outro-screen reveal">
          <div className="overlay" />
          <div className="screen-content compact">
            <p className="gold-title">Nos gustaria que nos acompanes en este dia</p>
            <p className="script-text">tan especial</p>
          </div>
        </section>
      </main>

      <footer className="wedding-footer">
        <p>Copyright © 2026 | Invitafy</p>
        <p>Boda Premium Elegance</p>
      </footer>
    </>
  )
}

export default App
