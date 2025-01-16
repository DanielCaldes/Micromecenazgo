import { updateProgressBar} from './fundraiser/progressBar.js';
import { FundStorage } from './fundraiser/fundStorage.js';

const fundStorage = new FundStorage(10000);
//fundStorage.resetCurrentRaised();    //Uncoment to reset raised money

fundStorage.suscribe((currentAmount, targetAmount) => updateProgressBar(currentAmount, targetAmount))

let currentRaised = document.getElementById('currentAmount');
let targetAmount = document.getElementById('targetAmount');
currentRaised.textContent = `${fundStorage.getCurrentRaised()}€`
targetAmount.textContent = `contribuido de ${fundStorage.getTargetAmount()}€`
fundStorage.suscribe((currentAmount, targetAmount) => { currentRaised.textContent = `${currentAmount}€`})

document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar(fundStorage.getCurrentRaised(), fundStorage.getTargetAmount());
});

document.getElementById('contribute-button').addEventListener('click', () => {
    const donation = 1000;
    fundStorage.addAmount(donation);
});