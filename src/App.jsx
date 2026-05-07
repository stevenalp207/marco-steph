import { useEffect, useState } from 'react'
import './App.css'
import { isSupabaseConfigured, saveRsvpResponse } from './lib/supabaseClient'
import { guestReservations, makeReservationKey, normalizeText } from './data/reservations'

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
  { event: 'Cerecomia Iglesia', time: '4:00 PM', align: 'left', icon: 'rings' },
  { event: 'Cocetel', time: '5:00 PM', align: 'right', icon: 'toast' },
  { event: 'Comida', time: '7:30 PM', align: 'left', icon: 'meal' },
  { event: 'Baile', time: '8:30 PM', align: 'right', icon: 'music' },
  { event: 'Cierre', time: '2:00 AM', align: 'left', icon: 'clock' },
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

function TimelineIcon({ type }) {
  switch (type) {
    case 'rings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="9" cy="13" r="4.7" />
          <circle cx="15" cy="13" r="4.7" />
          <path d="M12 4.5v1.8" />
          <path d="M11.2 4.5h1.6" />
          <path d="M12 2.7l.7 1 .9.1-.6.7.2.9-.9-.4-.9.4.2-.9-.6-.7.9-.1z" />
        </svg>
      )
    case 'toast':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8.3 6.2c.8 3.2 2.1 5 3.7 6.8 1.6-1.8 2.9-3.6 3.7-6.8" />
          <path d="M6.8 6.2 9 13.1h6L17.2 6.2" />
          <path d="M8.4 13.1v3.1" />
          <path d="M15.6 13.1v3.1" />
          <path d="M11.1 4.4c-.2.8-.5 1.3-1 1.8" />
          <path d="M13 4.3c.2.8.5 1.4 1 1.9" />
        </svg>
      )
    case 'meal':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="5.6" />
          <path d="M7.4 12h1.6" />
          <path d="M15 12h1.6" />
          <path d="M4.6 6v12" />
          <path d="M4.6 6l1.6 2.2" />
          <path d="M4.6 8.2l1.6-2.2" />
          <path d="M19.4 6v12" />
          <path d="M18.3 6v12" />
        </svg>
      )
    case 'music':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M9 18V6.8l9-2v11.2" />
          <path d="M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          <path d="M18 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          <path d="M9 8.4 18 6.4" />
        </svg>
      )
    case 'clock':
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 7.7V12l3 1.7" />
          <path d="M9 3.8 7.2 5.2" />
          <path d="M15 3.8l1.8 1.4" />
        </svg>
      )
  }
}

function App() {
  const [countdown, setCountdown] = useState(getCountdown)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false)
  const [guestInput, setGuestInput] = useState('')
  const [guestLookup, setGuestLookup] = useState('')
  const [selectedGuestKey, setSelectedGuestKey] = useState('')
  const [attendanceStatus, setAttendanceStatus] = useState('si')
  const [companionCount, setCompanionCount] = useState('0')
  const [contactPhone, setContactPhone] = useState('')
  const [rsvpComment, setRsvpComment] = useState('')
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false)
  const [rsvpMessage, setRsvpMessage] = useState({ type: '', text: '' })

  const normalizedGuestLookup = normalizeText(guestLookup)
  const guestResults = normalizedGuestLookup
    ? guestReservations.filter(
        (reservation) =>
          normalizeText(reservation.reservation).includes(normalizedGuestLookup) ||
          normalizeText(reservation.name).includes(normalizedGuestLookup),
      )
    : []

  const selectedGuest = guestResults.find(
    (reservation) => makeReservationKey(reservation.reservation, reservation.name) === selectedGuestKey,
  )
  const maxCompanions = selectedGuest?.passes ?? 0
  const companionOptions = Array.from({ length: maxCompanions + 1 }, (_, index) => String(index))

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
        setIsRsvpModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isRsvpModalOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isRsvpModalOpen])

  useEffect(() => {
    if (!guestResults.length) {
      setSelectedGuestKey('')
      return
    }

    const hasSelectedGuest = guestResults.some(
      (reservation) => makeReservationKey(reservation.reservation, reservation.name) === selectedGuestKey,
    )

    if (!hasSelectedGuest) {
      const firstMatch = guestResults[0]
      setSelectedGuestKey(makeReservationKey(firstMatch.reservation, firstMatch.name))
    }
  }, [guestResults, selectedGuestKey])

  useEffect(() => {
    if (attendanceStatus === 'no') {
      if (companionCount !== '0') {
        setCompanionCount('0')
      }
      return
    }

    if (!selectedGuest) {
      setCompanionCount('0')
      return
    }

    if (Number(companionCount) > selectedGuest.passes) {
      setCompanionCount(String(selectedGuest.passes))
    }
  }, [attendanceStatus, companionCount, selectedGuest])

  function handleGuestSearch(event) {
    event.preventDefault()
    setGuestLookup(guestInput)
    setRsvpMessage({ type: '', text: '' })
  }

  function openRsvpModal() {
    setRsvpMessage({ type: '', text: '' })
    setIsRsvpModalOpen(true)
  }

  function closeRsvpModal() {
    setIsRsvpModalOpen(false)
  }

  async function handleRsvpSubmit(event) {
    event.preventDefault()

    if (!selectedGuest) {
      setRsvpMessage({
        type: 'error',
        text: 'Primero busca y selecciona tu reserva para confirmar asistencia.',
      })
      return
    }

    setIsSubmittingRsvp(true)
    setRsvpMessage({ type: '', text: '' })

    try {
      await saveRsvpResponse({
        reservation_name: selectedGuest.reservation,
        guest_name: selectedGuest.name,
        passes_assigned: selectedGuest.passes,
        attendance_status: attendanceStatus,
        companions_confirmed: attendanceStatus === 'si' ? Number(companionCount) : 0,
        contact_phone: contactPhone.trim() || null,
        notes: rsvpComment.trim() || null,
        responded_at: new Date().toISOString(),
      })

      setRsvpMessage({
        type: 'success',
        text: 'Tu respuesta fue registrada. Gracias por confirmar.',
      })
      closeRsvpModal()
    } catch (error) {
      const status = error?.status ?? error?.code
      const isUnauthorized = status === 401 || status === '401'

      setRsvpMessage({
        type: 'error',
        text: !isSupabaseConfigured
          ? 'Falta configurar Supabase para guardar las confirmaciones.'
          : isUnauthorized
            ? 'Error 401: revisa ANON key y vuelve a ejecutar rsvp_schema.sql en Supabase.'
            : `No se pudo guardar la confirmacion: ${error?.message ?? 'intenta de nuevo.'}`,
      })
    } finally {
      setIsSubmittingRsvp(false)
    }
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
            <p className="script-text intro-names">Steph &amp; Marco</p>
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

            <button type="button" onClick={openRsvpModal} className="button button-primary">
              Confirmar asistencia
            </button>
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
          <article className="itinerary-card itinerary-poster">
            <p className="itinerary-kicker">Ordel del Evento</p>
            <h2 className="itinerary-title">Itinerario</h2>
            <div className="itinerary-track" role="list" aria-label="Itinerario de la boda">
              {itinerary.map((item) => (
                <div key={item.event} className={`itinerary-row ${item.align}`} role="listitem">
                  {item.align === 'left' ? (
                    <>
                      <div className="itinerary-copy itinerary-copy-left">
                        <p className="itinerary-time">{item.time}</p>
                        <h3>{item.event}</h3>
                      </div>

                      <div className="itinerary-axis" aria-hidden="true">
                        <span className="itinerary-node">
                          <TimelineIcon type={item.icon} />
                        </span>
                      </div>

                      <div className="itinerary-copy itinerary-copy-right" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <div className="itinerary-copy itinerary-copy-left" aria-hidden="true" />

                      <div className="itinerary-axis" aria-hidden="true">
                        <span className="itinerary-node">
                          <TimelineIcon type={item.icon} />
                        </span>
                      </div>

                      <div className="itinerary-copy itinerary-copy-right">
                        <p className="itinerary-time">{item.time}</p>
                        <h3>{item.event}</h3>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <p className="initials">S &amp; M</p>
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
          <p className="hashtag">#StephYMarco</p>
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
        <p>Boda Steph & Marco</p>
      </footer>

      {isRsvpModalOpen ? (
        <div className="rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="rsvp-modal-title">
          <div className="rsvp-modal-backdrop" onClick={closeRsvpModal} aria-hidden="true" />

          <div className="rsvp-modal-content">
            <button type="button" className="rsvp-modal-close" onClick={closeRsvpModal} aria-label="Cerrar modal">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>

            <form className="rsvp-box" onSubmit={handleRsvpSubmit}>
              <h3 id="rsvp-modal-title">Confirma tu asistencia</h3>

              <label htmlFor="rsvp-guest">Invitado</label>
              <select
                id="rsvp-guest"
                value={selectedGuestKey}
                onChange={(event) => setSelectedGuestKey(event.target.value)}
              >
                {!guestResults.length ? (
                  <option value="">Busca tu reserva arriba para seleccionar tu nombre</option>
                ) : (
                  guestResults.map((reservation) => {
                    const key = makeReservationKey(reservation.reservation, reservation.name)

                    return (
                      <option key={key} value={key}>
                        {reservation.name} ({reservation.passes} {reservation.passes === 1 ? 'pase' : 'pases'})
                      </option>
                    )
                  })
                )}
              </select>

              <div className="rsvp-grid">
                <div>
                  <label htmlFor="rsvp-status">Asistencia</label>
                  <select
                    id="rsvp-status"
                    value={attendanceStatus}
                    onChange={(event) => setAttendanceStatus(event.target.value)}
                  >
                    <option value="si">Si, asistire</option>
                    <option value="no">No podre asistir</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rsvp-companions">Pases a confirmar</label>
                  <select
                    id="rsvp-companions"
                    value={companionCount}
                    onChange={(event) => setCompanionCount(event.target.value)}
                    disabled={!selectedGuest || attendanceStatus === 'no'}
                  >
                    {companionOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedGuest ? (
                <p className="rsvp-helper-text">
                  Tu reserva permite hasta {selectedGuest.passes} {selectedGuest.passes === 1 ? 'pase' : 'pases'}.
                </p>
              ) : (
                <p className="rsvp-helper-text">Primero busca tu reserva para habilitar los pases disponibles.</p>
              )}

              <label htmlFor="rsvp-phone">Telefono (opcional)</label>
              <input
                id="rsvp-phone"
                type="tel"
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
                placeholder="Ejemplo: 4421234567"
              />

              <label htmlFor="rsvp-comment">Comentario (opcional)</label>
              <textarea
                id="rsvp-comment"
                value={rsvpComment}
                onChange={(event) => setRsvpComment(event.target.value)}
                rows={3}
                placeholder="Alergias, dudas o mensaje para los novios"
              />

              <button className="button button-primary" type="submit" disabled={isSubmittingRsvp}>
                {isSubmittingRsvp ? 'Guardando...' : 'Guardar respuesta'}
              </button>

              {rsvpMessage.text ? (
                <p className={`rsvp-feedback ${rsvpMessage.type === 'error' ? 'error' : 'success'}`}>
                  {rsvpMessage.text}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default App
