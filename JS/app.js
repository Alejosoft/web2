var latSelect = 0
var lonSelect = 0

var select = document.getElementById("SelectPais");
var selectPokemon = document.getElementById("SelectPokemon");
var contentCitys = []
var contentPokemon = []
var temperatura = document.getElementById('temperatura')



regiones();
pokemones();

///// INFORMACION DE PAISES


function regiones() {
    fetch('https://restcountries.eu/rest/v2/regionalbloc/USAN')
    .then(res => res.json())
    .then(data => {
        contentCitys = data
        for (var i = 0; i < contentCitys.length; i++) {
            var opcion = document.createElement("option")
            opcion.text = data[i].name
            opcion.value = i
            select.add(opcion);
        }
    })
}


select.addEventListener('change', (event) => {
    const i = event.target.value
    const infoPais = document.getElementById('infoPais');

    infoPais.innerHTML = `
        <img height="400px" width="600px" src="${contentCitys[i].flag}">
        <p><b>Pais:</b> ${contentCitys[i].name}</p>
        <p><b>Capital:</b> ${contentCitys[i].capital}</p>
        <p><b>Poblacion:</b> ${contentCitys[i].population} Habitantes</p>
        <p><b>Region:</b> ${contentCitys[i].region}</p>
        <p><b>SubRegion:</b> ${contentCitys[i].subregion}</p>
        <p><b>Moneda:</b> ${contentCitys[i].currencies[0].name}</p>
    `
    traer(contentCitys[i].capital)
});

/////// INFORMACION POKEMON

selectPokemon.addEventListener('change', (event) => {
    const infoPokemon = document.getElementById('infoPokemon');
    fetch(event.target.value)
    .then(res => res.json())
    .then(data =>{
        detallePokemon = data
        console.log("Informacion pok", detallePokemon)

        infoPokemon.innerHTML = `
            <img height="400px" width="600px" src="${detallePokemon.sprites.front_default}">
            <p><b>Tipo de Pokemon: </b><br>${detallePokemon.types[0].type.name}<br>${detallePokemon.types[1].type.name}</p>
            <p><b>Habilidades: </b><br>${detallePokemon.abilities[0].ability.name}<br>
            ${detallePokemon.abilities[1].ability.name}</p>
            <p><b>Nivel Defensa: </b>${detallePokemon.stats[0].base_stat}</p>
        `
    })
})


function pokemones() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    .then(res => res.json())
    .then(data => {
        contentPokemon = data.results
        for (var i = 0; i < contentPokemon.length; i++) {
            var opcion = document.createElement("option")
            opcion.text = contentPokemon[i].name
            opcion.value = contentPokemon[i].url
            selectPokemon.add(opcion);
        }
    })

}

function traer(pais) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+pais+'&appid=110744fd01ab8d8dc905c75a017f856c')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        latSelect = data.coord.lat;
        lonSelect = data.coord.lon;
        console.log("Latitud" , latSelect);
        displaynone = document.getElementById('conteMap');
        displaynone.className = 'mostrar';
        initMap()
        addMarker()
        temperatura.innerHTML = `
        <p><b>Temperatura Actual:</b> ${data.main.temp}</p>
        <p><b>Temperatura Maxima:</b> ${data.main.temp_max}</p>
        <p><b>Temperatura Minima:</b> ${data.main.temp_min}</p>
        `
    })
}

function initMap(){
    var opc = {
        zoom: 5,
		center: {lat: latSelect ,lng: lonSelect}
	}
	map = new google.maps.Map(document.getElementById('map'), opc);
}

function addMarker() {
    var marker = new google.maps.Marker({
        position: {lat: latSelect ,lng: lonSelect},
      	map: map
	});
}