'use strict';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const queryParm = '?fields=name,capital,population,flags,languages';
export const fetchCountries = countryName => {
  return fetch(`${BASE_URL}${countryName}${queryParm}`).then(data => {
    if (!data.ok) {
      throw new Error(data.status);
    }

    return data.json();
  });
};
