export function updateProgressBar(currentAmount,targetAmount) {
    let percentage = currentAmount/targetAmount * 100;

    const progressBar = document.querySelector('.progress-bar-fill');

    // Limita el valor del porcentaje entre 0 y 100
    const limitedPercentage = Math.min(Math.max(percentage, 0), 100);

    // Establece el ancho de la barra verde en función del porcentaje
    progressBar.style.width = limitedPercentage + '%';

    // Cambia el color de la barra de progreso según el valor de "progress"
    if (limitedPercentage <= 30) {
        progressBar.style.backgroundColor = 'var(--progress-color-low)';
    } else if (limitedPercentage <= 70) {
        progressBar.style.backgroundColor = 'var(--progress-color-medium)';
    }else if (limitedPercentage < 100){
        progressBar.style.backgroundColor = 'var(--progress-color-high)';
    }
     else if(limitedPercentage >= 100){
        progressBar.style.backgroundColor = 'var(--progress-color-complete)';
    }
}