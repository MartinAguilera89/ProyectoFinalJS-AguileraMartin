class Socio{
    constructor(id, nombre, nroSocio, cuotas, abono){
        this.id = id,
        this.nombre = nombre,
        this.nroSocio = nroSocio,
        this.cuotas = [],
        this.abono = ""
    }
}

class Cuotas{
    constructor(pago){
        this.pago = pago,
        this.fecha = new Date()
    }
}