export const guestReservations = [
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
  { reservation: 'Rivera', name: 'Daniela Rivera y Erick Bolaños', passes: 2 },
  { reservation: 'Rangel', name: 'Roger Rangel', passes: 1 },
  { reservation: 'Lozano', name: 'Jenny Lozano', passes: 2 },
  { reservation: 'Orcasitas', name: 'Oscar Orcasitas', passes: 2 },
  { reservation: 'Alvarez', name: 'Jose Luis Alvarez', passes: 1 },
  { reservation: 'Villasana', name: 'Juan Villasana', passes: 1 },
  { reservation: 'Cascante', name: 'Marco Cascante', passes: 1 },
  { reservation: 'Castro', name: 'Francisco Castro', passes: 1 },
  { reservation: 'Leon', name: 'Daniel Leon', passes: 1 },

  { reservation: 'Mora', name: 'Familia Mora (Marco Mora, Carmen Gonzalez, Margartia Mora, Maria del Carmen Mora, Santiago Mora, Emilio Mora, Mama Mary)', passes: 7 },

  { reservation: 'Jorge Gonzalez', name: 'Jorge Gonzalez', passes: 2 },

  { reservation: 'Antonio Gonzalez', name: 'Antonio Gonzalez', passes: 4 },

  { reservation: 'Tio Cocoro', name: 'Tio Cocoro', passes: 5 },

  { reservation: 'Tio Memo', name: 'Tio Memo', passes: 6 },

  { reservation: 'Tia Susy', name: 'Tia Susy', passes: 5 },

  { reservation: 'Tia Car', name: 'Tia Car', passes: 2 },

  { reservation: 'Tia Tere', name: 'Tia Tere', passes: 8 },

  { reservation: 'Tia Piri', name: 'Tia Piri', passes: 4 },

  { reservation: 'Tia Vero', name: 'Tia Vero', passes: 6 },

  { reservation: 'Tio Colay', name: 'Tio Colay', passes: 5 },

  { reservation: 'Tia Elena', name: 'Tia Elena', passes: 7 },

  { reservation: 'Tia Angelina', name: 'Tia Angelina', passes: 1 },

  { reservation: 'Tia Pilar', name: 'Tia Pilar', passes: 1 },

  { reservation: 'Cynthia Fierro', name: 'Cynthia Fierro', passes: 2 },

  { reservation: 'Luis Vega', name: 'Luis Vega', passes: 1 },

  { reservation: 'Mario Sanchez', name: 'Mario Sanchez', passes: 1 },

  { reservation: 'Maricela Reyes', name: 'Maricela Reyes', passes: 1 },

  { reservation: 'Clara', name: 'Clara', passes: 2 },

  { reservation: 'Hugo', name: 'Hugo', passes: 1 },

  { reservation: 'Carina Brindis', name: 'Carina Brindis', passes: 2 },

  { reservation: 'Diego Serafin', name: 'Diego Serafin', passes: 2 },

  { reservation: 'Pachecho', name: 'Pachecho', passes: 2 },

  { reservation: 'Hernan', name: 'Hernan', passes: 1 },

  { reservation: 'Minerva', name: 'Minerva', passes: 2 },

  { reservation: 'Jorge Hurtado', name: 'Jorge Hurtado', passes: 2 },

  { reservation: 'Sergio Anzaldo', name: 'Sergio Anzaldo', passes: 2 },

  { reservation: 'Ingrid Zuleta', name: 'Ingrid Zuleta', passes: 2 },

  { reservation: 'Bayron Duran', name: 'Bayron Duran', passes: 2 },

  { reservation: 'Fernando Sosa', name: 'Fernando Sosa', passes: 2 },

  { reservation: 'Paco Perez', name: 'Paco Perez', passes: 2 },

  { reservation: 'Oliver Rodriguez', name: 'Oliver Rodriguez', passes: 2 },

  { reservation: 'Braulio', name: 'Braulio', passes: 2 },

  { reservation: 'Ericka', name: 'Ericka', passes: 2 },

  { reservation: 'Alejandro Lopez', name: 'Alejandro Lopez', passes: 2 },

  { reservation: 'Lourdes Duran', name: 'Lourdes Duran', passes: 1 },

  { reservation: 'Jorge Espinoza', name: 'Jorge Espinoza', passes: 2 },

  { reservation: 'Yatzira Camacho', name: 'Yatzira Camacho', passes: 2 },

  { reservation: 'Gaby Dominguez', name: 'Gaby Dominguez', passes: 2 },
]

export function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function makeReservationKey(reservationName, guestName) {
  return `${normalizeText(reservationName)}::${normalizeText(guestName)}`
}
