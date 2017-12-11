// check the VAT API
import fetch from 'node-fetch';

const API_KEY = 'abbf42bdd2b0d7fc13934e494532e58e';


getVAT('DE').
    then(data => {
        //console.log(data);
    });

/**
 * 
 * @param {String} countryCode
 * @returns {Promise<Number>}
 */
export function getVAT(countryCode) {
    // return fetch(`https://vatapi.com/v1/country-code-check?code=${countryCode}`, {
    //     headers: {
    //         "apikey": API_KEY
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => data.rates.standard.value);

    return Promise.resolve(19);
}




