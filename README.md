# Micromecenazgo

## Objetivos de la web
Este proyecto busca ser una página ficticia de micromecenazgo de recompensas, para simular la recaudación de dinero para financiar un videojuego.

## Enlaces Importantes:
- [Página principal (HTML)] (https://danielcaldes.github.io/Micromecenazgo/web/index.html)
- [Sitemap (XML)] (https://danielcaldes.github.io/Micromecenazgo/web/sitemap.xml) 

## HTML
Este proyecto está compuesto por una web dividida en tres páginas principales: **`index.html`**, **`fake-payment.html`** y **`fake-rewards.html`**. La estructura general de cada una de estas páginas sigue el siguiente esquema:

- **Header**: Información general de la página.
- **Body**: Contenido principal dividido en secciones de información.
  - **Main**: Secciones con la información detallada.
  - **Footer**: Sección final que incluye el disclaimer de la web.

Las recompensas y los comentarios se cargan dinámicamente desde un archivo JSON, no obstante, se incluyen algunos ejemplos para que puedas ver cómo se visualizan sin necesidad de cargar el JavaScript.

## CSS
El estilo visual del proyecto está organizado en **5 archivos CSS**:

1. **`base.css`**: Estilos base y comunes.
2. **`components.css`**: Estilos para componentes reutilizables.
3. **`layout.css`**: Diseño general de la página.
4. **`reset.css`**: Restablece los estilos por defecto del navegador.
5. **`variables.css`**: Definición de variables globales (colores, tipografías, etc.).

## Javascript
Cada funcionalidad se ha implementado en un script separado para facilitar la reutilización y escalabilidad del proyecto. Las principales características son las siguientes:

- **Carrusel de imágenes**: Implementación de un carrusel para mostrar la información general en la página principal. Este carrusel es modular, lo que permite agregar múltiples carruseles en la misma página, cada uno gestionado de forma independiente.
  
- **Comentarios dinámicos**: Los comentarios se cargan desde un archivo JSON (`comments.json`) y se muestran dinámicamente en la página.
  
- **Contador regresivo**: Implementación de un contador regresivo para la recaudación.
  
- **Selector de países**: Un desplegable para seleccionar países, vinculado a un archivo JSON. Esto facilita la adición de más países y la actualización de los datos de gastos de envío, asegurando la centralización y veracidad de la información.
  
- **Patrón Observer**: Implementación de un patrón Observer para suscribir eventos y notificar a toda la web cuando cambie el monto recaudado. Además, el monto recaudado se guarda en **localStorage** para persistir la información.
  
- **Barra de progreso**: Barra de progreso dinámica que refleja el avance de algún objetivo o proceso.
  
- **Recompensas dinámicas**: Las recompensas se cargan automáticamente desde un archivo JSON.

---

## Estructura de la web
```plaintext
-web
  ├── css
  │    ├── base.css           # Estilos básicos globales
  │    ├── components.css     # Estilos para componentes específicos
  │    ├── layout.css         # Estilos de disposición/layout
  │    ├── reset.css          # Restablece los estilos por defecto del navegador
  │    └── variables.css      # Variables globales de CSS
  ├── data
  │    ├── comments.json      # Datos de los comentarios para la sección de comentarios
  │    ├── countries.json     # Información sobre países disponibles para envíos
  │    └── rewards.json       # Datos de las recompensas disponibles
  ├── html
  │    ├── fake-payment.html  # Página de simulación de pago ficticio
  │    └── fake-rewards.html  # Página de selección de recompensas ficticia
  ├── js
  │    ├── carousel.js        # Carrusel de imágenes
  │    ├── comments.js        # Creación y carga de comentarios dinámica
  │    ├── countdownTimer.js  # Temporizador para cuenta regresiva de la campaña
  │    ├── countrySelector.js # Selección del país para envío
  │    ├── fundraiser.js      # Lógica para mostrar en la página principal la recaudación de fondos
  │    ├── fundStorage.js     # Manejo de almacenamiento de fondos con local storage
  │    ├── payment.js         # Lógica para el procesamiento de pagos
  │    ├── progressBar.js     # Función para mostrar la recaudación actual en la barra de progreso
  │    ├── rewards.js         # Lógica para la creación dinámica de la información de las recompensas
  │    ├── rewardsDetails.js  # Llama a rewards para que muestre la información detallada de las recompensas
  │    ├── rewardsGateway.js  # Llama a rewards para que muestre el resumen de la información de las recompensas
  │    └── urls.js            # Gestión de URLs y rutas internas, para que funcione con live server y github pages.
  ├── src
  ├── index.html              # Página de inicio
  └── sitemap.html            # Mapa del sitio
```
