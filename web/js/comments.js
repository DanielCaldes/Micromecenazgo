const form = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Obtén los datos del formulario
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    // Si no se completan ambos campos, muestra un mensaje de error
    if (!username || !comment) {
        return;
    }

    // Crea un nuevo artículo para el comentario
    const newComment = document.createElement('article');
    newComment.classList.add('comment');

    // Construir el contenido del comentario
    newComment.innerHTML = `
        <img src="src/user-guess.png" alt="imagen predeterminada de usuario">
        <div class="comment-content">
            <h3>${username}</h3>
            <p class="timestamp">hace pocos segundos</p>
            <p>${comment}</p>
        </div>
    `;

    // Añadir el nuevo comentario a la lista
    commentsList.prepend(newComment); // Prepend para añadir al principio de la lista

    // Limpiar los campos del formulario
    form.reset();
});