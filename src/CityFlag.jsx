import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import CountryCard from "./CountryCard";

function CityFlag() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        const data = response.data;
        setCityData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(cityData);
      return;
    }

    const filtered = cityData.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, cityData]);

  const handleSearch = () => {
    setSearchTerm(searchInputRef.current.value);
  };

  return (
    <>
      <div className="inputdiv">
        <input
          type="text"
          placeholder="Search for countries..."
          ref={searchInputRef}
          onChange={handleSearch}
        />
      </div>
      <div className="maindiv">
        {loading ? (
          <h1>Loading...</h1>
        ) : filteredData.length === 0 ? (
          <p>No matching countries found</p>
        ) : (
          filteredData.map((data) => (
            <div key={data.cca3} className="countryCard">
              <img src={data.flags.png} alt={data.name.common} />
              <h2>{data.name.common}</h2>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CityFlag;
