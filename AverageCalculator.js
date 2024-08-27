import React, { useState } from 'react';

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNumbers(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setAverage(null);

    const numbersArray = numbers.split(',').map(Number);

    try {
      const response = await fetch('http://localhost:5000/average', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numbers: numbersArray }),
      });

      const result = await response.json();

      if (response.ok) {
        setAverage(result.average);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Numbers (comma separated):
          <input type="text" value={numbers} onChange={handleChange} />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {average !== null && <h2>Average: {average}</h2>}
      {error && <h2>Error: {error}</h2>}
    </div>
  );
};

export default AverageCalculator;
