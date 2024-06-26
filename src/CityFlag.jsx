import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import CountryCard from "./CountryCard";

// Debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function CityFlag() {
  const [cityData, setCityData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = response.data;
      setCityData(data);
      setFilteredData(data); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearch = () => {
    const value = searchInputRef.current.value;
    try {
      const regex = new RegExp(value, "i"); 
      const filtered = cityData.filter((country) =>
        regex.test(country.name.common)
      );
      setFilteredData(filtered);
    } catch (error) {
      console.error("Invalid regex pattern", error);
      setFilteredData(cityData); 
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [cityData]);

  useEffect(() => {
    if (searchInputRef.current) {
      const inputElement = searchInputRef.current;
      inputElement.addEventListener("input", debouncedHandleSearch);
      return () => {
        inputElement.removeEventListener("input", debouncedHandleSearch);
      };
    }
  }, [debouncedHandleSearch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="inputdiv">
        <input
          type="text"
          placeholder="Search for countries..."
          ref={searchInputRef}
        />
      </div>
      <div className="maindiv">
        {filteredData.length > 0 ? (
          filteredData.map((data) => (
            <CountryCard
              key={data.cca3}
              countryName={data.name.common}
              imageUrl={data.flags.png}
              flagAltText={data.flags.alt || data.name.common}
              className="countryCard"
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
}

export default CityFlag;
