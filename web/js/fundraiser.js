import { updateProgressBar} from './progressBar.js';
import { FundStorage } from './fundStorage.js';

document.addEventListener('DOMContentLoaded', () => {
    const fundStorage = new FundStorage(10000);
    const progressBar = document.querySelector('.progress-bar-fill');
    const currentRaised = document.getElementById('currentAmount');
    const targetAmount = document.getElementById('targetAmount');
    
    const updateUI = (current, target) => {
        currentRaised.textContent = `${current}€`;
        targetAmount.textContent = `contribuido de ${target}€`;
        updateProgressBar(current, target, progressBar);
    };

    updateUI(fundStorage.getCurrentRaised(), fundStorage.targetAmount);
    fundStorage.suscribe(updateUI);
});