const carritoArticulos = []

const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector('#lista-carrito')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

const listaProducto = document.querySelector('#lista-producto')
const contenedorCard = document.querySelector('.cards')

const API_URL = './assets/json/Productos_Indumentaria.json'


cargarEventListeners()
function cargarEventListeners() {
    listaProducto.addEventListener('click', agregarCarrito)
}

fetch(API_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(clothes => {
            let div_card = document.createElement('div')
            const { images, title, price, id } = clothes
            div_card.classList.add('card')
            div_card.innerHTML = ` 
            <div class='col'>
                <img src=${images[1]} class="card-img-top p-0 w-100" alt="imagenCard" referrerpolicy="no-referrer"/>
                <div class='card-body position-relative row row-cols-1  h-100 '>
                    <div class='col'>
                        <h4 class="card__title">${title}</h4>
                        <p>$${price}</p>
                        <a class="btn btn-light align-self-end agregar-carrito" data-id="${id}"><span> Añadir carrito</span></a>
                    </div
                </div>
            </div>
            `
            contenedorCard.append(div_card)
        })
    })


// funciones
function obtenerProducto(e) {
    console.log('click desde obtener producto')
}

function agregarCarrito(e) {
    e.preventDefault()

    const contenidoCarrito = e.target.classList.contains('agregar-carrito')
    const productoSeleccionado = e.target.parentElement.parentElement

    if (productoSeleccionado) {
        leerDatosProducto(contenidoCarrito)
    }

}

function leerDatosProducto(curso) {
    const infoProducto = {
        idCurso: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        cantidad: 1
    }
}

function carritoHTML() {
    // limpiar HTML
    limpiarHTML()
    // recorre el carrito y genera HTML
    carritoArticulos.forEach((curso) => {
        const { imagen, title, precio, cantidad, idCurso } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
         <td>
             <img src="${imagen}"    
         </td>
         <td>
             ${title} 
         </td>
         <td>
             ${precio}
         </td>
         <td>
             ${cantidad}
         </td>
         <td>
             <a href='#' class='borrar-curso' data-id="${idCurso}"> X </a>
         </td>
         `
        // agregar HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}