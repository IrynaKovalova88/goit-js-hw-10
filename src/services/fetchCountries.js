import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryInfoHbs from "../templates/country-info.hbs";
import countryListHbs from "../templates/country-list.hbs";

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw Error(response.error);
    })
        .then(country => {
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
            if (country.length > 10) {
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
        })
    .catch(error => {
        Notify.failure("Oops, there is no country with that name");
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
    })
    }