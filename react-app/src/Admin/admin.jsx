import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AdminPage() {
  const navigate = useNavigate();
  const [apiMatches, setApiMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingMatches, setExistingMatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const supportedLeagueMap = {
    'English Premier League': 'Premier League',
    'Premier League': 'Premier League',

    'French Ligue 1': 'Ligue 1',
    'Ligue 1': 'Ligue 1',

    'Spanish La Liga': 'LaLiga',
    'La Liga': 'LaLiga',
    LaLiga: 'LaLiga',

    'German Bundesliga': 'Bundesliga',
    Bundesliga: 'Bundesliga',

    'Italian Serie A': 'Serie A',
    'Serie A': 'Serie A',

    'Dutch Eredivisie': 'Eredivisie',
    Eredivisie: 'Eredivisie',

    'Primeira Liga': 'Liga Portugal',
    'Liga Portugal': 'Liga Portugal',

    'Belgian Pro League': 'Pro League',
    'Pro League': 'Pro League',

    'Scottish Premiership': 'Scottish Premiership',

    'Turkish Super Lig': 'Super Lig',
    'Super Lig': 'Super Lig',

    'UEFA Champions League': 'UCL',
    'Champions League': 'UCL',
    UCL: 'UCL',

    'UEFA Europa League': 'Europa League',
    'Europa League': 'Europa League',

    'UEFA Europa Conference League': 'UECL',
    'Conference League': 'UECL',
    UECL: 'UECL',

    'International Friendly Games': 'International Matches',
    Friendlies: 'International Matches',
    'UEFA Nations League': 'International Matches',
    'FIFA World Cup': 'International Matches',
    'World Cup Qualification': 'International Matches',
    'World Cup - Qualification Europe': 'International Matches',
    'European Championship': 'International Matches',
    'Euro Championship': 'International Matches',
    'International Matches': 'International Matches',

    'FA Cup': 'Domestic Cups',
    'EFL Cup': 'Domestic Cups',
    'League Cup': 'Domestic Cups',

    'Copa del Rey': 'Domestic Cups',
    'Copa Del Rey': 'Domestic Cups',

    'DFB Pokal': 'Domestic Cups',

    'Coppa Italia': 'Domestic Cups',

    'Coupe de France': 'Domestic Cups',

    'Scottish Cup': 'Domestic Cups',

    'KNVB Cup': 'Domestic Cups',

    'Belgian Cup': 'Domestic Cups',
    'Croky Cup': 'Domestic Cups',

    'Turkish Cup': 'Domestic Cups',

    'Taça de Portugal': 'Domestic Cups',
    'Taca de Portugal': 'Domestic Cups',

    'Taça da Liga': 'Domestic Cups',
    'Taca da Liga': 'Domestic Cups',

    'Domestic Cups': 'Domestic Cups',
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/'; // Takes you back to the public site
  };

  const normalizeLeague = (leagueName) => {
    return supportedLeagueMap[leagueName] || null;
  };

  const [apiMeta, setApiMeta] = useState({
    count: 0,
    leagues: [],
    message: '',
  });

  const [formData, setFormData] = useState({
    status: 'pending',
    home: '',
    away: '',
    league: '',
    leagueCategory: 'Premier League',
    prediction: '',
    risk: 'Safe',
    date: new Date().toISOString().split('T')[0],
    isBetOfTheDay: false,
    matchType: 'league',
  });

  // Near the top of your AdminPage return statement:
  <div className='admin-header-actions'>
    <button onClick={() => navigate('/')} className='admin-secondary-btn'>
      🏠 Back to Home
    </button>
    <button
      onClick={() => {
        localStorage.removeItem('isAdminAuthenticated');
        window.location.reload();
      }}
      className='admin-delete-btn'
    >
      Logout
    </button>
  </div>;

  const historyMatches = existingMatches.filter((m) => m.status !== 'pending');
  const activeMatches = existingMatches.filter((m) => m.status === 'pending');

  const fetchExistingMatches = async () => {
    try {
      const res = await fetch(
        'https://punters-edge-web.onrender.com/index.php',
      );
      const data = await res.json();
      setExistingMatches(data);
    } catch (error) {
      console.error('Failed to load existing matches', error);
    }
  };

  useEffect(() => {
    fetchExistingMatches();
  }, []);

  useEffect(() => {
    setApiMatches([]);
  }, [formData.leagueCategory, formData.date]);

  const handleEdit = (match) => {
    setEditingId(match.id);
    setFormData({
      home: match.home,
      away: match.away,
      leagueCategory: match.leagueCategory,
      prediction: match.prediction,
      risk: match.risk,
      date: match.date,
      isBetOfTheDay: match.isBetOfTheDay,
      status: match.status || 'pending',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this prediction forever?')) {
      try {
        const res = await fetch(
          `https://punters-edge-web.onrender.com/api.php?id=${id}`,
          {
            method: 'DELETE',
          },
        );
        const result = await res.json();
        if (result.status === 'success') {
          fetchExistingMatches();
        }
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  const fetchRealMatches = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://punters-edge-web.onrender.com/fetch_api_data.php?date=${formData.date}`,
      );

      const result = await response.json();
      console.log('Sports API result:', result);

      if (result.status !== 'success') {
        setApiMatches([]);
        setApiMeta({
          count: 0,
          leagues: [],
          message: result.message || 'Failed to fetch matches.',
        });
        return;
      }

      const games = Array.isArray(result.matches) ? result.matches : [];

      const normalizedGames = games
        .map((match) => ({
          ...match,
          leagueCategory: normalizeLeague(match.leagueCategory),
        }))
        .filter((match) => match.leagueCategory !== null);

      const filteredGames = normalizedGames.filter(
        (match) => match.leagueCategory === formData.leagueCategory,
      );

      setApiMatches(filteredGames);

      setApiMeta({
        count: filteredGames.length,
        leagues: [...new Set(filteredGames.map((m) => m.leagueCategory))],
        message:
          filteredGames.length === 0
            ? `No ${formData.leagueCategory} matches found for this date.`
            : '',
      });
    } catch (error) {
      console.error('Fetch error:', error);
      setApiMatches([]);
      setApiMeta({
        count: 0,
        leagues: [],
        message: 'API Timeout or Error. Check console.',
      });
      alert('API Timeout or Error. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const handleMatchSelect = (e) => {
    const selectedId = e.target.value;
    const match = apiMatches.find((m) => String(m.id) === selectedId);

    if (match) {
      setFormData((prev) => ({
        ...prev,
        home: match.home || '',
        away: match.away || '',
        leagueCategory: match.leagueCategory || prev.leagueCategory,
        date: match.date || prev.date,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.home.trim() || formData.home === 'Unknown Home') {
      alert('⚠️ Home Team name is required!');
      return;
    }
    if (!formData.away.trim() || formData.away === 'Unknown Away') {
      alert('⚠️ Away Team name is required!');
      return;
    }
    if (!formData.prediction.trim()) {
      alert('⚠️ Please enter a Prediction!');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const payload = editingId ? { ...formData, id: editingId } : formData;

    try {
      const response = await fetch(
        'https://punters-edge-web.onrender.com/api.php',
        {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      const rawText = await response.text();
      console.log('Raw Response from Server:', rawText);

      if (!rawText) {
        throw new Error('Server returned an empty response.');
      }

      const result = JSON.parse(rawText);

      if (result.status === 'success') {
        alert(editingId ? '✅ Updated!' : '🚀 Posted!');

        if (payload.status !== 'pending') {
          setShowHistory(true);
        } else {
          setShowHistory(false);
        }

        setEditingId(null);
        setFormData({
          ...formData,
          home: '',
          away: '',
          prediction: '',
        });
        fetchExistingMatches();
      } else {
        alert('❌ Error: ' + result.message);
      }
    } catch (error) {
      console.error('Submission Error Detail:', error);
      alert('❌ Failed to save. See console for details.');
    }
  };

  return (
    <div className='admin-page-root'>
      {/* 1. INDEPENDENT DASHBOARD HEADER */}
      <header className='admin-dashboard-header'>
        <div className='admin-header-left'>
          <h2 className='admin-brand'>
            ⚽ PUNTER'S EDGE <span className='admin-badge'>ADMIN</span>
          </h2>
          <button onClick={() => navigate('/')} className='admin-view-site-btn'>
            🏠 View Live Site
          </button>
        </div>

        <div className='admin-profile-zone'>
          <div className='admin-user-info'>
            <span className='admin-user-name'>
              Logged in as: <strong>Sage</strong>
            </span>
            <button onClick={handleLogout} className='admin-logout-btn'>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className='admin-main-content'>
        {/* 2. LEFT COLUMN: PREDICTION FORM */}
        <section className='admin-form-section'>
          <div className='admin-form-wrap'>
            <h2 className='admin-form-title'>
              {editingId ? '✏️ EDIT PREDICTION' : '🛡️ ADMIN: ADD PREDICTION'}
            </h2>

            <div className='panel-card admin-api-panel'>
              <p className='admin-helper-text'>Quick-Fill from Sports API:</p>
              <div className='admin-quickfill-row'>
                <button
                  onClick={fetchRealMatches}
                  disabled={loading}
                  className='admin-search-btn'
                  type='button'
                >
                  {loading ? 'Searching...' : '🔍 SEARCH GAMES'}
                </button>
                {apiMatches.length > 0 && (
                  <select
                    onChange={handleMatchSelect}
                    className='admin-input full-width'
                  >
                    <option value=''>-- Select a Live Match --</option>
                    {apiMatches.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.home} vs {m.away}{' '}
                        {m.leagueCategory ? ` (${m.leagueCategory})` : ''}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className='api-debug-card'>
                <div>
                  <strong className='api-debug-title'>API Debug:</strong>
                </div>
                <div>Date: {formData.date}</div>
                <div>Matches returned: {apiMeta.count}</div>
                {apiMeta.message && (
                  <div className='api-debug-message'>{apiMeta.message}</div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className='admin-form-card'>
              <label className='form-label'>Match Date</label>
              <input
                type='date'
                value={formData.date}
                className='admin-input'
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <div className='admin-form-grid-2'>
                <div>
                  <label className='form-label'>Home Team</label>
                  <input
                    required
                    value={formData.home}
                    className='admin-input'
                    onChange={(e) =>
                      setFormData({ ...formData, home: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className='form-label'>Away Team</label>
                  <input
                    required
                    value={formData.away}
                    className='admin-input'
                    onChange={(e) =>
                      setFormData({ ...formData, away: e.target.value })
                    }
                  />
                </div>
              </div>

              <label className='form-label'>League Category</label>
              <select
                className='admin-input'
                value={formData.leagueCategory}
                onChange={(e) =>
                  setFormData({ ...formData, leagueCategory: e.target.value })
                }
              >
                <option>Premier League</option>
                <option>Ligue 1</option>
                <option>LaLiga</option>
                <option>Bundesliga</option>
                <option>Serie A</option>
                <option>UCL</option>
                <option>Europa League</option>
                <option>UECL</option>
                <option>Eredivisie</option>
                <option>Liga Portugal</option>
                <option>Pro League</option>
                <option>Scottish Premiership</option>
                <option>Super Lig</option>
                <option>Domestic Cups</option>
                <option>International Matches</option>
              </select>

              <label className='form-label'>Your Prediction</label>
              <input
                placeholder='e.g. Over 2.5'
                className='admin-input'
                value={formData.prediction}
                onChange={(e) =>
                  setFormData({ ...formData, prediction: e.target.value })
                }
              />

              <div className='admin-options-row'>
                <label className='admin-checkbox-label'>
                  <input
                    type='checkbox'
                    checked={formData.isBetOfTheDay}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isBetOfTheDay: e.target.checked,
                      })
                    }
                  />{' '}
                  ⭐ Bet of Day
                </label>
                <div className='admin-risk-wrap'>
                  <label className='admin-risk-label'>Risk Level:</label>
                  <select
                    value={formData.risk}
                    onChange={(e) =>
                      setFormData({ ...formData, risk: e.target.value })
                    }
                    className='admin-risk-select'
                  >
                    <option>Safe</option>
                    <option>Medium</option>
                    <option>Risky</option>
                  </select>
                </div>
              </div>

              <label className='form-label'>Match Status</label>
              <select
                className='admin-input'
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value='pending'>Pending ⏳</option>
                <option value='won'>Won ✅</option>
                <option value='lost'>Lost ❌</option>
              </select>

              <button
                type='submit'
                className={`admin-submit-btn ${editingId ? 'editing' : ''}`}
              >
                {editingId ? 'UPDATE PREDICTION' : 'POST PREDICTION'}
              </button>
              {editingId && (
                <button
                  type='button'
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      ...formData,
                      home: '',
                      away: '',
                      prediction: '',
                    });
                  }}
                  className='admin-cancel-btn'
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </section>

        {/* 3. RIGHT COLUMN: PREDICTIONS LIST */}
        <section className='admin-list-section'>
          <div className='admin-list-card'>
            <div className='list-header-row'>
              <h3 className='admin-panel-title'>
                📋 {showHistory ? 'TIPS HISTORY' : 'ACTIVE PREDICTIONS'}
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className='admin-toggle-btn'
              >
                {showHistory ? '⬅ BACK TO ACTIVE' : 'VIEW FULL HISTORY'}
              </button>
            </div>

            <div className='admin-cards-list'>
              {(showHistory ? historyMatches : activeMatches).map((m) => (
                <div
                  key={m.id}
                  className={`admin-match-card ${editingId === m.id ? 'editing' : ''}`}
                >
                  <div className='admin-match-title'>
                    {m.home} vs {m.away}
                  </div>
                  <div className='admin-match-meta'>
                    {m.date} | {m.leagueCategory}
                  </div>
                  <div className='admin-card-actions'>
                    {showHistory && (
                      <span
                        className={`admin-status-badge ${m.status === 'won' ? 'won' : 'lost'}`}
                      >
                        {m.status.toUpperCase()}
                      </span>
                    )}
                    <button
                      onClick={() => handleEdit(m)}
                      className='admin-edit-btn'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className='admin-delete-btn'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
