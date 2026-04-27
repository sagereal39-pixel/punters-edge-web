import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PredictionSidebar() {
  const [recentWins, setRecentWins] = useState([]);
  const [winRate, setWinRate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5001/fetch_matches.php');
        const data = await res.json();

        const completed = data.filter(
          (m) => m.status === 'won' || m.status === 'lost',
        );
        const won = data.filter((m) => m.status === 'won');

        if (completed.length > 0) {
          const accuracy = Math.round((won.length / completed.length) * 100);
          setWinRate(accuracy);
        } else {
          setWinRate(0);
        }

        const wins = data
          .filter((m) => m.status === 'won')
          .sort((a, b) => new Date(b.match_date) - new Date(a.match_date))
          .slice(0, 5);

        setRecentWins(wins);
      } catch (err) {
        console.error('Sidebar error:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <aside className='sidebar-card prediction-sidebar'>
      <div className='stat-card'>
        <span className='stat-label'>WIN ACCURACY</span>
        <h2 className='stat-value'>{winRate}%</h2>

        <div className='progress-bar-container'>
          <div
            className='progress-bar-fill'
            style={{ width: `${winRate}%` }}
          ></div>
        </div>
      </div>

      <h3 className='sidebar-heading'>✅ RECENT WINS</h3>

      <div className='wins-list'>
        {recentWins.map((win) => (
          <div key={win.id} className='win-item'>
            <div className='win-item-top'>
              <span className='win-match'>
                {win.home_team} vs {win.away_team}
              </span>

              <span className='win-status'>WON</span>
            </div>

            <div className='win-meta'>
              {win.match_date} • {win.prediction}
            </div>
          </div>
        ))}

        {recentWins.length === 0 && (
          <p className='sidebar-empty'>Calculating results...</p>
        )}
      </div>

      <button onClick={() => navigate('/history')} className='history-btn'>
        VIEW FULL HISTORY
      </button>
    </aside>
  );
}

export default PredictionSidebar;
