function DateNavigator({ selectedDate, setSelectedDate }) {
  const changeDate = (days) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    background: '#2a2a2a',
    padding: '5px 15px',
    borderRadius: '20px',
    border: '1px solid #333',
    color: '#00ff88',
    fontWeight: 'bold',
  };

  const btnStyle = {
    background: 'none',
    border: 'none',
    color: '#00ff88',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0 10px',
  };

  return (
    <div style={navStyle}>
      <button style={btnStyle} onClick={() => changeDate(-1)}>
        &lt;
      </button>
      <span style={{ margin: '0 10px', fontSize: '0.9rem' }}>
        {new Date(selectedDate).toDateString()}
      </span>
      <button style={btnStyle} onClick={() => changeDate(1)}>
        &gt;
      </button>
    </div>
  );
}

export default DateNavigator;
