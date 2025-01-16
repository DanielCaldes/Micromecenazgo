let currentProgress = 0;

function updateProgressBar(percentage) {
    const progressBar = document.querySelector('.progress-bar-fill');
    
    percentage += currentProgress;

    // Limita el valor del porcentaje entre 0 y 100
    const limitedPercentage = Math.min(Math.max(percentage, 0), 100);

    currentProgress = limitedPercentage;

    // Establece el ancho de la barra verde en función del porcentaje
    progressBar.style.width = limitedPercentage + '%';

    // Cambia el color de la barra de progreso según el valor de "progress"
    if (currentProgress <= 30) {
        progressBar.style.backgroundColor = 'var(--progress-color-low)';
    } else if (currentProgress <= 70) {
        progressBar.style.backgroundColor = 'var(--progress-color-medium)';
    }else if (currentProgress < 100){
        progressBar.style.backgroundColor = 'var(--progress-color-high)';
    }
     else if(currentProgress >= 100){
        progressBar.style.backgroundColor = 'var(--progress-color-complete)';
    }
}

document.getElementById('contribute-button').addEventListener('click', ()=>{
    updateProgressBar(10);
});

document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar(10);
});