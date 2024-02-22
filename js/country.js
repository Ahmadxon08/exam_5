const id = new URLSearchParams(window.location.search).get("common");
console.log(id);
const flagImg = document.querySelector(".card_img img");
const countryName = document.querySelector(".name h2");

const nativeName = document.querySelector(".native");
const population = document.querySelector(".population");

const region = document.getElementById("region");
const subRegion = document.getElementById("subRegion");
const capital = document.getElementById("capital");
const topLevel = document.querySelector(".top-level");
const currency = document.getElementById("currency");
const language = document.getElementById("language");

const borderCountries=document.querySelector(".border_link");

fetch(`https://restcountries.com/v3.1/name/${id}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {

     if (country.borders && country.borders.length > 0) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryLink = document.createElement("a");
            borderCountryLink.innerText = borderCountry.name.common;
            borderCountryLink.href = `../pages/country.html?common=${borderCountry.name.common}`;
            borderCountries.appendChild(borderCountryLink);
          });
      });
    } else {
      const noBordersMessage = document.createElement("p");
      noBordersMessage.innerText = "No bordering countries";
      borderCountries.appendChild(noBordersMessage);
    }
    flagImg.src = country.flags.svg;
    countryName.innerText = country.name.common;
    capital.innerText = country.capital?.[0];
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (country.languages) {
      language.innerText = Object.values(country.languages).join(", ");
    }

    region.innerText = country.region;

    topLevel.innerText = country.topLevelDomain.join(", ");
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    population.innerText = country.population;
 
  });
