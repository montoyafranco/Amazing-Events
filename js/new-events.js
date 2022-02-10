


//VARIABLES GLOBALES QUE CONTIENEN LOS ARRAY
var array1 = []   //creo los eventos ya filtrados por la fecha
var currentDate = [] // aca guardo la fecha para compararla
console.log(array1)
console.log(currentDate)



async function obtenerEventos(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => {
        return response.json()
    }) 
    .then(json =>{                              // creo una funcion flecha en la que currentDate es el valor de Json.fechaactual
        currentDate = json.fechaActual          //Aca igualo sin ...  "2022-01-01"
        array1.push(...json.eventos              //aca empujo filtrando por fecha comparando y si uso ... xq necesito la info de adentro
            .filter(fechas => fechas.date > currentDate))   //a json.evento le aplico filter ahi mismo . EVENTO.DATE y hago condicional
                                                        //NO IMPORTA EL NOMBRE DE LA FUNCION FLECHA  =  ...JSON.EVENTOS.(filter).DATE) >
    })
    displayCard(array1)
    console.log(currentDate)
    
}
obtenerEventos()

function displayCard(array1) {
    var html=""
    var arrayMap = array1
    
    console.log(arrayMap)

    
    arrayMap.map(evento =>{
    
         html += `    
        
             
        
            
        
        <div>

            <img src="${evento.image}">
            <h2><a href="./tarjeta.html?id=${evento.id}">${evento.name}</a></h2>
            <p>Fecha:${evento.date}</p>
            <p>Descripcion:${evento.description}</p>
            <p>Precio:${evento.price}</p>
            
            <p></p>
            <p></p>
        </div>
        
        ` 
    })
    
    document.querySelector('#mainCards').innerHTML = html 
    
}

