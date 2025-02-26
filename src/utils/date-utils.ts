export function getHoroscope(month: number, day: number): string {
  const horoscopes = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
  ];

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricorn';
  }

  const horoscope = horoscopes.find(
    ({ start, end }) =>
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1]),
  );

  return horoscope?.sign || 'Unknown';
}

export function getZodiac(year: number): string {
  const zodiacs = [
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Goat',
    'Monkey',
    'Rooster',
    'Dog',
    'Pig',
  ];
  return zodiacs[(year - 4) % 12];
}

// export function getHoroscope(month: number, day: number) {
//   const horoscopes = [
//     { sign: 'Capricorn', icon: '♑️', start: [12, 22], end: [1, 19] },
//     { sign: 'Aquarius', icon: '♒️', start: [1, 20], end: [2, 18] },
//     { sign: 'Pisces', icon: '♓️', start: [2, 19], end: [3, 20] },
//     { sign: 'Aries', icon: '♈️', start: [3, 21], end: [4, 19] },
//     { sign: 'Taurus', icon: '♉️', start: [4, 20], end: [5, 20] },
//     { sign: 'Gemini', icon: '♊️', start: [5, 21], end: [6, 20] },
//     { sign: 'Cancer', icon: '♋️', start: [6, 21], end: [7, 22] },
//     { sign: 'Leo', icon: '♌️', start: [7, 23], end: [8, 22] },
//     { sign: 'Virgo', icon: '♍️', start: [8, 23], end: [9, 22] },
//     { sign: 'Libra', icon: '♎️', start: [9, 23], end: [10, 22] },
//     { sign: 'Scorpio', icon: '♏️', start: [10, 23], end: [11, 21] },
//     { sign: 'Sagittarius', icon: '♐️', start: [11, 22], end: [12, 21] },
//   ];

//   if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
//     return { sign: 'Capricorn', icon: '♑️' };
//   }

//   const horoscope = horoscopes.find(
//     ({ start, end }) =>
//       (month === start[0] && day >= start[1]) ||
//       (month === end[0] && day <= end[1]),
//   );

//   return horoscope ?? { sign: 'Unknown', icon: '❓' };
// }

// export function getZodiac(year: number) {
//   const zodiacs = [
//     { sign: 'Rat', icon: '🐀' },
//     { sign: 'Ox', icon: '🐂' },
//     { sign: 'Tiger', icon: '🐅' },
//     { sign: 'Rabbit', icon: '🐇' },
//     { sign: 'Dragon', icon: '🐉' },
//     { sign: 'Snake', icon: '🐍' },
//     { sign: 'Horse', icon: '🐎' },
//     { sign: 'Goat', icon: '🐐' },
//     { sign: 'Monkey', icon: '🐒' },
//     { sign: 'Rooster', icon: '🐓' },
//     { sign: 'Dog', icon: '🐕' },
//     { sign: 'Pig', icon: '🐖' },
//   ];

//   const index = (year - 4) % 12;
//   return zodiacs[index] ?? { sign: 'Unknown', icon: '❓' };
// }
