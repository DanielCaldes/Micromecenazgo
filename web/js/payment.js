import { getUrl } from './urls.js';
import { FundStorage } from './fundStorage.js';

//Guarda los datos del pago
const state = {
    fundStorage : new FundStorage(),
    rewardPrice: 0,
    shipmentPrice: 0,
    supplementPrice: 0,
    get fund() {
        return this.rewardPrice + this.supplementPrice;
    },
    get totalCost() {
        return this.rewardPrice + this.shipmentPrice + this.supplementPrice;
    },
};

// Elementos del DOM
const totalCostElement = document.querySelector("#total-cost");
const rewardNameElement = document.querySelector("#reward-name");
const rewardCostElement = document.querySelector("#rewards-cost");
const shippingCountryElement = document.querySelector("#shipping-country");
const shippingCostElement = document.querySelector("#shipping-cost");
const extraSupportInput = document.querySelector("#extra-support");
const form = document.getElementById('payment-form');

// Función para actualizar el costo total en el DOM
function updateTotalCost() {
    totalCostElement.textContent = state.totalCost;
}

// Función para cargar los datos de la recompensa en el DOM
async function loadRewardData() {
    try {
        const rewards = await fetch(getUrl('../data/rewards.json')).then(res => res.json());
        const rewardId = localStorage.getItem("rewardId");

        const reward = rewards.find(r => r.rewardId == rewardId);
        if (!reward) throw new Error("Recompensa no encontrada");

        rewardNameElement.textContent = reward.title;
        state.rewardPrice = reward.price;
        rewardCostElement.textContent = state.rewardPrice;

        const figure = document.querySelector(".cart-image");
        figure.innerHTML = '';
        const image = document.createElement('img');
        image.src = getUrl(`../src/${reward.imageURL}`);
        image.alt = reward.imageDescription;
        figure.appendChild(image);

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = reward.imageDescription;
        figure.appendChild(figcaption);

        if (reward.requiresShipping) {
            await loadShippingData();
        } else {
            shippingCountryElement.textContent = "No necesario";
            shippingCostElement.textContent = "Gratis";
            state.shipmentPrice = 0;
            updateTotalCost();
        }
    } catch (error) {
        console.error('Error al cargar los datos de la recompensa:', error);
        alert("Hubo un error al cargar los datos de la recompensa. Por favor, inténtalo de nuevo.");
    }
}

// Función para cargar los datos de envío, utiliza localStorage para obtener cual fue el pais seleccionado.
async function loadShippingData() {
    try {
        shippingCountryElement.textContent = localStorage.getItem("country") || "País no especificado";

        const countries = await fetch(getUrl('../data/countries.json')).then(res => res.json());
        const searchedCountry = localStorage.getItem("country");
        const country = countries.find(c => c.text === searchedCountry);

        if (country) {
            shippingCostElement.textContent = country.shippingCost;
            state.shipmentPrice = country.shippingCost;
        } else {
            throw new Error("País no encontrado en la lista");
        }
    } catch (error) {
        console.error('Error al cargar los datos de envío:', error);
        alert("Hubo un error al cargar los datos de envío. Por favor, verifica tu selección.");
    } finally {
        updateTotalCost();
    }
}

// Manejar el dinero que se añada a apoyo extra
extraSupportInput.addEventListener("input", (event) => {
    state.supplementPrice = parseInt(event.target.value) || 0;
    updateTotalCost();
});

// Validar formulario antes de enviar para comprobar que no falta ningún campo por rellenar
function validateForm() {
    const email = document.getElementById('name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!email || !cardNumber || !expiryDate || !cvv) {
        alert("Por favor, completa todos los campos del formulario.");
        return false;
    }

    return true;
}

// Enviar formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    state.fundStorage.addAmount(state.fund);

    alert("¡Muchas gracias por su contribución!");
    form.reset();
    window.location.href = getUrl('../index.html');
});

// Cargar los datos al inicio
document.addEventListener('DOMContentLoaded', () => {
    loadRewardData();
});
