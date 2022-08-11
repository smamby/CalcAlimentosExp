console.log('lugar',lugar);
console.log('fecha',fecha);
console.log('cenas',ingredientesDeCenas);
console.log('des',ingredientesDeDesayuno);
console.log('march',ingredientesDeMarchas);

var listaConcatenada = [];
function concatenar(){
     listaConcatenada = ingredientesDeCenas.concat(ingredientesDeDesayuno.concat(ingredientesDeMarchas));
}

var Almacen = [];
var Verduleria = [];
var Dietetica = [];
var Carniceria = [];
var Kiosco = [];
var Otros = [];


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
                 window[categoria].push(i);
            };
         };
    };    
};

var items = [];
function encontrarItems(lista) {
    var itemsList = [];
    itemsList = lista.map(el=> el.ingrediente);
    console.log(itemsList);
    itemsList.forEach(item => {
        if(!items.includes(item)){
            items.push(item);
        };
    });
    console.log(items);
};
var listaFinal = [];
var ingredienteFinal = [];
function sumarItemsIguales(lista){
    for (var item of items){
        for(var elemento of lista) {
            if(item === elemento.ingrediente){
                if(!ingredienteFinal.includes(item)){
                    ingredienteFinal.push(item);
                    listaFinal.push(elemento);
                } else {
                    listaFinal[listaFinal.length-1].subtotal += elemento.subtotal;
                };
            };
        };   
    };
};
var listaFinalMinima = [];
function minimizarLista(lista){
    for(var elem of lista){
        var elementoMinimo = {
            ingrediente : elem.ingrediente,
            clasificacion: elem.clasificacion,        
            unidad : elem.unidad,        
            subtotal : Math.ceil(elem.subtotal),
        };
        listaFinalMinima.push(elementoMinimo);
    };
};
function sumarIngredientes(){
    concatenar()
    encontrarItems(listaConcatenada)
    sumarItemsIguales(listaConcatenada)
    console.log(listaFinal)
    minimizarLista(listaFinal);
};
function alistarParaImprimir(){
    sumarIngredientes();
    separate(listaFinalMinima);
    console.table(Almacen);
    console.table(Verduleria);
    console.table(Dietetica);
    console.table(Kiosco);
    console.table(Otros);
};
//var clasesLowerCase = [] ;

function CrearListas(clases){
    //clasesLowerCase = clases.map(el=> el.toLowerCase());
    for (var clase of clases){
        var table = document.createElement("table");
        table.className=`tableCompra${clase}`;
        table.id=`tableCompra${clase}`;
        var thead = document.createElement("thead");
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        var rowCompra = document.createElement("tr");
        rowCompra.className=`rowCompra${clase}`;
        rowCompra.id=`rowCompra${clase}`;
        var contListasCompra = document.getElementById("contListasCompra");
        contListasCompra.append(table);
        var titleTable = document.createElement("div")
        thead.appendChild(titleTable);
        titleTable.append(clase)
        thead.appendChild(rowCompra);
        var tdClasific = document.createElement("td");
        rowCompra.appendChild(tdClasific)
        tdClasific.append("Clasificacion");        
        var tdIngrediente = document.createElement("td");
        rowCompra.appendChild(tdIngrediente)
        tdIngrediente.append("Ingrediente");
        var tdSubtotal = document.createElement("td");
        rowCompra.appendChild(tdSubtotal);
        tdSubtotal.append("Cantidad");
        var tdUnidad = document.createElement("td");
        rowCompra.appendChild(tdUnidad);
        tdUnidad.append("Unidades");
    
        //for (var clase of clasesLowerCase){
            for(var elem of window[clase]){
                var row = tbody.insertRow(); 
                var clasificTC = row.insertCell(0);
                var ingredTC =  row.insertCell(1);
                var subtotalTC = row.insertCell(2);
                var unidadTC = row.insertCell(3);
                clasificTC.append(elem.clasificacion);
                ingredTC.append(elem.ingrediente);
                subtotalTC.append(elem.subtotal);
                unidadTC.append(elem.unidad);
            }
        //}
    }       
}

function listasDeCompras(){
    alistarParaImprimir();
    CrearListas(clases)
}

function imprimirListasDeCompras(){
    windows.print()
}