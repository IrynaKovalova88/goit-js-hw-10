import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from "./services/fetchCountries"

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
    const name = input.value.trim();
  if (!name) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
  }
    fetchCountries(name);
}

