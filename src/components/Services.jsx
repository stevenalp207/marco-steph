import './Services.css'

const services = [
  {
    id: 1,
    icon: '🎨',
    title: 'Diseño Web',
    description:
      'Creamos interfaces modernas, atractivas y responsivas adaptadas a tu marca.',
  },
  {
    id: 2,
    icon: '⚙️',
    title: 'Desarrollo',
    description:
      'Soluciones técnicas robustas con las tecnologías más actuales del mercado.',
  },
  {
    id: 3,
    icon: '📈',
    title: 'Marketing Digital',
    description:
      'Estrategias para aumentar tu visibilidad y atraer más clientes en línea.',
  },
]

function Services() {
  return (
    <section id="servicios" className="services">
      <h2 className="services-heading">Nuestros Servicios</h2>
      <p className="services-sub">
        Ofrecemos una amplia gama de soluciones para tu negocio.
      </p>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.id} className="service-card">
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
