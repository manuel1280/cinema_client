import React, { useEffect, useState } from 'react';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3000/countries');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data.data); // Access "data" array within the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-xs mx-auto mt-4">
      <label htmlFor="country-select" className="block text-gray-700 text-sm font-bold mb-2">
        Select Country:
      </label>
      <select
        id="country-select"
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="">--Choose a Country TEST--</option>
        {countries.map((country) => (
          <option key={country.iso_code} value={country.iso_code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Country;
