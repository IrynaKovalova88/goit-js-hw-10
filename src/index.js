import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./services/fetchCountries";
import countryInfoHbs from "./templates/country-info.hbs";
import countryListHbs from "./templates/country-list.hbs";

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const name = e.target.value.trim();
  if (!name) {
    return;
  }
    fetchCountries(name).then(countryLength);
}

function countryLength(country) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
  if (!country) {
    return;
  }
           else if (country.length > 10) {
              Notify.info("Too many matches found. Please enter a more specific name.");
            }
            else if (country.length > 1) {
                countryList.innerHTML = country.map(countryItem => { return countryListHbs(countryItem) }).join('');
              countryInfo.innerHTML = "";
            }
            else {
                countryInfo.innerHTML = countryInfoHbs(...country);
              countryList.innerHTML = "";
            }
}

