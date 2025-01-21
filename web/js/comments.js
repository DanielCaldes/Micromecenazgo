import {getUrl} from './urls.js';

const form = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMilliseconds = now - date;

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
        return `Hace ${diffInYears} año${diffInYears > 1 ? 's' : ''}`;
    } else if (diffInMonths > 0) {
        return `Hace ${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`;
    } else if (diffInDays > 0) {
        return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
        return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInMinutes > 0) {
        return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    } else {
        return `Hace ${diffInSeconds} segundo${diffInSeconds > 1 ? 's' : ''}`;
    }
}

function renderComment(username, comment, imageURL = "user-guess.png", date = new Date().getTime()){
    // Crea un nuevo artículo para el comentario
    const newComment = document.createElement('article');
    newComment.classList.add('comment');

    // Construir el contenido del comentario
    newComment.innerHTML = `
        <img src="src/${imageURL}" alt="imagen predeterminada de usuario">
        <div class="comment-content">
            <h3>${username}</h3>
            <p class="timestamp">${timeAgo(date)}</p>
            <p>${comment}</p>
        </div>
    `;

    // Añadir el nuevo comentario a la lista
    commentsList.prepend(newComment); // Prepend para añadir al principio de la lista
}


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Obtén los datos del formulario
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    // Si no se completan ambos campos, muestra un mensaje de error
    if (!username || !comment) {
        return;
    }

    renderComment(username, comment)

    // Limpiar los campos del formulario
    form.reset();
});

function loadComments(){
    fetch(getUrl('/data/comments.json'))
    .then(response => response.json())
    .then(comments =>{
        comments.forEach(comment => {
            renderComment(comment.username, comment.comment, comment.imgURL, comment.date);
        });
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loadComments();
});