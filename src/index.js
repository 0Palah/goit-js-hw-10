import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import foundCountry from './templates/foundCountry.hbs';
import countryItems from './templates/countryItems.hbs';

const DEBOUNCE_DELAY = 300;
const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchInputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const countryName = evt.target.value.trim();
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';

  if (!countryInfoEl) {
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1 && data.length <= 10) {
        console.log(data);
        return (countryListEl.innerHTML = countryItems(data));
      } else {
        const createCountryCard = data => {
          countryInfoEl.innerHTML = foundCountry(data);
        };
        let { name, capital, population, flags, languages } = data[0];
        let coyntryObj = {
          name,
          capital,
          population,
          flags,
          lengCh: Object.values(languages).join(', '),
        };
        createCountryCard(coyntryObj);
      }
    })
    .catch(error => {
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}
