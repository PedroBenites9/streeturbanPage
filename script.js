
// const produ = () => {
//     fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then((json) => { return json })
//         .catch(error => {
//             console.log(error)
//         })

// }


const API_URL = ' https://api.escuelajs.co/api/v1/products'
const contenedorCard = document.querySelector('#card')
fetch(API_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(clothes => {
            let div_card = document.createElement('div')
            let title_card = document.createElement('h3')
            div_card.classList.add('card')
            div_card.innerHTML = ` 
            <img src=${clothes.images[1]} alt="imagenCard" referrerpolicy="no-referrer"/>
            <p class="card__title">${clothes.title}</p>
            <button class="button-buy">comprar</button>`
            contenedorCard.append(div_card)

            if (clothes.title == 'Product from the website') {
                xhr.open("DELETE", `https://api.escuelajs.co/api/v1/products/${clothes.id}`);
                xhr.send()
            }
        })
    })

const xhr = new XMLHttpRequest();