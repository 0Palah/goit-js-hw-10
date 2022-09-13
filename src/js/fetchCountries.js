'use strict';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const queryParm = '?fields=name,capital,population,flags,languages';
export const fetchCountries = countryName => {
  return fetch(`${BASE_URL}${countryName}${queryParm}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
