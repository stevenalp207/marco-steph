import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import { guestReservations, makeReservationKey } from '../data/reservations'
import { getRsvpResponses } from '../lib/supabaseClient'

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
        setErrorMessage('No se pudo cargar el dashboard. Verifica politicas de Supabase.')
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

      return {
        ...reservation,
        status: response?.attendance_status ?? 'pendiente',
        companionsConfirmed: response?.companions_confirmed ?? 0,
        contactPhone: response?.contact_phone ?? '',
        notes: response?.notes ?? '',
        respondedAt: response?.responded_at ?? '',
      }
    })
  }, [responses])

  const summary = useMemo(() => {
    const accepted = rows.filter((item) => item.status === 'si').length
    const declined = rows.filter((item) => item.status === 'no').length
    const pending = rows.filter((item) => item.status === 'pendiente').length

    return { total: rows.length, accepted, declined, pending }
  }, [rows])

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-kicker">Panel de asistencia</p>
            <h1>Dashboard de Reservaciones</h1>
            <p className="dashboard-subtitle">Muestra quienes ya aceptaron, quienes no y quienes siguen pendientes.</p>
          </div>
          <Link to="/" className="dashboard-back-link">
            Volver a invitacion
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
            <p>No asistiran</p>
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
                  <th>Telefono</th>
                  <th>Comentario</th>
                  <th>Fecha respuesta</th>
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
                        {row.status === 'si'
                          ? 'Acepto'
                          : row.status === 'no'
                            ? 'No asiste'
                            : 'Pendiente'}
                      </span>
                    </td>
                    <td>{row.companionsConfirmed}</td>
                    <td>{row.contactPhone || '-'}</td>
                    <td>{row.notes || '-'}</td>
                    <td>{formatDate(row.respondedAt)}</td>
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
