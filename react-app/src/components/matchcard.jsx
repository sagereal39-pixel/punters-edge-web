function MatchCard({ match }) {
  const getRiskColor = (risk) => {
    if (risk === 'Safe') return 'risk-safe';
    if (risk === 'Medium') return 'risk-medium';
    return 'risk-risky';
  };

  const statusClass =
    match.status === 'won'
      ? 'status-won'
      : match.status === 'lost'
        ? 'status-lost'
        : 'status-pending';

  return (
    <div
      className={`match-card ${match.matchType === 'cup' ? 'cup-match' : ''}`}
    >
      {/* Status */}
      <div className={`status-badge ${statusClass}`}>
        {!match.status || match.status === 'pending'
          ? '⏳ PENDING'
          : match.status.toUpperCase()}
      </div>

      {/* Main Row */}
      <div className='match-card-row'>
        <div className='match-info'>
          <strong className='teams'>
            {match.isBetOfTheDay && <span className='bet-star'>⭐</span>}
            {match.matchType === 'cup' && '🏆 '}
            {match.home} vs {match.away}
          </strong>

          {/* Risk */}
          {match.risk && (
            <span className={`risk-badge ${getRiskColor(match.risk)}`}>
              Risk Level: {match.risk}
            </span>
          )}

          {/* League */}
          <div className='league'>{match.league_category || match.league}</div>
        </div>

        {/* Prediction */}
        <div className='prediction-badge'>TIP: {match.prediction}</div>
      </div>
    </div>
  );
}

export default MatchCard;
