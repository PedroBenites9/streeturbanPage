// script checkout

let carritoLS = JSON.parse(localStorage.getItem("carrito"))
const contenedorCheckout = document.querySelector('#home')
const contenedorProductos = document.querySelector('#contenedor__productos')

cargarEventListeners();
function cargarEventListeners(e) {
    // e.preventDefault()

}

function obtenerProductoLS(productos) {

}

carritoLS.map((producto) => {
    const { idProducto, imagen, title, precio, cantidad } = producto
    const total = precio * cantidad
    console.log(cantidad)
    mostrarProductos(idProducto, imagen, title, precio, cantidad)
})

function mostrarProductos(idProducto, imagen, title, precio, cantidad) {
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
                <h3>Total:$ ${precio * cantidad}</h3>
            </div>
            
            <hr />
    `
    contenedorProductos.appendChild(divCheckout)
}