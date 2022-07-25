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
// function superoCantComidas(){
//     //comidasComputadas=comidasComputadasFunction(comidasP);
//     if ((comidasComputadas<cenas/integ)
//         &&(diasPlato<cenas/integ)){
//         return true;
//     }else{
//         if(confirm('Supero las comidas necearias, quiere sumarla igualmente')){
//             return true;
//         }
//     }
// }

function condCargarIngredientesPlato() {
    if (platoCargado===true && datosExpeCargados===true){
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

