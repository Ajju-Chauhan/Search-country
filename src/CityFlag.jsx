import axios from "axios";
import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";


function CityFlag() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');

      const data = await response.data;
      console.log('Received data:', data);
      setCityData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    

    getCountries();
  }, []);
  console.log(cityData)

  if (loading) {
    return <h1>Loading...</h1>;
  }

  

  return (
    <div className="maindiv">
      {cityData.map((data) => (
        <CountryCard
          key={data.flags.alt}
          countryName={data.name.common}
          imageUrl={data.flags.png}
          flagAltText={data.flags.alt}
        />
      ))}
    </div>
  );
}

export default CityFlag;
