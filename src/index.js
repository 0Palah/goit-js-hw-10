import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

// console.log(searchInputEl);
// console.log(countryListEl);
// console.log(countryInfoEl);

searchInputEl.addEventListener(
  'input',
  debounce(evt => {
    evt.preventDefault();
    //   console.log(evt);
    const countryName = evt.target.value.trim();
    console.log(countryName);
    if (countryName === '') {
      return;
    }
    fetchCountries(countryName)
      .then(data => {
        // console.log(data);
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length > 1 && data.length < 10) {
          console.log('2 - 9');
          const createCountryPreview = data => {
            data.map(({ name, flags: { svg } }) => {
              console.log(name.official);
              console.log(svg);
            });
            console.log(data);
          };
          createCountryPreview(data);
        } else {
          const createCountryCard = ({
            name,
            capital,
            population,
            flags: { svg },
            languages,
          }) => {
            console.log(name.official);
            console.log(capital[0]);
            console.log(population);
            console.log(svg);
            console.log(Object.values(languages)[0]);
          };
          console.log(data);

          createCountryCard(data[0]);
        }
      })
      .catch(error => {
        if (error.message === '404') {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          //   alert('Таку країну не знайдено');

          //   weatherWrapperEl.innerHTML = '';
        }
      });
  }, 1000)
);

// <li>
//   <img class="flag-preview" src="#" alt="flag" /><span
//     class="country-name-preview"
//   ></span>
// </li>

// <h2>
//   <img class="flag-preview" src="#" alt="flag" /><span
//     class="country-name-result"
//   ></span>
// </h2>
// <ul>
//   <li class="result-desc">Capital: <span class="text-desc"></span></li>
//   <li class="result-desc">Population: <span class="text-desc"></span></li>
//   <li class="result-desc">Languages: <span class="text-desc"></span></li>
// </ul>
