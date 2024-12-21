// script checkout

let carritoLS = JSON.parse(localStorage.getItem("carrito"))
const contenedorCheckout = document.querySelector('#home')
const contenedorProductos = document.querySelector('#contenedor__productos')
const totalPrecio = document.querySelector('#totalPrecio')

let totalProd = []
let montoTotal = totalProd.reduce((acc, actual) => acc + actual, 0)
cargarEventListeners();
function cargarEventListeners(e) {
    // e.preventDefault()

}

function obtenerProductoLS(productos) {

}

carritoLS.map((producto) => {
    const { idProducto, imagen, title, precio, cantidad } = producto
    mostrarProductos(idProducto, imagen, title, precio, cantidad)
})

function mostrarProductos(idProducto, imagen, title, precio, cantidad) {
    let total = precio * cantidad
    totalProd.push(total)
    console.log(totalProd)
    let divCheckout = document.createElement('div')
    divCheckout.classList.add('card__producto')
    divCheckout.innerHTML = `
            <div class="product" id="checkout-product">
                <img src="${imagen}" alt="${idProducto}">
                <div class="product-info">
                    <h3>${title}</h3>
                    <p>Precio: ${precio}</p>
                    <p>Cantidad: ${cantidad}</p>
                </div>
            </div>
            <div class="total">
                <h3>Total:$ ${total}</h3>
            </div>
            <hr />
    `
    contenedorProductos.appendChild(divCheckout)
}


let totalProductos = totalProd.reduce((acc, actual) => acc + actual, 0)
mostrarTotal()
function mostrarTotal() {
    let divTotal = document.createElement('div')
    divTotal.innerHTML = `
        <h3>
            Monto total: $ ${totalProductos}
        </h3>
    `
    totalPrecio.appendChild(divTotal)
}
