import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import { guestReservations, makeReservationKey } from '../data/reservations'
import { getRsvpResponses } from '../lib/supabaseClient'

function StatusIcon({ status }) {
  switch (status) {
    case 'si':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="status-icon">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    case 'no':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="status-icon">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="status-icon">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="20" cy="12" r="2" fill="currentColor" />
          <circle cx="4" cy="12" r="2" fill="currentColor" />
        </svg>
      )
  }
}

function formatDate(value) {
  if (!value) return '-'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return date.toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function normalizePhoneNumber(value = '') {
  return value.replace(/\D/g, '')
}

function buildWhatsappMessage(row) {
  return [
    `Hola ${row.name}. Te hemos invitado a nuestra boda que será el 21 de noviembre.`,
    '',
    'En la página encontrarás diferente información como hospedaje, mesa de regalos, dresscode y, lo más importante, en el inicio podrás confirmar asistencia.',
    '',
    `Código de reserva: ${row.reservation}`,
    '',
    'Tutorial rápido:',
    '1. Pon tu código de reserva.',
    '2. Dale a buscar.',
    '3. Luego ve a "Confirmar asistencia" y llena los datos.',
  ].join('\n')
}

function buildWhatsappHref(row) {
  const message = encodeURIComponent(buildWhatsappMessage(row))
  const phone = normalizePhoneNumber(row.contactPhone)

  return phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="whatsapp-icon">
      <path d="M20.5 11.9a8.4 8.4 0 0 1-12.4 7.3L4 20l1-4a8.4 8.4 0 1 1 15.5-4.1Z" fill="currentColor" />
      <path d="M9.2 8.7c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.7 1.7c.1.3 0 .5-.1.7l-.4.5c-.1.1-.2.3-.1.5.2.4.8 1.4 1.8 2.3 1 .9 2.1 1.4 2.5 1.6.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.3.7-.2l1.8.8c.2.1.3.3.3.5 0 .6-.2 1.1-.6 1.4-.4.3-1 .5-1.7.5-1.2 0-2.8-.6-4.4-1.8-1.6-1.2-2.8-2.6-3.7-4.2-.9-1.6-1.2-3-.9-4 .3-.8.8-1.3 1.2-1.5Z" fill="#fff" opacity="0.95" />
    </svg>
  )
}

export default function Dashboard() {
  const [responses, setResponses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadResponses() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getRsvpResponses()
        setResponses(data)
      } catch (error) {
        setErrorMessage('No se pudo cargar el dashboard. Verifica las políticas de Supabase.')
      } finally {
        setIsLoading(false)
      }
    }

    loadResponses()
  }, [])

  const rows = useMemo(() => {
    const responseMap = new Map(
      responses.map((item) => [makeReservationKey(item.reservation_name, item.guest_name), item]),
    )

    return guestReservations.map((reservation) => {
      const key = makeReservationKey(reservation.reservation, reservation.name)
      const response = responseMap.get(key)
      const confirmedPasses =
        response?.attendance_status === 'si'
          ? Math.min(reservation.passes, response?.companions_confirmed ?? 0)
          : 0
      const declinedPasses =
        response?.attendance_status === 'no'
          ? reservation.passes
          : response?.attendance_status === 'si'
            ? Math.max(0, reservation.passes - confirmedPasses)
            : 0
      const pendingPasses = response ? 0 : reservation.passes

      return {
        ...reservation,
        status: response?.attendance_status ?? 'pendiente',
        companionsConfirmed: response?.companions_confirmed ?? 0,
        confirmedPasses,
        declinedPasses,
        pendingPasses,
        contactPhone: reservation.contactPhone ?? response?.contact_phone ?? '',
        notes: response?.notes ?? '',
        respondedAt: response?.responded_at ?? '',
      }
    })
  }, [responses])

  const summary = useMemo(() => {
    const accepted = rows.reduce((total, item) => total + item.confirmedPasses, 0)
    const declined = rows.reduce((total, item) => total + item.declinedPasses, 0)
    const pending = rows.reduce((total, item) => total + item.pendingPasses, 0)

    const total = rows.reduce((total, item) => total + item.passes, 0)

    return { total, accepted, declined, pending }
  }, [rows])

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-kicker">Panel de asistencia</p>
            <h1>Dashboard de Reservaciones</h1>
            <p className="dashboard-subtitle">Muestra quiénes ya aceptaron, quiénes no y quiénes siguen pendientes.</p>
          </div>
          <Link to="/" className="dashboard-back-link">
            Volver a la invitación
          </Link>
        </header>

        <div className="dashboard-stats">
          <article>
            <p>Total</p>
            <strong>{summary.total}</strong>
          </article>
          <article className="ok">
            <p>Aceptaron</p>
            <strong>{summary.accepted}</strong>
          </article>
          <article className="nope">
            <p>No asistirán</p>
            <strong>{summary.declined}</strong>
          </article>
          <article className="wait">
            <p>Pendientes</p>
            <strong>{summary.pending}</strong>
          </article>
        </div>

        {isLoading ? <p className="dashboard-message">Cargando reservaciones...</p> : null}
        {errorMessage ? <p className="dashboard-error">{errorMessage}</p> : null}

        {!isLoading && !errorMessage ? (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Reserva</th>
                  <th>Invitado</th>
                  <th>Pases</th>
                  <th>Estado</th>
                  <th>Acomp.</th>
                  <th>Fecha respuesta</th>
                  <th>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={makeReservationKey(row.reservation, row.name)}>
                    <td>{row.reservation}</td>
                    <td>{row.name}</td>
                    <td>{row.passes}</td>
                    <td>
                      <span className={`status-pill ${row.status}`}>
                        <StatusIcon status={row.status} />
                        {row.status === 'si'
                          ? 'Aceptó'
                          : row.status === 'no'
                            ? 'No asiste'
                            : 'Pendiente'}
                      </span>
                    </td>
                    <td>{row.companionsConfirmed}</td>
                    <td>{formatDate(row.respondedAt)}</td>
                    <td className="dashboard-action-cell">
                      <a
                        className="dashboard-whatsapp-button"
                        href={buildWhatsappHref(row)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Enviar mensaje por WhatsApp a ${row.name}`}
                        title={row.contactPhone ? 'Abrir chat directo por WhatsApp' : 'Abrir WhatsApp con mensaje prellenado'}
                      >
                        <WhatsAppIcon />
                        <span>{row.contactPhone ? 'Enviar' : 'Reenviar'}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </main>
  )
}
