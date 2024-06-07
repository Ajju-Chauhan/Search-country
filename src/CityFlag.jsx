import React, { useEffect, useState } from "react";

function CityFlag() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 10000); // 10 seconds timeout

        const response = await fetch('https://restcountries.com/v3.1/all', { signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Received data:', data); // log the data for debugging
        setCityData(data);
        setLoading(false); // Set loading to false when data is fetched

        clearTimeout(timeoutId);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Fetch aborted');
        } else {
          console.error('Failed to fetch:', error);
        }
        setError(error.message);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="maindiv">
      {cityData.map((data, index) => (
        <div key={index} className="innerdiv">
          <img src={data.flags?.png} alt={data.name?.common} style={{ height: "100px", width: "100px" }} />
          <h5>{data.name?.common}</h5>
        </div>
      ))}
    </div>
  );
}

export default CityFlag;
