import { useEffect, useState } from "react";

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
    <div className="maindiv">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        cityData.map((data, index) => (
          <div key={index} className="innerdiv">
            <img src={data.flags.png} alt={data.flags.alt} style={{ height: "100px", width: "100px" }} />
            <h5>{data.name?.common}</h5>
          </div>
        ))
      )}
    </div>
  );
}

export default CityFlag;
