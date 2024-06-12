// CountryCard.js
import React from 'react';

function CountryCard({ countryName, imageUrl, flagAltText, className }) {
  return (
    <div className="countryCard">
      <img src={imageUrl} alt={flagAltText} />
      <p>{countryName}</p>
    </div>
  );
}

export default CountryCard;
