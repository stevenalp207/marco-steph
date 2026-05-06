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
