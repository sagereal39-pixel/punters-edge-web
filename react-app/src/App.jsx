import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MatchList from './components/matchlist.jsx';
import PredictionSidebar from './components/predictionsidebar.jsx';
import DateNavigator from './components/datenavigator.jsx';
import AdminPage from './Admin/admin.jsx';
import HistoryPage from './Admin/historypage.jsx';

const leagues = [
  'Bet of the Day',
  'All',
  'Premier League',
  'Ligue 1',
  'LaLiga',
  'Bundesliga',
  'Serie A',
  'Eredivisie',
  'Liga Portugal',
  'Pro League',
  'Scottish Premiership',
  'Super Lig',
  'Domestic Cups',
  'UCL',
  'Europa League',
  'UECL',
  'Internationl Matches',
];

function App() {
  useEffect(() => {
    document.title = "Punter's Edge";
  }, []);

  const [matches, setMatches] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [activeLeague, setActiveLeague] = useState('All');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(
          `https://punters-edge-web.onrender.com/index.php?date=${selectedDate}`,
        );
        const data = await res.json();

        if (data.status === 'success') {
          setMatches(data.matches);
        } else {
          console.error('API error:', data.message);
          setMatches([]);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]);
      }
    };

    fetchMatches();
  }, [selectedDate]);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await fetch(
          `https://punters-edge-web.onrender.com/fetch_api_data.php?date=${selectedDate}`,
        );
        const data = await res.json();
        setFixtures(data.status === 'success' ? data.matches : []);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
        setFixtures([]);
      }
    };

    fetchFixtures();
  }, [selectedDate]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await fetch(
          'https://punters-edge-web.onrender.com/index.php',
        );
        const data = await res.json();
        setPredictions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
      }
    };

    fetchPredictions();
  }, []);

  const filteredMatches = predictions.filter((match) => {
    // Use match_date if it exists, otherwise fall back to date
    const matchDateValue = match.match_date || match.date;
    const matchesDate = matchDateValue === selectedDate;

    // Use league_category if it exists, otherwise fall back to leagueCategory
    const matchLeagueValue = match.league_category || match.leagueCategory;
    const matchesLeague =
      activeLeague === 'All' || matchLeagueValue === activeLeague;

    // Ensure numeric check for is_bet_of_the_day
    const isBetOfDay =
      activeLeague === 'Bet of the Day' ? match.is_bet_of_the_day == 1 : true;

    if (activeLeague === 'Bet of the Day') return matchesDate && isBetOfDay;
    return matchesDate && matchesLeague;
  });

  return (
    <Router>
      <div className='app-shell'>
        <header className='topbar'>
          <Link to='/' className='brand-link'>
            <div className='brand'>⚽ PUNTER&apos;S EDGE</div>
          </Link>

          <nav className='topnav'>
            <Link to='/' className='topnav-link'>
              Home
            </Link>
            <Link to='/history' className='topnav-link'>
              History
            </Link>
            <Link to='/admin' className='topnav-link admin-link'>
              Admin
            </Link>
          </nav>
        </header>

        <main className='page-container'>
          <div className='league-scroll'>
            {leagues.map((league) => (
              <button
                key={league}
                onClick={() => setActiveLeague(league)}
                className={`league-btn ${
                  activeLeague === league ? 'active' : ''
                }`}
              >
                {league}
              </button>
            ))}
          </div>

          <Routes>
            <Route
              path='/'
              element={
                <>
                  <DateNavigator
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />

                  <div className='public-layout'>
                    <div className='public-main'>
                      <MatchList matches={filteredMatches} />
                    </div>

                    <div className='public-sidebar'>
                      <PredictionSidebar />
                    </div>
                  </div>
                </>
              }
            />

            <Route path='/admin' element={<AdminPage />} />
            <Route path='/history' element={<HistoryPage />} />

            <Route
              path='/admin'
              element={
                isAuthenticated ? (
                  <AdminPage />
                ) : (
                  <AdminLogin setAuth={setIsAuthenticated} />
                )
              }
            />
          </Routes>
        </main>

        <footer className='footer'>
          <p>© 2026 Punter&apos;s Edge Predictions. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
