export const guestReservations = [
  { reservation: 'MRC-1001', name: 'Kattia Gamboa', passes: 1 },
  { reservation: 'MRC-1002', name: 'Alexander Alpizar', passes: 1 },
  { reservation: 'MRC-1003', name: 'Steven Alpizar', passes: 1 },
  { reservation: 'MRC-1004', name: 'Natalia Alpizar', passes: 1 },
  { reservation: 'MRC-1005', name: 'Tony', passes: 1 },
  { reservation: 'MRC-1006', name: 'Maria Prado', passes: 1 },
  { reservation: 'MRC-1007', name: 'Michael Valverde', passes: 1 },
  { reservation: 'MRC-1008', name: 'John Valverde', passes: 2 },
  { reservation: 'MRC-1009', name: 'Romina Giaccone', passes: 1 },
  { reservation: 'MRC-1010', name: 'Hector Munguia', passes: 1 },
  { reservation: 'MRC-1011', name: 'Maria Badilla y Evaristo Mora', passes: 2 },
  { reservation: 'MRC-1012', name: 'Julissa Acuña y Natalia Castro', passes: 2 },
  { reservation: 'MRC-1013', name: 'Kendall Solano', passes: 1 },
  { reservation: 'MRC-1014', name: 'Moises Campos', passes: 1 },
  { reservation: 'MRC-1015', name: 'Brian Lopez', passes: 1 },
  { reservation: 'MRC-1016', name: 'Heiner Mendez', passes: 1 },
  { reservation: 'MRC-1017', name: 'Luis Diego Badilla', passes: 1 },
  { reservation: 'MRC-1018', name: 'Diego Garcia', passes: 2 },
  { reservation: 'MRC-1019', name: 'Nabor Covarrubias', passes: 2 },
  { reservation: 'MRC-1020', name: 'Daniela Rivera y Erick Bolaños', passes: 2 },
  { reservation: 'MRC-1021', name: 'Roger Rangel', passes: 1 },
  { reservation: 'MRC-1022', name: 'Jenny Lozano', passes: 2 },
  { reservation: 'MRC-1023', name: 'Oscar Orcasitas', passes: 2 },
  { reservation: 'MRC-1024', name: 'Jose Luis Alvarez', passes: 1 },
  { reservation: 'MRC-1025', name: 'Juan Villasana', passes: 1 },
  { reservation: 'MRC-1026', name: 'Marco Cascante', passes: 1 },
  { reservation: 'MRC-1027', name: 'Francisco Castro', passes: 1 },
  { reservation: 'MRC-1028', name: 'Daniel Leon', passes: 1 },

  {
    reservation: 'MRC-1029',
    name: 'Familia Mora (Marco Mora, Carmen Gonzalez, Margartia Mora, Maria del Carmen Mora, Santiago Mora, Emilio Mora, Mama Mary)',
    passes: 7
  },

  { reservation: 'MRC-1030', name: 'Jorge Gonzalez', passes: 2 },
  { reservation: 'MRC-1031', name: 'Antonio Gonzalez', passes: 2 },

  {
    reservation: 'MRC-1032',
    name: 'Patricia Guzman y Juan Carlos Mora Moreno',
    passes: 2
  },

  {
    reservation: 'MRC-1033',
    name: 'Familia Mora Moreno (Susana Mora Moreno y Jaime, Carmen Mora Moreno, Teresa Mora Moreno, Lourdes Mora Moreno, Veronica Mora Moreno, Gerardo Mora Moreno, Elena Mora Moreno y su Esposo)',
    passes: 9
  },

  { reservation: 'MRC-1034', name: 'Ernestina', passes: 1 },

  { reservation: 'MRC-1035', name: 'Cynthia Fierro', passes: 2 },
  { reservation: 'MRC-1036', name: 'Luis Vega', passes: 1 },
  { reservation: 'MRC-1037', name: 'Mario Sanchez', passes: 1 },
  { reservation: 'MRC-1038', name: 'Maricela Reyes', passes: 1 },
  { reservation: 'MRC-1039', name: 'Clara', passes: 2 },
  { reservation: 'MRC-1040', name: 'Hugo', passes: 1 },
  { reservation: 'MRC-1041', name: 'Jorge Hurtado', passes: 2 },
  { reservation: 'MRC-1042', name: 'Sergio Anzaldo', passes: 2 },
  { reservation: 'MRC-1043', name: 'Ingrid Zuleta', passes: 2 },
  { reservation: 'MRC-1044', name: 'Bayron Duran', passes: 2 },
  { reservation: 'MRC-1045', name: 'Fernando Sosa', passes: 2 },
  { reservation: 'MRC-1046', name: 'Francisco Perez', passes: 2 },
  { reservation: 'MRC-1047', name: 'Oliver Rodriguez', passes: 2 },
  { reservation: 'MRC-1048', name: 'Braulio Hernandez', passes: 2 },
  { reservation: 'MRC-1049', name: 'Ericka Ruiz', passes: 2 },
  { reservation: 'MRC-1050', name: 'Lourdes Duran', passes: 2 },
  { reservation: 'MRC-1051', name: 'Jorge Espinoza', passes: 2 },

  { reservation: 'MRC-1052', name: 'Mauricio Suarez', passes: 1 },
  { reservation: 'MRC-1053', name: 'Mexitli', passes: 1 },
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
