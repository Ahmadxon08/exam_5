const darkMode = document.getElementById("dark_mode");

darkMode.onclick = function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    darkMode.src = "../img/sun.png";
  } else {
    darkMode.src = "../img/moon.png";
  }
};

///////////////////////backtop////

const backToTopButton = document.querySelector(".scroll_top");

function toggleBackToTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

window.onscroll = function () {
  toggleBackToTopButton();
};

backToTopButton.onclick = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
/////////////////////////
const cardContent = document.querySelector(".card_content");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

const findByRegion = document.querySelector("#filter");
let initialRegion = findByRegion.value; // Avvalgi tanlov qiymatini saqlash

findByRegion.addEventListener("change", async (e) => {
  const selectedRegion = e.target.value;
  if (selectedRegion === 'allRegion') {
    findByRegion.value = initialRegion; 
    return; 
  }
  console.log(selectedRegion);
});

 
    

      

  


///////////////////////////

const pageSize = 12;
let currentPage = 1;
let countriesData = [];

async function getInfo() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    countriesData = await response.json();
    displayCountries();
    console.log(countriesData);
  } catch (error) {
    console.error("xatolik bor:", error);
  } finally{
    
  }
}

const displayCountries = () => {
  /////////////////////
  const pages = [];

  for (let i = 0; i < Math.ceil(countriesData.length / pageSize); i++) {
    pages.push(i);
  }
  const indexOfLastPage = currentPage * pageSize;

  const indexOfFirstPage = indexOfLastPage - pageSize;

  const currentItem = countriesData.slice(indexOfFirstPage, indexOfLastPage);
  console.log(currentItem);
//////////////////////////////////

  const countriesHTML = currentItem.map((country) => getCountry(country));

  cardContent.innerHTML = countriesHTML.join("");

};

///pagination btnsss//////////

const prevBtn = () => {
  if (currentPage - 1 >= 1) {
    currentPage--;
    displayCountries();
  }
};
const nextBtn = () => {
  if (currentPage + 1 <= Math.ceil(countriesData.length / pageSize)) {
    currentPage++;
    displayCountries();
  }
};



document.getElementById("prevBtn").addEventListener("click", prevBtn, false);
document.getElementById("nextBtn").addEventListener("click", nextBtn, false);

const getCountry = (country) => {
  return `
  <a href="./pages/country.html?common=${country.name.common}">
  <div class="card">
    <img src="${country.flags.png}" alt="${country.name.common}flag">
    <div class="card_text">
      <div class="name"><h2>${country.name.common}</h2></div>
      <div class="char">
        <div class="pop">
          <h3>Population:</h3>
          <span>${country.population}</span>
        </div>
        <div class="pop">
          <h3>Region:</h3>
          <span>${country.region}</span>
        </div>
        <div class="pop">
          <h3>Capital:</h3>
          <span>${country.capital?.[0]}</span>
        </div>
      </div>
    </div>
  </div> 
  </a>
`;
};

////search action
const displayCountry = (country) => {
  cardContent.innerHTML = getCountry(country);
};

searchInput.addEventListener("input", (e) => {
  let text = e.target.value.toLowerCase();

  let filteredCountries = countriesData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(text) ||
      country.population.toString().toLowerCase().includes(text) ||
      `${country.name.common} ${country.region} ${country.population}`.toLowerCase().includes(text)
  );

  if (filteredCountries.length === 1) {
    displayCountry(filteredCountries[0]);
  } else if (filteredCountries.length > 1) {
    displayCountries(filteredCountries);
  } else {
    cardContent.innerHTML = "";
  }
});


getInfo();
