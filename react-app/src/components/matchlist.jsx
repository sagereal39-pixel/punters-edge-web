import MatchCard from './matchcard.jsx';

function MatchList({ matches }) {
  return (
    <div className='match-grid'>
      {matches && matches.length > 0 ? (
        matches.map((match) => (
          <div key={match.id}>
            <MatchCard match={match} />
          </div>
        ))
      ) : (
        <div className='empty-state'>No matches found for this date.</div>
      )}
    </div>
  );
}

export default MatchList;
