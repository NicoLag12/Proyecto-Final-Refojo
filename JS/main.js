

const Cards = document.getElementById('Cards')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const url = 'https://trabajos-ef168-default-rtdb.firebaseio.com/Profeciones.json'
let carrito= {}

fetch(`${url}`)
.then(res => res.json())
.then(data =>console.log(data))

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
    if(localStorage.getItem('carrito')){
      carrito = JSON.parse(localStorage.getItem('carrito'))
      pintarCarrito()
    }
})
Cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e=>{
    btnAgregar(e)
})

const fetchData = async () => {
    try {
        const res = await fetch (url)
        const data = await res.json()
        /* console.log(data) */
        pintarCards(data)
    }catch (error){
        console.log(error)
    }
}

const pintarCards = data =>{
    /* console.log(data) */
    data.forEach(element => {
        templateCard.querySelector('h5').textContent = element.Rol
        templateCard.querySelector('p').textContent = element.precio
        templateCard.querySelector('img').setAttribute('src', element.thumbnaiUrl)
        templateCard.querySelector('.btn-dark').dataset.id = element.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    Cards.appendChild(fragment)
}


const addCarrito = e =>{
    /* console.log(e.target)
    console.log(e.target.classList.contains('btn-dark')) */
    if(e.target.classList.contains('btn-dark')){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Añadido al Carrito',
            showConfirmButton: false,
            timer: 850
          })
        
        
        setCarrito(e.target.parentElement)

    }
    
    e.stopPropagation()
}

const setCarrito = objeto => {
    console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        Rol: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()
}



const pintarCarrito = ()=>{
    /* console.log(carrito) */
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.Rol
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))

}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML =  `
        <th scope="row" colspan="5"> Carrito vacio - Añada algo para ver</th>
        `
        return
    }
    const Ncantidad = Object.values(carrito).reduce((acc, {cantidad} )=> acc + cantidad, 0)
    const Nprecio = Object.values(carrito).reduce((acc, {cantidad, precio} )=> acc + cantidad *precio, 0)
    
    templateFooter.querySelectorAll('td')[0].textContent = Ncantidad
    templateFooter.querySelector('span').textContent = Nprecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        pintarCarrito()
    })
}

const btnAgregar = e =>{
    console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        const ambo = carrito[e.target.dataset.id]
        ambo.cantidad = carrito[e.target.dataset.id].cantidad+1
        carrito[e.target.dataset.id] = {...ambo}
        pintarCarrito()
    }
    if(e.target.classList.contains('btn-danger')){
        const ambo = carrito[e.target.dataset.id]
        ambo.cantidad--
        if(ambo.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
}
    e.stopPropagation()
}

fetch(url)
.then(res => res.json())
.then(data =>{
    data.forEach(producto => {
        const btnfinal = document.getElementById('button-final')
        btnfinal.addEventListener('click', function(){
            window.location.href = `../HTML/formulario.html`
        })
    });
})
.catch(err => console.log(err)) 
    











































































































































































