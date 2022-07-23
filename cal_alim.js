var diasDescanso = 0;
var diasMarcha = 0;  
var integrantes=1;
var datosExpeCargados=false;
function preArranque() {
    document.getElementById('marchas').focus();
}
preArranque();

function arranque(){    
    diasMarcha = document.getElementById('marchas').value;
    diasDescanso = document.getElementById('descanso').value;
    integrantes = document.getElementById('integrantes').value;
        
    let m = parseInt(diasMarcha);
    let des = parseInt(diasDescanso);
    var integ = parseInt(integrantes);
    //var cenasTotales = (dias + diasDescanso) * integrantes;
    var dias = m+des;
    diasDeDesayuno=dias;
    diasDeMarcha=m
    var cenasTotales = (m + (des*2)) * integ;
    cenas = cenasTotales
    console.log(dias);
    //console.log(diasDescanso);
    //console.log(integrantes);
    console.log(cenasTotales); 
    if (cenasTotales > 0){   
        datosExpeCargados=true;
        var impDias = document.getElementById("dias");
        impDias.innerHTML = ':  '+dias;
        var impComYPorc = document.getElementById("comidasYPorciones");
        impComYPorc.innerHTML = cenasTotales/integ
            +" comidas por "+integ+" integrantes = "+cenasTotales+" porciones";
        var impDiasMarcha = document.getElementById("labelMarchas");
        impDiasMarcha.innerHTML = diasDeMarcha
            +" dias y "+diasDeMarcha*integ+" porciones";
        var impDesayunos = document.getElementById("labelDesayunos");
        impDesayunos.innerHTML = diasDeDesayuno
            +" dias y "+diasDeDesayuno*integ+" porciones";
    } else {
        condPlatoCargado();
        // alert("Carga los dias de expedicion");
        // document.getElementById('marchas').focus();
    };
};

var cenas;
var platosCenas = [];
var cantPlatosCena;
var comidasComputadas=0;
var diasDeDesayuno=0;
var diasDeMarcha=0;
var cargaIngrediente=true;
var platoCargado=false;

function cargarPlato(){   //comidasComputadas tabla de hash
    if (datosExpeCargados===true) {
        if(!cargaIngrediente){
            alert('No cargaste ingredientes para el plato anterior')
        } else {
            if(document.getElementById('plato').value!="" 
            && document.getElementById('cantidadCenas').value!=0){        
                cargaIngrediente=false;
                var platoNombre = document.getElementById('plato').value;
                var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
                var integrantes = document.getElementById('integrantes').value;
                var integ = parseInt(integrantes);
                platosCenas.push(platoNombre)
                //var cantidadPlato = diasPlato * integ;    
                console.log(platoNombre);
                console.log(platosCenas);
                comidasComputadas += diasPlato;
                console.log(comidasComputadas);
                platoCargado=true;
            } else {
                alert("carga algun plato")
                document.getElementById('plato').focus();
            }
        };
    }else {
        condPlatoCargado();
        // alert("Carga los dias de expedicion");
        // document.getElementById('marchas').focus();
    };    
};

function saveIngredientes(){
    if(condCargarIngredientesPlato()){
        cargaIngrediente=true;
        if(segundaCondCargaIng()){
            var platoNombre = document.getElementById('plato').value;
            var ingredienteInput = document.getElementById('ingredientesCenas').value;
            var ingUnidadesInput = document.getElementById('unidades').value;
            var ingCantidadInput = document.getElementById('cantidadIngCenas').value;
            cargarIngDeCena(platoNombre,ingredienteInput,ingUnidadesInput,ingCantidadInput);
        }
    };
};

var ingredientesDeCenas = [];

function cargarIngDeCena(iplato,iingrediente,iunidad,icantidad){    
    var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);      

    var nuevoIngrediente = {
        plato : iplato,
        ingrediente : iingrediente,
        unidad : iunidad,
        cantidad : icantidad,
        subtotal : icantidad * integ * diasPlato,
        comidasComp : (comidasComputadas)+" de "+cenas/integ,
        checkDel : false,
    };
    if (comidasComputadas>(cenas/integ)){
        if(confirm('Supero las comidas necearias, quiere sumarla igualmente')){
            ingredientesDeCenas.push(nuevoIngrediente);
        }else{
            platosCenas.pop();
            comidasComputadas -= diasPlato;
        };
    } else {
        ingredientesDeCenas.push(nuevoIngrediente);
    }
    //ingredientesDeCenas.push(nuevoIngrediente); // arreglar error de logica
    imprimirListaIngredientes(ingredientesDeCenas);
    console.log(ingredientesDeCenas); 
    //console.log(typeof(ingredientesDeCenas[0].unidad)) 
    document.getElementById('ingredientesCenas').value = ""; 
    //document.getElementById('unidades').value = "";
    //document.getElementById('cantidadIngCenas').value = ""; 
}

console.log(platosCenas) 

function imprimirListaIngredientes(lista){
    var listaDeIngredientes = lista //obtenerLista();
    var tbody = document.querySelector("#listaDeIngredientes tbody");
    tbody.innerHTML = "";    
    //console.log(typeof(ingredientesDeCenas[0].unidad))

    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`cena${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var subtotalCell = row.insertCell(4);
        var ComidasCompCell = row.insertCell(5);
        var checkboxForDelete = row.insertCell(6)
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        //console.log(unidadesCell.innerHTML)
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        subtotalCell.innerHTML = listaDeIngredientes[i].subtotal;
        ComidasCompCell.innerHTML = listaDeIngredientes[i].comidasComp;
        checkboxForDelete.appendChild(checkBox);

        tbody.appendChild(row);               
    }
}

function limpiarIngredientes(){
    //document.getElementById('plato').value = "";
    //document.getElementById('cantidadCenas').value = "";
    document.getElementById('ingredientesCenas').value = "";
    document.getElementById('unidades').value = "";
    document.getElementById('cantidadIngCenas').value = "";
    document.getElementById('ingredientesDesayuno').value = "";
    document.getElementById('unidadesDesayuno').value = "";
    document.getElementById('cantidadIngDesayuno').value = "";
    document.getElementById('ingredientesMarchas').value = "";
    document.getElementById('unidadesMarchas').value = "";
    document.getElementById('cantidadIngMarchas').value = "";
}

/// DESAYUNOS

function saveIngredientesDesayuno(){
    if(datosExpeCargados===true){
        var platoNombre = 'Desayuno';
        if (segundaCondCargaIngDes()){
            var ingredienteDesInput = document.getElementById('ingredientesDesayuno').value;
            var ingUnidadesDesInput = document.getElementById('unidadesDesayuno').value;
            var ingCantidadDesInput = document.getElementById('cantidadIngDesayuno').value;
            cargarIngDeDesayunos(platoNombre,ingredienteDesInput,ingUnidadesDesInput,ingCantidadDesInput);
        }
    } else {
        condPlatoCargado()
    }
}

var ingredientesDeDesayuno = [];
var acumuladoDesayuno=0;
function cargarIngDeDesayunos(dplato,dingrediente,dunidad,dcantidad){    
    var vecesRepiteDesayuno = parseInt(document.getElementById('repiteDesayuno').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);   
    acumuladoDesayuno+=vecesRepiteDesayuno;
    var nuevoIngredienteDesayuno = {
        plato : dplato,
        ingrediente : dingrediente,
        unidad : dunidad,
        cantidad : dcantidad,
        subtotal : dcantidad * integ * vecesRepiteDesayuno,
        comidasComp : 'NO DATA',//(acumuladoDesayuno)+" de "+diasDeDesayuno,
        checkDel : false,
    };    
    if (acumuladoDesayuno>diasDeDesayuno){
        if(confirm('Superaste las comidas necearias,'
        +' quiere sumarla igualmente')){
            ingredientesDeDesayuno.push(nuevoIngredienteDesayuno);
        }
    } else {
        ingredientesDeDesayuno.push(nuevoIngredienteDesayuno);
    }    
    
    imprimirListaIngredientesDeDesayunosYMarchas(ingredientesDeDesayuno);
    console.log(ingredientesDeDesayuno); 
    //console.log(typeof(ingredientesDeDesayuno[0].unidad)) 
    document.getElementById('ingredientesDesayuno').value = ""; 
    //document.getElementById('unidades').value = "";
    //document.getElementById('cantidadIngCenas').value = ""; 
}

//MARCHAS

function saveIngredientesMarchas(){
    if(datosExpeCargados===true){
        var platoNombre = 'Marcha';
        if (segundaCondCargaIngMar()){
            var ingredienteMarchInput = document.getElementById('ingredientesMarchas').value;
            var ingUnidadesMarchInput = document.getElementById('unidadesMarchas').value;
            var ingCantidadMarchInput = document.getElementById('cantidadIngMarchas').value;
            cargarIngDeDesayunos(platoNombre,ingredienteMarchInput,ingUnidadesMarchInput,ingCantidadMarchInput);
        };
    } else {
        condPlatoCargado();
    };
}

var ingredientesDeMarchas = [];
var acumuladoMarchas=0;
function cargarIngDeMarchas(dplato,dingrediente,dunidad,dcantidad){    
    var vecesRepiteMarchas = parseInt(document.getElementById('repiteMarcha').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);   
    acumuladoMarchas+=vecesRepiteMarchas;
    var nuevoIngredienteMarchas = {
        plato : dplato,
        ingrediente : dingrediente,
        unidad : dunidad,
        cantidad : dcantidad,
        subtotal : dcantidad * integ * vecesRepiteMarchas,
        comidasComp : 'NO DATA', //(acumuladoMarchas)+" de "+diasDeMarcha,
        checkDel : false,
    };    
    if (acumuladoMarchas>diasDeMarcha){
        if(confirm('Superaste las comidas necearias,'
         +' quiere sumarla igualmente')){
            ingredientesDeMarchas.push(nuevoIngredienteMarchas);
        }
    } else {
        ingredientesDeMarchas.push(nuevoIngredienteMarchas);
    }    
    
    imprimirListaIngredientesDeDesayunosYMarchas(ingredientesDeMarchas);
    console.log(ingredientesDeMarchas); 
    //console.log(typeof(ingredientesDeMarchas[0].unidad)) 
    document.getElementById('ingredientesMarchas').value = ""; 
    //document.getElementById('unidades').value = "";
    //document.getElementById('cantidadIngCenas').value = ""; 
}

// imprimir lista desayunos y merchas
function imprimirListaIngredientesDeDesayunosYMarchas(lista){
    var listaDeIngredientes = lista //obtenerLista();
    var tbody = document.querySelector("#listaDeIngredientesDesaYMarch tbody");
    tbody.innerHTML = "";
    
    //console.log(typeof(ingredientesDeCenas[0].unidad))

    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`desYMar${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var subtotalCell = row.insertCell(4);
        var ComidasCompCell = row.insertCell(5);
        var checkboxForDelete = row.insertCell(6)
        
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        //console.log(unidadesCell.innerHTML)
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        subtotalCell.innerHTML = listaDeIngredientes[i].subtotal;
        ComidasCompCell.innerHTML = listaDeIngredientes[i].comidasComp;
        checkboxForDelete.append(checkBox);
        //checkboxForDelete.append(`<input type="checkbox" id="cena+${i}" name="cena+${i}">`);
        console.log(i);

        tbody.appendChild(row);               
    }
}

function borrarIngredientesCena(){
    console.log(ingredientesDeCenas)
    var ingCenaBorrar = [];
    var countPlatos = [];
    platosCenas = [];
    comidasComputadas = 0;
    for (i=0; i<ingredientesDeCenas.length;i++){        
        if(!document.getElementById(`cena${i}`).checked){
            ingCenaBorrar.push(ingredientesDeCenas[i])
        };  
    };
    countPlatos = ingCenaBorrar.map(el => {
        return el.plato
    });
    console.log(countPlatos);
    for (i=0; i<ingCenaBorrar.length;i++){        
        if(!platosCenas.includes(countPlatos[i])){
            comidasComputadas += 1
            platosCenas.push(countPlatos[i])
        };
    };
    limpiarIngredientes();
    console.log(ingCenaBorrar);
    console.log(platosCenas);
    ingredientesDeCenas = [...ingCenaBorrar];
    imprimirListaIngredientes(ingredientesDeCenas);
};

function borrarIngredientesDesYMar(){
    console.log(ingredientesDeDesayuno);
    console.log(ingredientesDeMarchas);
    var ingDeDesYMar = ingredientesDeDesayuno.concat([...ingredientesDeMarchas])
    var ingDesYMarBorrar = [];
    var newIngDeDesYMar = [];
    //platosCenas = [];
    //comidasComputadas = 0;
    for (i=0; i<ingDeDesYMar.length;i++){        
        if(!document.getElementById(`desYMar${i}`).checked){
            ingDesYMarBorrar.push(ingDeDesYMar[i])
        };  
    };
    ingredientesDeDesayuno = [];
    ingredientesDeMarchas =[];
    for (i=0; i<ingDesYMarBorrar.length; i++){
        if(ingDesYMarBorrar.plato === "Desayuno") {
            ingredientesDeDesayuno.push(ingDesYMarBorrar[i]);
        } else {
            ingredientesDeMarchas.push(ingDesYMarBorrar[i]);
        };
    };
    limpiarIngredientes();
    console.log(ingDesYMarBorrar); 
    console.log(ingredientesDeDesayuno);
    console.log(ingredientesDeMarchas)   
    imprimirListaIngredientesDeDesayunosYMarchas(ingredientesDeDesayuno);
    imprimirListaIngredientesDeDesayunosYMarchas(ingredientesDeMarchas);
};

