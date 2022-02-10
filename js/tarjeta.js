var datos = [];

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(respuesta => respuesta.json())
    .then(json =>{datos.push(...json.eventos)})
    console.log(datos);

    var id = datos.map(date => date.id)
    console.log(id);

    var id = location.search.split("?id=").filter(Number)
    var selecionarId = Number(id[0])
    console.log(selecionarId);
    var lista = datos.find(function(lista){
        return lista.id == selecionarId
    })


    var html = 
    `
        
    <div>

    <img src="${lista.image}">
    <div><h2><a href="./tarjeta.html?id=${lista.id}">${lista.name}</a></h2></div>
    <div><p>Fecha:  ${lista.date}</p></div>
    <div><p>Descripcion: ${lista.description}</p></div>
    <div><p>Precio: ${lista.price}</p>    </div>
    <div><p>Asistencia: ${lista.assistance}</p></div>
    <div><p>Capacidad: ${lista.capacity}</p></div>
    <div><p>Lugar: ${lista.place}</p></div>
    <div><p>Categoria: ${lista.category}</p></div>
    
    
    </div>
    `
    
        
        document.querySelector("#mainCards").innerHTML = html;
 }

getData();