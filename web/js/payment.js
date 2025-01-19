


document.addEventListener('DOMContentLoaded', () => {
    totalCost = document.querySelector("#total-cost");
    shippingCountry = document.querySelector("#shipping-country");
    shippingCountry.textContent = localStorage.getItem("country");
    shippingCost = document.querySelector("#shipping-cost");
    edition = document.querySelector("#edition");
    editionCost = document.querySelector("#edition-cost");
});