import './Contact.css'

function Contact() {
  return (
    <section id="contacto" className="contact">
      <h2 className="contact-heading">Contáctanos</h2>
      <p className="contact-sub">
        ¿Tienes un proyecto en mente? Escríbenos y te responderemos pronto.
      </p>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" placeholder="Tu nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" placeholder="tu@correo.com" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows={5}
            placeholder="Cuéntanos sobre tu proyecto..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary contact-submit">
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}

export default Contact
