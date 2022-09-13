'use strict';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const par = '?fields=name,capital,currencies,population,flags,languages';
export const fetchCountries = countryName => {
  return fetch(
    `${BASE_URL}${countryName}?fields=name,capital,currencies,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
