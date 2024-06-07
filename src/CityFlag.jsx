import { useEffect, useState } from "react";

import CountryCard from "./CountryCard";

function CityFlag() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let URL = 'https://restcountries.com/v3.1/all'
    fetch(URL)
    .then((res)=> res.json())
    .then((data)=> setCityData(data))
    .catch((err)=> console.error("Error", err))
  }, []);
  console.log(cityData);

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
