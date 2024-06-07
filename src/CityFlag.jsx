import { useEffect, useState } from "react";

import CountryCard from "./CountryCard";

function CityFlag() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all'); // increase timeout to 10 seconds
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Received data:', data); // log the data for debugging
        setCityData(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Failed to fetch:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  return (
    <div 
     style={{
      display: "flex",
      flexWrap : "wrap",
      alignItems: "center",
      justifyContent: "center",
      height : "100vh"

    }}
    >
      {cityData.map((data, index) => (
        <CountryCard
          key={index}
          countryName={data.name.common}
          imageUrl={data.flags.png}
          flagAltText={data.flags.alt || data.name.common} // fallback to country name if alt is not available
        />
      ))}
    </div>
  );
}

export default CityFlag;
