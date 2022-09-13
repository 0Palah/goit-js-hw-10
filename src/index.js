import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

console.log(searchInputEl);
console.log(countryListEl);
console.log(countryInfoEl);

searchInputEl.addEventListener('input', evt => {
  evt.preventDefault();
  //   console.log(evt);
  const countryName = evt.target.value.trim();
  console.log(countryName);
  if (countryName === '') {
    return;
  }
  fetchCountries(countryName)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      if (error.message === '404') {
        alert('Таку країну не знайдено');

        //   weatherWrapperEl.innerHTML = '';
      }
    });
});

// function fetchCountries(countryName) {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })

// }
