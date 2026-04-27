import { useState } from 'react';

function usePredictions() {
  const [predictions, setPredictions] = useState([]);
  const addPrediction = (match, pick, odds) => {
    // Prevent duplicate picks for the same match
    if (!predictions.find((p) => p.id === match.id)) {
      setPredictions((prev) => [
        ...prev,
        {
          id: match.id,
          home: match.home,
          away: match.away,
          pick,
          odds,
          status: 'Pending',
        },
      ]);
    }
  };

  const removePrediction = (id) => {
    setPredictions((prev) => prev.filter((p) => p.id !== id));
  };

  return { predictions, addPrediction, removePrediction };
}

export default usePredictions;
