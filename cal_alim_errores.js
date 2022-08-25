

function condPlatoCargado(){
    alert("Carga los dias de expedicion");
    document.getElementById('marchas').focus();
};

function cargaPreviaFalse(){
    if (datosExpeCargados===false && platoCargado===false){
        alert("Carga los dias de expedicion");
        document.getElementById('marchas').focus();        
    } else if (platoCargado===false) {
        alert("carga algun plato")
        document.getElementById('plato').focus();                
    };
};
function reloadNobraYdiasPlato(){
    platoNombre = document.getElementById('plato').value;
    diasPlato = parseInt(document.getElementById('cantidadCenas').value);
}
function existePlato(){
    if(platosCenas.includes(platoNombre)){
        if (confirm("Este plato ya existe. <ACEPTAR> para agregar mas dias de este menu. <CANCEL> para solo agragar mas ingredientes") === true) {
            pushPlato()
            recalcularIngredientes();
            
        } else {
            platoCargado=true;
            buscarYborrarPlatoMenu();
        };
    }else{
        platoCargado=true;
        pushPlato();
    }
    platoCargado=true;
};

function buscarYborrarPlatoMenu(){    
    console.log("plato ya existe ANTES", nuevaTabla);
    console.log("plato ya existe ANTES", tablaPlatosYDias); 
    // var buscar = nuevaTabla.map(el=> el.plato == platoNombre && el.diasRepet == diasPlato)
    // var indiceBuscado = buscar.findIndex(el => el ==true);
    // nuevaTabla.splice(indiceBuscado,1);
    // console.log("plato ya existe", nuevaTabla);     
    tablaPlatosYDias = [...nuevaTabla];
    cargaIngrediente=true;
    comidasComputadas = comidasComputadas //- diasPlato;
}

function condCargarIngredientesPlato() {
    if (platoCargado===true && datosExpeCargados===true
        && document.getElementById('plato').value!="" 
        && document.getElementById('cantidadCenas').value!=""){
        return true;
    } else {        
        cargaPreviaFalse()             
    };
};

function segundaCondCargaIng(){
    var platoNombre = document.getElementById('plato').value;
    var ingredienteInput = document.getElementById('ingredientesCenas').value;
    var ingUnidadesInput = document.getElementById('unidades').value;
    var ingCantidadInput = document.getElementById('cantidadIngCenas').value;

    if (ingredienteInput!='' && ingUnidadesInput!="" && ingCantidadInput>0){
        return true;
    } else {
        alert("Completa los datos del ingrediente");
    };
};
function segundaCondCargaIngDes(){
    var ingredienteDesInput = document.getElementById('ingredientesDesayuno').value;
    var ingUnidadesDesInput = document.getElementById('unidadesDesayuno').value;
    var ingCantidadDesInput = document.getElementById('cantidadIngDesayuno').value;
    if (ingredienteDesInput!='' && ingUnidadesDesInput!="" && ingCantidadDesInput>0){
        return true;
    } else {
        alert("Completa los datos del ingrediente");
    };
};
function segundaCondCargaIngMar(){
    var ingredienteMarchInput = document.getElementById('ingredientesMarchas').value;
    var ingUnidadesMarchInput = document.getElementById('unidadesMarchas').value;
    var ingCantidadMarchInput = document.getElementById('cantidadIngMarchas').value;
    if (ingredienteMarchInput!='' && ingUnidadesMarchInput!="" && ingCantidadMarchInput>0){
        return true;
    } else {
        alert("Completa los datos del ingrediente");
    };
};

