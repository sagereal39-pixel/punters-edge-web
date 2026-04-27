const matches = [
  {
    id: 1,
    league: 'EPL',
    home: 'Arsenal',
    away: 'Man City',
    date: '2026-03-11', // Today
    leagueCategory: 'Premier League',
    prediction: 'over 2.5',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
  {
    id: 2,
    league: 'La Liga',
    home: 'Real Madrid',
    away: 'Barcelona',
    date: '2026-03-12', // Tomorrow
    leagueCategory: 'LaLiga',
    prediction: 'over 2.5',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: false, // <--- New Field to mark the star pick
  },
  {
    id: 3,
    league: 'Bundesliga',
    home: 'Bayern',
    away: 'Dortmund',
    date: '2026-03-12', // Tomorrow
    leagueCategory: 'Bundesliga',
    prediction: 'over 2.5',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: false, // <--- New Field to mark the star pick
  },
  {
    id: 4,
    league: 'Serie A',
    home: 'Inter',
    away: 'AC Milan',
    date: '2026-03-11', // Today
    leagueCategory: 'Serie A',
    prediction: '1X',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
  {
    id: 5,
    league: 'Ligue 1',
    home: 'PSG',
    away: 'Marseille',
    date: '2026-03-13', // Day after tomorrow
    leagueCategory: 'Ligue 1',
    prediction: 'Over 2.5',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
  // --- Scottish League ---
  {
    id: 10,
    league: 'Premiership',
    home: 'Celtic',
    away: 'Rangers',
    date: '2026-03-11', // Today
    leagueCategory: 'Scottish Premiership',
    prediction: '1X',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
  // --- Turkish League ---
  {
    id: 11,
    league: 'Süper Lig',
    home: 'Galatasaray',
    away: 'Fenerbahçe',
    date: '2026-03-12', // Tomorrow
    leagueCategory: 'Super Lig',
    prediction: 'GG',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
  // --- International Club Cups ---
  {
    id: 12,
    league: 'UCL',
    home: 'Real Madrid',
    away: 'Bayern',
    date: '2026-03-13', // Day after tomorrow
    leagueCategory: 'UCL',
    prediction: 'Home Win',
    risk: 'Safe', // <--- New Field
    matchType: 'cup', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
  {
    id: 13,
    league: 'UEL',
    home: 'Liverpool',
    away: 'Roma',
    date: '2026-03-11', // Today
    leagueCategory: 'Europa League',
    prediction: 'Over 1.5',
    risk: 'Safe', // <--- New Field
    matchType: 'league', // <--- New Field
    isBetOfTheDay: true, // <--- New Field to mark the star pick
  },
];

export default matches;
