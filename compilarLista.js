console.log('lugar',lugar);
console.log('fecha',fecha);
console.log('cenas',ingredientesDeCenas);
console.log('des',ingredientesDeDesayuno);
console.log('march',ingredientesDeMarchas);

var listaConcatenada = [];
function concatenar(){
     listaConcatenada = ingredientesDeCenas.concat(ingredientesDeDesayuno.concat(ingredientesDeMarchas));
}

var almacen = [];
var verduleria = [];
var dietetica = [];
var carniceria = [];
var kiosco = [];
var otros = [];


var clases = [];

function encontrarClases(lista) {
    var clasificationList = [];
    clasificationList = lista.map(el=> el.clasificacion);
    console.log(clasificationList);
    clasificationList.forEach(item => {
        if(!clases.includes(item)){
            clases.push(item);
        };
    });
};

concatenar()
function separate(lista) {
    encontrarClases(lista)
    for (var categoria of clases){
        for (var i of lista){
            if(i.clasificacion.toLowerCase() === categoria.toLowerCase()){
                 window[categoria.toLowerCase()].push(i);
            };
         };
    };    
};

console.table("almacen",almacen);
console.table("verduleria",verduleria);
console.table("dietetica",dietetica);
console.table("kiosco",kiosco);
console.table("otros",otros);
