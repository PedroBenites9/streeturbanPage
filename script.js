let carritoArticulos = []

const carrito = document.querySelector("#lista-carrito")
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

const listaProducto = document.querySelector('#lista-productos')
const contenedorCard = document.querySelector('.cards')

const API_URL = './assets/json/Productos_Indumentaria.json'




fetch(API_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(clothes => {
            let div_card = document.createElement('div')
            const { images, title, price, id } = clothes
            console.log(images[1])
            div_card.classList.add('card')
            div_card.innerHTML = ` 
            <div class='col'>
                <img src=${images[1]} class="card-img-top p-0 w-100" alt="imagenCard" referrerpolicy="no-referrer"/>
                <div class='card-body position-relative row row-cols-1  h-100 '>
                    <div class='col'>
                        <h4 class="card__title">${title}</h4>
                        <p>$${price}</p>
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
        precio: producto.querySelector('p').textContent,
        cantidad: 1
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
    } else {
        //agregamos a carrito
        carritoArticulos = [...carritoArticulos, infoProducto]
        console.log(carritoArticulos)
    }

    // actualiza HMTL carrito
    carritoHTML()
}

function carritoHTML() {
    // limpiar HTML
    limpiarHTML()
    // recorre el carrito y genera HTML
    carritoArticulos.forEach((producto) => {
        const { imagen, title, precio, cantidad, idProducto } = producto
        console.log(imagen)
        const row = document.createElement('tr')
        row.innerHTML = `
         <td>
             <img src="${imagen}" class='img__carrito'/>    
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