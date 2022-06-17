let btnfinal= document.getElementById('button-final')
btnfinal.addEventListener('click', actofinal)
function actofinal(){
  Swal.fire({
    title: 'Estas seguro?',
    text: "Vas a finalizar el pedido",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Claro!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Genial!',
        'Tu Pedido se esta Preparando!!',
        'success'
        
      )
    }
  })
  return(false)
}
