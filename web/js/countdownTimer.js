
function initializeCountdownTimer(){
    const deadline = "2025-06-31T23:59:59";
    
    const deadlineDate = new Date(deadline);
    const now = new Date();

    let countdownSeconds = Math.floor((deadlineDate - now) / 1000);

    // Selecciona los elementos donde se actualizarán los números
    const daysElement = document.getElementById('countdown-timer-days');
    const hoursElement = document.getElementById('countdown-timer-hours');
    const minutesElement = document.getElementById('countdown-timer-minutes');
    const secondsElement = document.getElementById('countdown-timer-seconds');

    // Función para actualizar el temporizador
    function updateCountdown() {
        if (countdownSeconds > 0) {
            countdownSeconds--; // Resta un segundo

            // Calcula días, horas, minutos y segundos restantes
            const days = Math.floor(countdownSeconds / (24 * 60 * 60));
            const hours = Math.floor((countdownSeconds % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((countdownSeconds % (60 * 60)) / 60);
            const seconds = countdownSeconds % 60;

            // Actualiza los elementos en el DOM
            daysElement.textContent = days;
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
        } else {
            clearInterval(interval);
            document.querySelector('.countdown-vertical').innerHTML = '¡Tiempo terminado!';
        }
    }

    // Ejecuta la función cada segundo
    const interval = setInterval(updateCountdown, 1000);
}


document.addEventListener('DOMContentLoaded', () => {
    initializeCountdownTimer();
});