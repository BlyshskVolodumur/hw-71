import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import fetchCountries from './fetchCountries';
import { renderCountryInfo } from './renderCountryInfo';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const query = e.target.value.trim();

  if (!query) {
    clearMarkup();
    return;
  }

  fetchCountries(query)
    .then(countries => {
      clearMarkup();

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length === 1) {
        countryInfo.innerHTML = renderCountryInfo(countries[0]);
        return;
      }

      countryList.innerHTML = countries
        .map(country => `<li>${country.name.common}</li>`)
        .join('');
    })
    .catch(() => {
      clearMarkup();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
