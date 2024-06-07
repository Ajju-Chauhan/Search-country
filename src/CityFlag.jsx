import { useEffect , useState} from "react";


function CityFlag() {
    let [cityData, setCityData] = useState([]);

    useEffect(() => {
        const CityDatafetch = async () => {
          try {
            const response = await fetch('https://restcountries.com/v3.1/all'); // replace with your API endpoint
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCityData(data);
          } catch (error) {
            console.error('Failed to fetch:', error);
          }
        };
    
        CityDatafetch();
      }, []);
      console.log(cityData)

      return (
        <div className="maindiv">
            {cityData.map((data, index) => (
                <div key={index} className="innerdiv">
                    <img src={data.flags.png} alt={`${data.flags.alt} flag`} style={{ height: "100px", width: "100px" }} />
                    <h5>{data.name.common}</h5>
                </div>
            ))}
        </div>

    );
  }
  
  export default CityFlag;
  