import React from "react";

const CountryCard = ({ countryName, imageUrl, flagAltText }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        borderRadius: "8px",
        width: "200px",
        height: "200px",
        textAlign: "center",
      }}
    >
      <img src={imageUrl} alt={flagAltText} style={{ height: "100px", width: "100px" }} />
      <h2>{countryName}</h2>
    </div>
  );
};

export default CountryCard;
