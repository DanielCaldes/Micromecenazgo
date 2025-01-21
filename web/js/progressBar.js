export function updateProgressBar(currentAmount,targetAmount, progressBarElement) {
    if (!progressBarElement) return;
    
    let percentage = currentAmount/targetAmount * 100;

    // Limita el valor del porcentaje entre 0 y 100
    const limitedPercentage = Math.min(Math.max(percentage, 0), 100);

    // Establece el ancho de la barra verde en función del porcentaje
    progressBarElement.style.width = `${limitedPercentage}%`;

    const colors = {
        low: 'var(--progress-color-low)',
        medium: 'var(--progress-color-medium)',
        high: 'var(--progress-color-high)',
        complete: 'var(--progress-color-complete)'
    };

    // Cambia el color de la barra de progreso según el valor de "progress"
    progressBarElement.style.backgroundColor = 
        limitedPercentage <= 30 ? colors.low :
        limitedPercentage <= 70 ? colors.medium :
        limitedPercentage < 100 ? colors.high : 
        colors.complete;
}