let carritoArticulos = []

// variables indexe.html
const carrito = document.querySelector("#lista-carrito")
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const comprarProductoBtn = document.querySelector('#iniciar-compra')

const listaProducto = document.querySelector('#lista-productos')
const contenedorCard = document.querySelector('.cards')

// variables checkout 

const productoCheckout = document.querySelector('#checkout-producto')

const API_URL = './assets/json/Productos_Indumentaria.json'

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
                        <p>$<span>${price}</span></p>
                        <a class="btn btn-light align-self-end agregar-carrito" data-id="${id}"> Añadir carrito</a>
                    </div
                </div>
            </div>
            `
            contenedorCard.append(div_card)
        })
    })


// funciones

cargarEventListeners()
function cargarEventListeners() {
    listaProducto.addEventListener('click', agregarCarrito)

    // elimina producto
    carrito.addEventListener('click', eliminarProducto)

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

    comprarProductoBtn.addEventListener('click', comprarProducto)
}

function agregarCarrito(e) {
    e.preventDefault()
    const contenidoCarrito = e.target.classList.contains('agregar-carrito')
    const productoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement
    if (contenidoCarrito) {
        leerDatosProducto(productoSeleccionado)
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const prodID = e.target.getAttribute('data-id')
        //Elimina del arreglo de carritoArticulos por el data-id
        carritoArticulos = carritoArticulos.filter(prod => prod.idProducto !== prodID)

        carritoHTML() // Iterar sobre el carrito y mostrar su HTML
    }

}

function vaciarCarrito(e) {
    e.preventDefault()
    carritoArticulos = []
    carritoHTML()
}


function leerDatosProducto(producto) {
    // crea un objeto con el contenido del producto
    const infoProducto = {
        idProducto: producto.querySelector('a').getAttribute('data-id'),
        imagen: producto.querySelector('img').src,
        title: producto.querySelector('h4').textContent,
        precio: parseInt(producto.querySelector('span').textContent),
        cantidad: 1,
        total: 0
    }
    const existe = carritoArticulos.some(prod => prod.idProducto === infoProducto.idProducto)
    if (existe) {
        // actualizamos cantidad
        const productos = carritoArticulos.map(prod => {
            if (prod.idProducto === infoProducto.idProducto) {
                prod.cantidad++ //retorna objeto actualizado
                return prod
            } else {
                return prod //retorna los productos que no son duplicados
            }
        })
        carritoArticulos = [...productos]
        almarcenarLocalStorage(carritoArticulos)
    } else {
        //agregamos a carrito
        carritoArticulos = [...carritoArticulos, infoProducto]
        almarcenarLocalStorage(carritoArticulos)
    }
    // actualiza HMTL carrito
    let total = infoProducto.cantidad * infoProducto.precio
    carritoHTML()
}




function carritoHTML(e) {
    // limpiar HTML
    limpiarHTML()
    // recorre el carrito y genera HTML
    carritoArticulos.forEach((producto) => {
        const { imagen, title, precio, cantidad, idProducto } = producto
        const row = document.createElement('tr')
        row.innerHTML = `
        <td id='producto__imagen'>
            <img src="${imagen}" class='img__carrito'/>    
        </td>
        <td id='producto__title'>
            ${title} 
        </td>
        <td id='producto__precio'>
            ${precio}
        </td>
        <td id='producto__cantidad'>
            ${cantidad}
        </td>
        <td>
            <a href='#' class='borrar-curso' data-id="${idProducto}"> X </a>
        </td>
         `
        // agregar HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

// elimina los cursos del tbody

function limpiarHTML() {
    // contenedorCarrito.innerHTML = ''
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function almarcenarLocalStorage(producto) {
    localStorage.setItem('carrito', JSON.stringify(producto))
}

function alertaCarrito(message, type) {
    const alerta = document.querySelector('#alerta')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `
            <div class='alert alert-${type} alert-dismissible translate-middle' role="alert">
                <div>${message}</div>
                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
    ].join()
    alerta.append(wrapper)
}

function alertaCarritoVacio() {
    alertaCarrito('El Carrito se encuentra vacio, elige un producto', 'danger')
}

function comprarProducto() {
    if (!carritoArticulos.length && !localStorage.length) {
        alertaCarritoVacio()
    } else {
        window.location.href = './layout/carrito.html'
        vaciarCarrito()
        limpiarHTML()

    }
}

