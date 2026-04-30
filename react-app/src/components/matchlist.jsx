import MatchCard from './matchcard.jsx';

function MatchList({ matches }) {
  // Check if matches is undefined or null first
  if (!matches) {
    return <div className='empty-state'>Loading matches...</div>;
  }

  return (
    <div className='match-grid'>
      {matches.length > 0 ? (
        matches.map((match) => (
          /* Removed the extra wrapping div for a cleaner DOM */
          <MatchCard key={match.id} match={match} />
        ))
      ) : (
        <div className='empty-state'>No matches found for this date.</div>
      )}
    </div>
  );
}

export default MatchList;
