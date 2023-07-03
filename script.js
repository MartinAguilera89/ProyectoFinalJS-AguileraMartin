//Socios del club para saber condicion de pagos de cuotas.

const socio1 = new Socio(1,"Raul Ramirez", 10001)
const socio2 = new Socio(2,"Luis Luque", 10002)
const socio3 = new Socio(3,"Gaston Gonzalez", 10003) 
const socio4 = new Socio(4,"Fernando Fernandez", 10004)
const socio5 = new Socio(5,"Martin Martinez", 10005)

const SOCIOS = [socio1,socio2,socio3,socio4,socio5];

function presentarSocios(mostrarSocios){
    const cardSocios = document.getElementById("cardSocios")
   
    mostrarSocios.forEach((socio => {
        let divCard = document.createElement("div")
                
        divCard.innerHTML = `
        <div class="card" id="${socio.id}">
        <div class="card-header">SOCIO</div>
        <div class="card-body">
          <h4 class="card-title">${socio.nombre}</h4>
          <p class="card-text">INFO CLUB - Numero de Socio ${socio.nroSocio}</p>
          <input type="button" class="btn btn-primary" value="Cargar Cuotas" onclick="verPagos('${socio.id}')">
        </div>
      </div>
        `

        cardSocios.append(divCard)

        const divAPintar = document.getElementById(socio.id)
        
        socio.abono === "Abonado Activo" 
            ? divAPintar.style.backgroundColor = "#43c543" 
            : socio.abono === "Abonado Inactivo; Falta ponerse al dia con las cuotas" 
                ? divAPintar.style.backgroundColor = "#f0f087"
                : socio.abono === "Abono dado de baja; no pago ninguna cuota" 
                    ? divAPintar.style.backgroundColor = "#e23030"
                    : null
    }))
}

function verPagos(idSocio){
    let socioSeleccionado = sociosLS.find(e => e.id == idSocio)
    if (socioSeleccionado.cuotas.length == 3){ return pagoCuota(socioSeleccionado)}

    const divPagos = document.getElementById("pagos")
    divPagos.innerHTML = `
        <form id="pagoSocio"> 
            <h4> Ingresaras el valor abonado por ${socioSeleccionado.nombre} </h4>
            <p> Ingrese el ${socioSeleccionado.cuotas.length + 1}° valor (en pesos) de cuota</p>
            <input type="number" id="pago">
            <input type="submit" value="Cargar Cuotas">
        </form>
    `

    document.getElementById("pagoSocio").addEventListener("submit", (e)=>{
        e.preventDefault()
        let infoEvent = e.target
        let pago = infoEvent.querySelector('#pago')
        pago = pago.value
        socioSeleccionado.cuotas.push(new Cuotas(pago)) 
        actualizarAlmacenamiento("socios", JSON.stringify(sociosLS))
        divPagos.innerHTML = ``
        
    })
}

function pagoCuota(socio){

    const cardElegida = document.getElementById(socio.id)

    let pagos = socio.cuotas.reduce((acumulador, elemento) => {
        return acumulador += parseInt(elemento.pago);
    }, 0)
    let condicion = pagos/socio.cuotas.length;

        if (condicion >= 1500){
        socio.abono = "Abonado Activo"
        cardElegida.style.backgroundColor = "#43c543"
        }else if(condicion >= 1){
        socio.abono = "Abonado Inactivo; Falta ponerse al dia con las cuotas"
        cardElegida.style.backgroundColor = "#f0f087"
        }else{
        socio.abono = "Abono dado de baja; no pago ninguna cuota"
        cardElegida.style.backgroundColor = "#e23030"
        }

    cardElegida.querySelector('input').disabled = true
    actualizarAlmacenamiento("socios", JSON.stringify(sociosLS))
    swal.fire({
        title: `Condición del socio ${socio.nombre} actualizada`,
        text: `Se cargaron los valores de las ultimas 3 cuotas del socio: ${socio.abono}`,
        icon: socio.abono == "Abonado Activo" ? 'success' : 'error', 
        timer: 5000,
       
        })

}

function traerSocios(){
    fetch("./socios.json")
    .then(res => res.json())
    .then(data => presentarSocios(data))
}


//Actualiza el contenido del almacenamiento
function actualizarAlmacenamiento(clave, valor){
    localStorage.setItem(clave, valor)
}

let sociosLS = JSON.parse(localStorage.getItem("socios"))

//Evento para comenzar a ejecutar nuestro código cuando esté listo el DOM
document.addEventListener("DOMContentLoaded", () => {
    if (!sociosLS){
        sociosLS = SOCIOS
    }
    traerSocios(sociosLS)
}
)