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
  { href: '#hospedaje', label: 'Hospedaje' },
  { href: '#galeria', label: 'Galeria' },
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

const guestReservations = [
  { reservation: 'Gamboa', name: 'Kattia Gamboa', passes: 1 },
  { reservation: 'Alpizar', name: 'Alexander Alpizar', passes: 1 },
  { reservation: 'Alpizar', name: 'Steven Alpizar', passes: 1 },
  { reservation: 'Alpizar', name: 'Natalia Alpizar', passes: 1 },
  { reservation: 'Tony', name: 'Tony', passes: 1 },
  { reservation: 'Prado', name: 'Maria Prado', passes: 1 },
  { reservation: 'Valverde', name: 'Michael Valverde', passes: 1 },
  { reservation: 'Valverde', name: 'John Valverde', passes: 2 },
  { reservation: 'Giaccone', name: 'Romina Giaccone', passes: 1 },
  { reservation: 'Munguia', name: 'Hector Munguia', passes: 1 },
  { reservation: 'Badilla', name: 'Maria Badilla y Evaristo Mora', passes: 2 },
  { reservation: 'Acuña', name: 'Julissa Acuña y Natalia Castro', passes: 2 },
  { reservation: 'Solano', name: 'Kendall Solano', passes: 1 },
  { reservation: 'Campos', name: 'Moises Campos', passes: 1 },
  { reservation: 'Lopez', name: 'Brian Lopez', passes: 1 },
  { reservation: 'Mendez', name: 'Heiner Mendez', passes: 1 },
  { reservation: 'Badilla', name: 'Luis Diego Badilla', passes: 1 },
  { reservation: 'Garcia', name: 'Diego Garcia', passes: 2 },
  { reservation: 'Covarrubias', name: 'Nabor Covarrubias', passes: 2 },
  { reservation: 'Rivera', name: 'Daniela Rivera y Erick Bolaños', passes: 2  },
  { reservation: 'Rangel', name: 'Roger Rangel', passes: 1 },
  { reservation: 'Lozano', name: 'Jenny Lozano', passes: 2 },
  { reservation: 'Orcasitas', name: 'Oscar Orcasitas', passes: 2 },
  { reservation: 'Alvarez', name: 'Jose Luis Alvarez', passes: 1 },
  { reservation: 'Villasana', name: 'Juan Villasana', passes: 1 },
  { reservation: 'Cascante', name: 'Marco Cascante', passes: 1 },
  { reservation: 'Castro', name: 'Francisco Castro', passes: 1 },
  { reservation: 'Leon', name: 'Daniel Leon', passes: 1 },
]

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

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
  const [guestInput, setGuestInput] = useState('')
  const [guestLookup, setGuestLookup] = useState('')

  const normalizedGuestLookup = normalizeText(guestLookup)
  const guestResults = normalizedGuestLookup
    ? guestReservations.filter(
        (reservation) =>
          normalizeText(reservation.reservation).includes(normalizedGuestLookup) ||
          normalizeText(reservation.name).includes(normalizedGuestLookup),
      )
    : []

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

  function handleGuestSearch(event) {
    event.preventDefault()
    setGuestLookup(guestInput)
  }

  return (
    <>
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

      <header className="wedding-header">
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
              <form className="grid gap-3" onSubmit={handleGuestSearch}>
                <label htmlFor="guest-reservation" className="text-xs uppercase tracking-[0.2em] text-white/75">
                  Nombre de la reserva
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="guest-reservation"
                    value={guestInput}
                    onChange={(event) => setGuestInput(event.target.value)}
                    placeholder="Escribe tu apellido"
                    className="w-full rounded-md border border-white/25 bg-black/20 px-4 py-3 text-center text-white outline-none transition placeholder:text-white/55 focus:border-[var(--gold)] focus:bg-black/30"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="button button-primary min-w-[150px] whitespace-nowrap"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              <p className="text-sm text-white/75">
                Busca por apellido o nombre de reserva. Si tu reserva incluye esposa o esposo, aparecerá con 2 pases.
              </p>

              {guestLookup ? (
                guestResults.length > 0 ? (
                  <div className="grid gap-3">
                    {guestResults.map((reservation) => (
                      <div
                        key={`${reservation.reservation}-${reservation.name}`}
                        className="grid gap-3 rounded-[0.7rem] border border-white/20 bg-black/25 p-4 text-white sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <div>
                          <p className="text-lg font-medium">{reservation.name}</p>
                          <p className="text-sm text-white/70">Reserva: {reservation.reservation}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-semibold">{reservation.passes}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                            {reservation.passes === 1 ? 'Pase' : 'Pases'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[0.7rem] border border-white/20 bg-black/25 px-4 py-4 text-white">
                    No encontramos una reserva con ese apellido.
                  </div>
                )
              ) : null}
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
              <p>Kattia Gamboa Prado</p>
              <p>Alexander Alpízar Lobo</p>
              <h3 className="script-text small">Padres del novio</h3>
              <p>Maria del Carmen Gonzalez Acosta</p>
              <p>Marco Antonio Mora Moreno</p>
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

        <section
          id="hospedaje"
          className="reveal bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.6),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(191,163,123,0.2),transparent_35%),linear-gradient(180deg,#f7f2e9,#f1e8d7)] px-4 py-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <h2 className="text-[clamp(1.9rem,4.4vw,3rem)] uppercase tracking-[0.08em] text-[var(--gold)]">
              Hospedaje
            </h2>
            <p className="mt-3 w-full max-w-3xl text-balance leading-7 text-[var(--paper-text)]">
              Conoce las opciones de alojamiento disponibles para ti y tus acompañantes.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="border border-[var(--paper-border)] bg-[var(--paper-bg)] p-8 text-center shadow-[0_18px_28px_-20px_rgba(50,38,23,0.35)] transition-transform duration-300 hover:-translate-y-2">
              <h3 className="script-text mb-4">Hacienda Lagunillas</h3>
              <a
                className="grid gap-3 text-[var(--gold)] no-underline transition-transform duration-300 hover:-translate-y-1"
                href="/info-hacienda.jpeg"
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir informacion completa de Hacienda Lagunillas"
              >
                <div
                  className="h-[350px] border border-[var(--paper-border)] bg-[rgba(255,255,255,0.7)] bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/info-hacienda.jpeg')" }}
                />
                <span className="text-sm uppercase tracking-[0.08em] font-[var(--heading)]">Ver info completa</span>
              </a>
            </div>

            <div className="border border-[var(--paper-border)] bg-[var(--paper-bg)] p-8 text-center shadow-[0_18px_28px_-20px_rgba(50,38,23,0.35)] transition-transform duration-300 hover:-translate-y-2">
              <h3 className="script-text mb-2">HS Hotsson Hotel</h3>
              <p className="mb-3 uppercase tracking-[0.08em] text-[var(--gold)]">Reservaciones</p>
              <p className="mx-auto max-w-xl leading-7 text-[var(--paper-text)]">
                Nuestra oficina central de reservaciones está disponible de lunes a viernes de 08:00 a 20:00 hrs,
                sábados y domingos de 08:00 a 17:00 hrs.
              </p>
              <div className="mt-6 border-t border-[var(--paper-border)] pt-6 text-left text-[var(--paper-text)]">
                <p className="my-2"><strong>Email:</strong> central_reservaciones@capitali.com</p>
                <p className="my-2"><strong>Email:</strong> jdiaz@hotsson.com</p>
              </div>
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

        <section id="dresscode" className="reveal bg-[var(--gold-bg)] px-4 py-12">
          <article className="mx-auto flex max-w-6xl flex-col items-center gap-6 border border-[var(--paper-border)] bg-[var(--paper-bg)] p-8 text-center shadow-[0_18px_28px_-20px_rgba(50,38,23,0.35)]">
            <h2 className="dresscode-title text-[clamp(1.8rem,4.6vw,3.6rem)] italic text-[var(--paper-text-dark)]">
              Codigo de Vestimenta
            </h2>
            <div className="w-full">
              <img
                className="mx-auto block h-auto w-full max-w-[920px] rounded-[0.6rem] border border-[var(--paper-border)] bg-white object-contain shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                src="/dress-code.png"
                alt="Dress code"
              />
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

        <section
          id="contactos"
          className="reveal w-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.6),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(191,163,123,0.2),transparent_35%),linear-gradient(180deg,#f7f2e9,#f1e8d7)] px-4 py-16"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center rounded-none border border-[var(--paper-border)] bg-[rgba(255,255,255,0.92)] p-8 text-center shadow-[0_18px_28px_-20px_rgba(50,38,23,0.35)]">
            <h2 className="script-text text-[clamp(2rem,5.5vw,4.1rem)] text-[var(--paper-text-dark)]">Contactos</h2>
            <p className="mt-3 w-full max-w-3xl text-center leading-7 text-[var(--paper-text)] text-balance">
              Si necesitas ayuda con tu asistencia o con la hacienda, aquí están los contactos directos.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <a
                className="flex min-h-[88px] items-center justify-center border border-[color-mix(in_srgb,var(--gold)_65%,var(--paper-border))] bg-white/85 px-4 py-4 font-[var(--heading)] text-lg text-[var(--gold)] no-underline shadow-[0_12px_26px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_30px_rgba(0,0,0,0.1)]"
                href="https://wa.me/50684200184"
                target="_blank"
                rel="noreferrer"
              >
                Novia
              </a>
              <a
                className="flex min-h-[88px] items-center justify-center border border-[color-mix(in_srgb,var(--gold)_65%,var(--paper-border))] bg-white/85 px-4 py-4 font-[var(--heading)] text-lg text-[var(--gold)] no-underline shadow-[0_12px_26px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_30px_rgba(0,0,0,0.1)]"
                href="https://wa.me/5214421192054"
                target="_blank"
                rel="noreferrer"
              >
                Novio
              </a>
              <a
                className="flex min-h-[88px] items-center justify-center border border-[color-mix(in_srgb,var(--gold)_65%,var(--paper-border))] bg-white/85 px-4 py-4 font-[var(--heading)] text-lg text-[var(--gold)] no-underline shadow-[0_12px_26px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_30px_rgba(0,0,0,0.1)]"
                href="https://wa.me/5215623617972"
                target="_blank"
                rel="noreferrer"
              >
                Wedding Planner - Ericka
              </a>
              <a
                className="flex min-h-[88px] items-center justify-center border border-[color-mix(in_srgb,var(--gold)_65%,var(--paper-border))] bg-white/85 px-4 py-4 font-[var(--heading)] text-lg text-[var(--gold)] no-underline shadow-[0_12px_26px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_30px_rgba(0,0,0,0.1)]"
                href="https://wa.me/5217771124582"
                target="_blank"
                rel="noreferrer"
              >
                Jonathan Ramírez - Reservas Hacienda
              </a>
            </div>
          </div>
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
        <p>Boda Marco y Stephanie</p>
      </footer>
    </>
  )
}

export default App
