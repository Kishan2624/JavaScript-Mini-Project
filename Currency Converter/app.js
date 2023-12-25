const BASE_URL =
  "https://v6.exchangerate-api.com/v6/3325dea6c199ba796e8da483/latest/";
const selCountry = document.querySelectorAll("select");
// console.log(selCountry);
const fromCurrency = document.querySelector("#formCountry");
const toCurrency = document.querySelector("#toCountry");
const convertBtn = document.querySelector(".convertBtn");
const message = document.querySelector(".exchangeValue");
const amount = document.querySelector(".amount");

for (select of selCountry) {
  for (countryCode in countryList) {
    // console.log(country, countryList[country]);
    const option = document.createElement("option");
    option.text = countryCode;
    option.value = countryCode;
    select.append(option);
    if (select.name === "formCountry" && countryCode === "USD") {
      option.selected = "selected";
    } else if (select.name === "toCountry" && countryCode === "INR") {
      option.selected = "selected";
    }
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let countryCode = element.value;
  let countryId = countryList[countryCode];
  let newSrc = `https://flagsapi.com/${countryId}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

convertBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount").value;
  if (amount === "" || amount <= 0) {
    amount = 1;
    amount = "1";
  }
  const url = `${BASE_URL}${fromCurrency.value}`;
  const respone = await fetch(url);
  const data = await respone.json();
  const country = data.conversion_rates;
  const rate = country[toCurrency.value];
  message.innerText = `${amount} ${fromCurrency.value} = ${amount * rate} ${
    toCurrency.value
  }`;
};

const invalidChar = ["e", "-", "+", ".", "E"];
amount.addEventListener("keydown", function (event) {
  if (invalidChar.includes(event.key)) {
    event.preventDefault();
  }
});

window.addEventListener("load", updateExchangeRate);
