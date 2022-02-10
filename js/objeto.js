
var eventsData = []

var textSearch = ""

var valueSelect = ""

var busqueda = document.querySelector("#searchInput")

var beforeContainer = document.querySelector("#mainCards")

var resBusqueda = document.getElementById("resBusqueda")

var selectInp = document.querySelector("#selectInp")

fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(promesa => promesa.json())
    .then(datos => {eventsData.push(...datos.eventos)
        displayCard(eventsData)
    })


    


//Funciones 





function valueSelected(event) {
    var val = event.target.value
    valueSelect = val
    var filtered = filtrarValyText(val, textSearch)
    displayCard(filtered)
}

function search() {
    var valor = event.target.value
    textSearch = valor
    var filtered=[]
        if (textSearch == undefined) {
        switch (valueSelect) {
            case "menor":
                filtered.push(...eventsData.filter(event => event.capacity < 60000))
                
                break;
            case "mayor":
                filtered.push(...eventsData.filter(event => event.capacity > 60000))
                break;
            default:
                filtered.push(...eventsData)
        }
    } else {
        switch (valueSelect) {
            case "menor":
                filtered.push(...eventsData.filter(event => event.capacity < 60000 && event.name.toLowerCase().includes(valor.toLowerCase())))
                break;
            case "mayor":
                filtered.push(...eventsData.filter(event => event.capacity > 60000 && event.name.toLowerCase().includes(valor.toLowerCase())))
                break;
            default:
                filtered.push(...eventsData.filter(event => event.name.toLowerCase().includes(valor.toLowerCase())))
        }
    }
    displayCard(filtered)


}
function displayCard(array1) {
    beforeContainer.innerHTML = ""
    var arrayMap = []
    if (array1) {
        arrayMap = []
        arrayMap.push(...array1)
    } else {
        arrayMap = []
        arrayMap.push(...eventsData)
    }
    arrayMap.map(evento => {
        beforeContainer.innerHTML +=
        `    
        
        <div>

            <img src="${evento.image}">
            <div><h2><a href="./tarjeta.html?id=${evento.id}">${evento.name}</a></h2></div>
            <div><p>Fecha:${evento.date}</p></div>
            <div><p>Descripcion:${evento.description}</p></div>
            <div><p>Precio:${evento.price}</p></div>
            
            
        </div>
        
        `
    })
}



function filtrarValyText(seleccionado, inputVal) {
    var filtered = []
    if (inputVal != undefined) {
        switch (seleccionado) {
            case "menor":
                filtered.push(...eventsData.filter(event => {
                    return event.capacity < 60000
                }))
                break;
            case "mayor":
                filtered.push(...eventsData.filter(even => {
                    return even.capacity > 60000
                }))
                break;
            default:
                filtered.push(...eventsData)
        }
    } else {
        switch (seleccionado) {
            case "menor":
                filtered.push(...eventsData.filter(event => {
                    return event.capacity < 60000 && event.name.toLowerCase().includes(inputVal.toLowerCase())
                }))
                break;
            case "mayor":
                filtered.push(...eventsData.filter(event => {
                    return event.capacity > 60000 && event.name.toLowerCase().includes(inputVal.toLowerCase())
                }))
                break;
            default:
                filtered.push(...eventsData.filter(event => {
                    return event.name.toLowerCase().includes(inputVal.toLowerCase())
                }))
        }
    }
    return filtered
}

selectInp.addEventListener("change", valueSelected)
busqueda.addEventListener("input", search)

