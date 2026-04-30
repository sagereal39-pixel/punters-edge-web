import { useState, useEffect } from 'react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('won');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          'https://punters-edge-web.onrender.com/index.php',
        );
        const data = await res.json();
        setHistory(data.filter((m) => m.status !== 'pending'));
      } catch (err) {
        console.error('History fetch failed', err);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter((m) => m.status === activeTab);

  return (
    <div className='history-page'>
      <h1 className='history-title'>📊 PREDICTION ARCHIVE</h1>

      <div className='history-tabs'>
        <button
          onClick={() => setActiveTab('won')}
          className={`history-tab ${activeTab === 'won' ? 'won active' : ''}`}
        >
          SUCCESSFUL TIPS ✅
        </button>

        <button
          onClick={() => setActiveTab('lost')}
          className={`history-tab ${activeTab === 'lost' ? 'lost active' : ''}`}
        >
          UNSUCCESSFUL TIPS ❌
        </button>
      </div>

      <div className='history-list'>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((m) => (
            <div key={m.id} className='history-card'>
              <div className='history-card-left'>
                <div className='history-match'>
                  {m.home_team} vs {m.away_team}
                </div>

                <div className='history-meta'>
                  {m.match_date} • {m.league_category}
                </div>
              </div>

              <div className='history-card-right'>
                <div className='history-tip'>Tip: {m.prediction}</div>

                <div
                  className={`history-status ${
                    m.status === 'won' ? 'won' : 'lost'
                  }`}
                >
                  {m.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='history-empty'>No records found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
