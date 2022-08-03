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

var integrantes = document.getElementById('integrantes').value;
var integ = parseInt(integrantes);
var cenas;
var platosCenas = [];
var cantPlatosCena;
var comidasComputadas=0;
var diasDeDesayuno=0;
var diasDeMarcha=0;
var cargaIngrediente=true;
var platoCargado=false;
var comidasP =[];


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
                // if((comidasComputadas<cenas/integ)
                // &&(diasPlato<cenas/integ)){
                    platosCenas.push(platoNombre);   
                    var conteoPlatoP={};             
                    conteoPlatoP={plato:platoNombre,diasRepet:diasPlato,};
                    comidasP.push(conteoPlatoP); 
                    console.log("comidasP",comidasP);
                    //var cantidadPlato = diasPlato * integ;    
                    console.log("platosNombre",platoNombre);
                    console.log("platosCenas",platosCenas);
                    comidasComputadas += diasPlato;                
                    //comidasComputadas=comidasComputadasFunction(comidasP);
                    console.log("var comidaComputadas",comidasComputadas);
                    platoCargado=true;
                //};  
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
    //comidasComputadas=comidasComputadasFunction(comidasP)
    imprimirMenu(tablaPlatosYDias)//platosCenas);  
};

function saveIngredientes(){
    if(condCargarIngredientesPlato()){
        cargaIngrediente=true;
        if(segundaCondCargaIng()){
            var platoNombre = document.getElementById('plato').value;
            var ingredienteInput = document.getElementById('ingredientesCenas').value;
            var ingUnidadesInput = document.getElementById('unidades').value;
            var ingCantidadInput = document.getElementById('cantidadIngCenas').value;
            var clasifIngCenaInput = document.getElementById('clasificacionIngCenas').value;
            cargarIngDeCena(platoNombre,ingredienteInput,ingUnidadesInput,ingCantidadInput,clasifIngCenaInput);
        };
    };
};

var ingredientesDeCenas = [];

function cargarIngDeCena(iplato,iingrediente,iunidad,icantidad,iclasifIngCenas){    
    var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);    
    comidasComputadas;
    var nuevoIngrediente = {
        plato : iplato,
        ingrediente : iingrediente,
        clasificacion: iclasifIngCenas,
        unidad : iunidad,
        diasRepet: diasPlato,
        cantidad : icantidad,
        subtotal : icantidad * integ * diasPlato,
        comidasComp : (comidasComputadas)+" de "+cenas/integ,
        //checkDel : false,
    };
    // if (comidasComputadas>(cenas/integ)){
    //     if(confirm('Supero las comidas necearias, quiere sumarla igualmente')){
    //         ingredientesDeCenas.push(nuevoIngrediente);
    //     }else{
    //         platosCenas.pop();
    //         comidasComputadas -= diasPlato;
    //     };
    // } else {
    ingredientesDeCenas.push(nuevoIngrediente);
    // }
    //ingredientesDeCenas.push(nuevoIngrediente); // arreglar error de logica
    imprimirListaIngredientes(ingredientesDeCenas);
    console.log("ingredientesDeCenas",ingredientesDeCenas); 
    //console.log(typeof(ingredientesDeCenas[0].unidad)) 
    document.getElementById('ingredientesCenas').value = ""; 
    //document.getElementById('unidades').value = "";
    //document.getElementById('cantidadIngCenas').value = ""; 
}

console.log("platosCenas",platosCenas) 

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
        var checkboxForDelete = row.insertCell(6);
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        //console.log(unidadesCell.innerHTML)
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        subtotalCell.innerHTML = listaDeIngredientes[i].subtotal;
        ComidasCompCell.innerHTML = listaDeIngredientes[i].comidasComp;
        checkboxForDelete.appendChild(checkBox);

        tbody.appendChild(row);                     
    };
};
var tablaPlatosYDias=[];
function imprimirMenu(lista){
    var menu = lista;
    var tBodyMenu = document.querySelector("#tabMenu tbody");
    var platoNombre = document.getElementById('plato').value;
    var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
    var integrantes = document.getElementById('integrantes').value;
    //var tablaPlatosYDias=[];
    if (!isNaN(diasPlato)&&platoNombre!=""){
        var platosYDias = {
            plato : platoNombre,
            diasRepet : diasPlato,
        };
        tablaPlatosYDias.push(platosYDias);
        console.log("tabladiasYPlatos-luego de borrar",tablaPlatosYDias); 
    };
    tBodyMenu.innerHTML = "";
    for (i=0; i<menu.length; i++) {        
        console.log("menu[i]",menu[i]);
        console.log("menu",menu);
        console.log("tablaPlatosYDias",tablaPlatosYDias);
        var row = tBodyMenu.insertRow(i)
        var platoMenuCell = row.insertCell(0);
        var diasMenu = row.insertCell(1);
        var porcionesMenu = row.insertCell(2);
        platoMenuCell.innerHTML = tablaPlatosYDias[i].plato;
        diasMenu.innerHTML = tablaPlatosYDias[i].diasRepet;
        porcionesMenu.innerHTML = tablaPlatosYDias[i].diasRepet*integrantes;
        tBodyMenu.appendChild(row);
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
function limpiarPlatoInput(){
    document.getElementById('plato').value = "";
    document.getElementById('cantidadCenas').value = "";
}

/// DESAYUNOS

function saveIngredientesDesayuno(){
    if(datosExpeCargados===true){
        var platoNombre = 'Desayuno';
        if (segundaCondCargaIngDes()){
            var ingredienteDesInput = document.getElementById('ingredientesDesayuno').value;
            var ingUnidadesDesInput = document.getElementById('unidadesDesayuno').value;
            var ingCantidadDesInput = document.getElementById('cantidadIngDesayuno').value;
            var clasifIngDesInput = document.getElementById('clasificacionIngDes').value;
            cargarIngDeDesayunos(platoNombre,ingredienteDesInput,ingUnidadesDesInput,ingCantidadDesInput,clasifIngDesInput);
        };
    } else {
        condPlatoCargado()
    };
};

var ingredientesDeDesayuno = [];
var acumuladoDesayuno=0;
function cargarIngDeDesayunos(dplato,dingrediente,dunidad,dcantidad,dclasifIngCenas){    
    var vecesRepiteDesayuno = parseInt(document.getElementById('repiteDesayuno').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);   
    acumuladoDesayuno+=vecesRepiteDesayuno;
    var nuevoIngredienteDesayuno = {
        plato : dplato,
        ingrediente : dingrediente,
        clasificacion: dclasifIngCenas,
        unidad : dunidad,
        diasRepet: vecesRepiteDesayuno,
        cantidad : dcantidad,
        subtotal : dcantidad * integ * vecesRepiteDesayuno,
        comidasComp : 'NO DATA',//(acumuladoDesayuno)+" de "+diasDeDesayuno,
        //checkDel : false,
    };    
    // if (acumuladoDesayuno>diasDeDesayuno){
    //     if(confirm('Superaste las comidas necearias,'
    //     +' quiere sumarla igualmente')){
    //         ingredientesDeDesayuno.push(nuevoIngredienteDesayuno);
    //     };
    // } else {
        ingredientesDeDesayuno.push(nuevoIngredienteDesayuno);
    //};    
    imprimirListaIngredientesDeDesayunos(ingredientesDeDesayuno);
    console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);      
    document.getElementById('ingredientesDesayuno').value = "";     
};

// imprimir lista desayunos 
function imprimirListaIngredientesDeDesayunos(lista){
    var listaDeIngredientes = lista //obtenerLista();
    var tbody = document.querySelector("#listaDeIngredientesDesayunos tbody");
    tbody.innerHTML = "";
    
    //console.log(typeof(ingredientesDeCenas[0].unidad))

    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`desayunos${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var subtotalCell = row.insertCell(4);
        //var ComidasCompCell = row.insertCell(5);
        var checkboxForDelete = row.insertCell(5)
        
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        //console.log(unidadesCell.innerHTML)
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        subtotalCell.innerHTML = listaDeIngredientes[i].subtotal;
        //ComidasCompCell.innerHTML = listaDeIngredientes[i].comidasComp;
        checkboxForDelete.append(checkBox);
        //checkboxForDelete.append(`<input type="checkbox" id="cena+${i}" name="cena+${i}">`);
        console.log("i",i);

        tbody.appendChild(row);               
    };
};

function borrarIngredientesDesayunos(){
    console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);
    //console.log("ingredientesDeMarchas",ingredientesDeMarchas);
    var ingDeDesayunos = ingredientesDeDesayuno;
    var ingDesayunosBorrar = [];
    var newIngDeDesYMar = [];
    //platosCenas = [];
    //comidasComputadas = 0;
    for (i=0; i<ingDeDesayunos.length;i++){        
        if(!document.getElementById(`desayunos${i}`).checked){
            ingDesayunosBorrar.push(ingDeDesayunos[i]);
        };  
    };
    ingredientesDeDesayuno = [];
    //ingredientesDeMarchas =[];
    for (i=0; i<ingDesayunosBorrar.length; i++){
    //     if(ingDesayunosBorrar.plato === "Desayuno") {
            ingredientesDeDesayuno.push(ingDesayunosBorrar[i]);
    //     } else {
    //         ingredientesDeMarchas.push(ingDesayunosBorrar[i]);
    //     };
    };
    limpiarIngredientes();
    console.log("ingDesayunosBorrar",ingDesayunosBorrar); 
    console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);
    //console.log("ingredientesDeMarchas",ingredientesDeMarchas)   
    imprimirListaIngredientesDeDesayunos(ingredientesDeDesayuno);
    //imprimirListaIngredientesDeMarchas(ingredientesDeMarchas);
};

//MARCHAS

function saveIngredientesMarchas(){
    if(datosExpeCargados===true){
        var platoNombre = 'Marcha';
        if (segundaCondCargaIngMar()){
            var ingredienteMarchInput = document.getElementById('ingredientesMarchas').value;
            var ingUnidadesMarchInput = document.getElementById('unidadesMarchas').value;
            var ingCantidadMarchInput = document.getElementById('cantidadIngMarchas').value;
            var clasifIngMarchInput = document.getElementById('clasificacionIngMarchas').value;
            cargarIngDeMarchas(platoNombre,ingredienteMarchInput,ingUnidadesMarchInput,ingCantidadMarchInput,clasifIngMarchInput);
        };
    } else {
        condPlatoCargado();
    };
};

var ingredientesDeMarchas = [];
var acumuladoMarchas=0;
function cargarIngDeMarchas(dplato,dingrediente,dunidad,dcantidad,dclasifIngCenas){    
    var vecesRepiteMarchas = parseInt(document.getElementById('repiteMarcha').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);   
    acumuladoMarchas+=vecesRepiteMarchas;
    var nuevoIngredienteMarchas = {
        plato : dplato,
        ingrediente : dingrediente,
        clasificacion: dclasifIngCenas,
        diasRepet: vecesRepiteMarchas,
        unidad : dunidad,
        cantidad : dcantidad,
        subtotal : dcantidad * integ * vecesRepiteMarchas,
        //comidasComp : 'NO DATA', //(acumuladoMarchas)+" de "+diasDeMarcha,
        //checkDel : false,
    };    
    // if (acumuladoMarchas>diasDeMarcha){
    //     if(confirm('Superaste las comidas necearias,'
    //      +' quiere sumarla igualmente')){
    //         ingredientesDeMarchas.push(nuevoIngredienteMarchas);
    //     };
    // } else {
         ingredientesDeMarchas.push(nuevoIngredienteMarchas);
    // };  
    
    imprimirListaIngredientesDeMarchas(ingredientesDeMarchas);
    console.log("ingredientesDeMarchas",ingredientesDeMarchas); 
    //console.log(typeof(ingredientesDeMarchas[0].unidad)) 
    document.getElementById('ingredientesMarchas').value = ""; 
    //document.getElementById('unidades').value = "";
    //document.getElementById('cantidadIngCenas').value = ""; 
};


// imprimir lista marchas
function imprimirListaIngredientesDeMarchas(lista){
    var listaDeIngredientes = lista //obtenerLista();
    var tbody = document.querySelector("#listaDeIngredientesMarchas tbody");
    tbody.innerHTML = "";
    
    //console.log(typeof(ingredientesDeCenas[0].unidad))

    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`marchas${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var subtotalCell = row.insertCell(4);
        //var ComidasCompCell = row.insertCell(5);
        var checkboxForDelete = row.insertCell(5)
        
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        //console.log(unidadesCell.innerHTML)
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        subtotalCell.innerHTML = listaDeIngredientes[i].subtotal;
        //ComidasCompCell.innerHTML = listaDeIngredientes[i].comidasComp;
        checkboxForDelete.append(checkBox);
        //checkboxForDelete.append(`<input type="checkbox" id="cena+${i}" name="cena+${i}">`);
        console.log("i",i);

        tbody.appendChild(row);               
    };
};

function borrarIngredientesMarchas(){
    //console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);
    console.log("ingredientesDeMarchas",ingredientesDeMarchas);
    var ingDeMarchas = ingredientesDeMarchas;
    var ingMarchasBorrar = [];
    var newIngDeMarchas = [];
    //platosCenas = [];
    //comidasComputadas = 0;
    for (i=0; i<ingDeMarchas.length;i++){        
        if(!document.getElementById(`marchas${i}`).checked){
            ingMarchasBorrar.push(ingDeMarchas[i]);
        };  
    };
    //ingredientesDeDesayuno = [];
    ingredientesDeMarchas =[];
    for (i=0; i<ingMarchasBorrar.length; i++){
    //     if(ingMarchasBorrar.plato === "Desayuno") {
    //         ingredientesDeDesayuno.push(ingMarchasBorrar[i]);
    //     } else {
            ingredientesDeMarchas.push(ingMarchasBorrar[i]);
    //     };
    };
    limpiarIngredientes();
    console.log("ingMarchasBorrar",ingMarchasBorrar); 
    //console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);
    console.log("ingredientesDeMarchas",ingredientesDeMarchas)   
    //imprimirListaIngredientesDeDesayunos(ingredientesDeDesayuno);
    imprimirListaIngredientesDeMarchas(ingredientesDeMarchas);
};

//  BORRADO
var menuLuegoBorrar = []
function borrarIngredientesCena(){
    menuLuegoBorrar.length = 0;
    console.log("ingredientesCena",ingredientesDeCenas);
    var ingCenaBorrar = [];
    var countPlatos = [];
    ;
    //platosCenas = [];
    //comidasComputadas = 0;    
    for (i=0; i<ingredientesDeCenas.length;i++){        
        if(!document.getElementById(`cena${i}`).checked){
            ingCenaBorrar.push(ingredientesDeCenas[i]);
        };  
    };
    //----------------------------
    countPlatos = ingCenaBorrar.map(el => {
        return el.plato;
    });
    //------------------------
    console.log('countPlatos',countPlatos);
    var comCompParcial = 0;
    var conteoPlatosBorrados = [];
    for (i=0; i<countPlatos.length;i++){        
        if(conteoPlatosBorrados.includes(countPlatos[i])){            
            ingCenaBorrar[i].comidasComp= comCompParcial+" de "+cenas/integ;
        }else { 
            //comidasComputadas += 1;                       
            var platosMenuLuegoDeBorrar = {
                plato:countPlatos[i],
                diasRepet:ingCenaBorrar[i].diasRepet,
            };
            conteoPlatosBorrados.push(countPlatos[i])
            console.log("conteoPlatosBorrados",conteoPlatosBorrados)          
            comCompParcial += ingCenaBorrar[i].diasRepet;
            menuLuegoBorrar.push(platosMenuLuegoDeBorrar);
            var integrantes = document.getElementById('integrantes').value;
            var integ = parseInt(integrantes);             
            ingCenaBorrar[i].comidasComp= comCompParcial+" de "+cenas/integ;            
        };
    };
    comidasComputadas = comCompParcial;
    platosCenas = menuLuegoBorrar.map(el => el.plato);
    limpiarIngredientes();    
    ingredientesDeCenas = [...ingCenaBorrar];
    imprimirListaIngredientes(ingredientesDeCenas);
    console.log("menuLuegoBorrar",menuLuegoBorrar);
    limpiarPlatoInput();
    tablaPlatosYDias = [...menuLuegoBorrar];
    imprimirMenu(tablaPlatosYDias);
};



//compilar listas
console.log('cenas',ingredientesDeCenas);
console.log('des',ingredientesDeDesayuno);
console.log('march',ingredientesDeMarchas);
//var concatListasDesYMarch;

//GUARDAR LISTA
function guardar(lista,nombreLista){
    localStorage.setItem(nombreLista, JSON.stringify(lista));
};
var cargarListaCena = []; //solo para testeo y debbug
var cargarListaDesayunos = [];
var cargarListaMarchas = [];
var guardarDataExpe = [];
var cargarListaMenu = [];

function guardarDatosExpe(dM,dD,int){
    guardarDataExpe.splice(0,guardarDataExpe.length);
    guardarDataExpe.push(dM)
    guardarDataExpe.push(dD)
    guardarDataExpe.push(int);
    console.log(guardarDataExpe)
}
//guardarDatosExpe(diasMarcha,diasDescanso,integrantes);
function guardarTodo(){
    guardarDatosExpe(diasMarcha,diasDescanso,integrantes);
    guardar(guardarDataExpe, "dataExpe");
    guardar(ingredientesDeCenas,"cenas");    
    guardar(ingredientesDeDesayuno,"desayunos");
    guardar(ingredientesDeMarchas, "marchas");    
    guardar(tablaPlatosYDias,"tablaMenu");
}
function cargarMenu(){
    cargarListaMenu = JSON.parse(localStorage.getItem("tablaMenu"));
    console.log("cargarListaMenu",cargarListaMenu);
    tablaPlatosYDias =[...cargarListaMenu];
    imprimirMenu(cargarListaMenu);    
}
function cargarCena(){
    cargarListaCena = JSON.parse(localStorage.getItem("cenas"));
    console.log(cargarListaCena);
    imprimirListaIngredientes(cargarListaCena);
    ingredientesDeCenas =[...cargarListaCena];
};
function cargarDesayuno(){
    cargarListaDesayunos = JSON.parse(localStorage.getItem("desayunos"));
    console.log(cargarListaDesayunos);
    imprimirListaIngredientesDeDesayunos(cargarListaDesayunos);
    ingredientesDeDesayuno = [...cargarListaDesayunos];
};
function cargarMarchas(){
    cargarListaMarchas = JSON.parse(localStorage.getItem("marchas"));
    console.log(cargarListaMarchas);
    imprimirListaIngredientesDeMarchas(cargarListaMarchas);
    ingredientesDeMarchas = [...cargarListaMarchas]
};
function cargarDataExpe(){
    guardarDataExpe = JSON.parse(localStorage.getItem("dataExpe"));
    console.log(guardarDataExpe);
    document.getElementById('marchas').value = guardarDataExpe[0];
    document.getElementById('descanso').value = guardarDataExpe[1];
    document.getElementById('integrantes').value = guardarDataExpe[2];
    arranque();
}
function cargarTodo(){
    cargarDataExpe();
    cargarCena();
    cargarDesayuno();
    cargarMarchas();    
    cargarMenu();
}

///FALTA CARGAR DATOS EXPEDICION
/// SEPARAR LISTAS DESAYUNOS Y MARCHAS
/// DISIGNAR LAS LISTAS ORIGINALES CON EL VALOR DE LAS LISTAS CARGADAS