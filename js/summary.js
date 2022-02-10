var datos = [] 
var categoriasTotal = []
var eventoPasados=[]
var total=[]



async function fetchJson(){ 
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then (response => response.json())
    .then (json => {
                    datos.push(...json.eventos), 
                    fechaPresente = json.fechaActual
                    })
                    
    tablaFiltrar()
    mayCapacidad()
    maxAudiencia()
    
}

fetchJson()

function tablaFiltrar(){
    var categorias = datos.map(evento => evento.category)    
    eventoPasados = datos.filter(evento => (evento.date < fechaPresente) && typeof evento.assistance == "number")    
    categoriasTotal = new Set (categorias)     

var eventoRepetido=[]

var ingreso = 0;var capacidad = 0;var asistencia = 0
var categorias = ""
   
categoriasTotal.forEach(categoria => { 
eventoRepetido = eventoPasados.filter(evento => evento.category == categoria)
       
        
    eventoRepetido.forEach(eventoR => { 
    categorias = eventoR.category            
    ingreso = ingreso + eventoR.price*eventoR.assistance
    capacidad = capacidad + eventoR.capacity
    asistencia = asistencia + eventoR.assistance
    })

    total.push({category: categorias, ingresoTotal: ingreso, asistencia: Math.round((asistencia*100)/ capacidad)})
    eventoRepetido=[]
    ingreso = 0
    capacidad = 0
    asistencia = 0
    categorias = ""   
})


    
    desplegarTablaOne(total)
    function desplegarTablaOne(objectoDe){ 
                
        objectoDe.forEach(categoriaInfo=>{
            document.querySelector('#nombre-categorias').appendChild(document.createElement('td')).innerHTML 
            = categoriaInfo.category 
            document.querySelector('#ingresos').appendChild(document.createElement('td')).innerHTML 
            = "$" + categoriaInfo.ingresoTotal
            document.querySelector('#asistencia').appendChild(document.createElement('td')).innerHTML 
            =  categoriaInfo.asistencia + "%" 
            
        })

    }
}


function mayCapacidad(){
   var maxCapacidad = "" 
   var capMas = []
   capMas.push(...datos)
   capMas.sort((a,b) => b.capacity - a.capacity)
    
maxCapacidad = capMas[0]
 console.log(maxCapacidad.name)
 
 console.log()




document.getElementById("mayorCapacidad").appendChild(document.createElement("td")).innerHTML = maxCapacidad.capacity + " Asistentes"+"  "+ "evento:" + maxCapacidad.name;
}

function maxAudiencia(){
    var maxAud = "" 
    var menAud = ""
    var arregloMax = []
    arregloMax.push(...datos)
    arregloMax.map(evento =>{
        evento.portAsist = (evento.assistance * 100) / evento.capacity 
    })
    arregloMax.sort((a,b) => b.portAsist - a.portAsist)

    maxAud = arregloMax[0]
    menAud = arregloMax[arregloMax.length-1]
    

    document.getElementById("mayorAudiencia").appendChild(document.createElement("td")).innerHTML = maxAud.name + " Asistencia: " + maxAud.portAsist.toFixed(2) + "%";
    document.getElementById("menorAudiencia").appendChild(document.createElement("td")).innerHTML = menAud.name ;

}