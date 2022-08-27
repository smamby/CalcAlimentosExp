//const { CANCELLED } = require("dns");


function condPlatoCargado(){    
    swal.fire({
        title: "Carga los dias de expedicion",
        didClose: () => {            
            focus('marchas')
        } 
    });
};

function cargaPreviaFalse(){
    if (datosExpeCargados===false && platoCargado===false){
        swal.fire({
            title: "Carga los dias de expedicion",
            didClose: () => {            
                focus('marchas')
            } 
        });        
    } else if (platoCargado===false) {        
        swal.fire({
            title: "Carga algun plato",
            didClose: () => {            
                focus('plato')
            } 
        });                
    };
};
function reloadNobraYdiasPlato(){
    platoNombre = document.getElementById('plato').value;
    diasPlato = parseInt(document.getElementById('cantidadCenas').value);
}

function retornarVerdadero() {
    return true;
}
function exitePlatoONo(){
    conf("Este plato ya existe",
    "<CONFIRMAR> para agregar mas dias de este menu."+ 
    "<CANCELAR> para solo agragar mas ingredientes",
    retornarVerdadero())
}
function existePlato(){
    if(platosCenas.includes(platoNombre)){
        sweet();
    }else{
        platoCargado=true;
        pushPlato();
    }
    platoCargado=true;
};
function sweet(){
    Swal.fire({
        title: "Este plato ya existe",
        text: "<CONFIRMAR> para agregar mas dias de este menu."+ 
        "<CANCELAR> para solo agragar mas ingredientes",
        icon: 'info',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonColor: 'rgb(164, 149, 216)',
        denyButtonColor: 'rgb(190, 50, 50)',
        confirmButtonText: 'Confirmar',
        didClose: () => {
            focus('ingredientesCenas')
        }           
    }).then((response) => {
        if(response.isConfirmed){
            pushPlato();
            recalcularIngredientes()
            platoCargado=true; 
            cargaIngrediente=false;           
            swal.fire({
                title: `Se aumento la cantidad de veces que repite el menu ${tempPNombre} a ${tempDiasPlato} veces`,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }) 
        } else if (response.isDenied) {
            swal.fire({
                title: `Continua ingresando ingrediantes para el plato: ${platoNombre}`,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }) 
            platoCargado=true;
            buscarYborrarPlatoMenu();
        } else {
            swal.fire({
                title: `Continua ingresando ingrediantes para el plato: ${platoNombre}`,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }) 
            platoCargado=true;
            buscarYborrarPlatoMenu();
        }
    })
}

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
        wal.fire({
            title: "Completa los datos del ingrediente",
            didClose: () => {            
                focus("ingredientesCenas")
            } 
        });        
    };
};
function segundaCondCargaIngDes(){
    var ingredienteDesInput = document.getElementById('ingredientesDesayuno').value;
    var ingUnidadesDesInput = document.getElementById('unidadesDesayuno').value;
    var ingCantidadDesInput = document.getElementById('cantidadIngDesayuno').value;
    if (ingredienteDesInput!='' && ingUnidadesDesInput!="" && ingCantidadDesInput>0){
        return true;
    } else {
        wal.fire({
            title: "Completa los datos del ingrediente",
            didClose: () => {            
                focus("ingredientesCenas")
            } 
        });
    };
};
function segundaCondCargaIngMar(){
    var ingredienteMarchInput = document.getElementById('ingredientesMarchas').value;
    var ingUnidadesMarchInput = document.getElementById('unidadesMarchas').value;
    var ingCantidadMarchInput = document.getElementById('cantidadIngMarchas').value;
    if (ingredienteMarchInput!='' && ingUnidadesMarchInput!="" && ingCantidadMarchInput>0){
        return true;
    } else {
        wal.fire({
            title: "Completa los datos del ingrediente",
            didClose: () => {            
                focus("ingredientesCenas")
            } 
        });
    };
};
function focus(id){
    document.getElementById(id).focus();
}
function conf(titulo,texto,func){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'info',
        //closeModal: false,
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonColor: 'rgb(164, 149, 216)',
        denyButtonColor: 'rgb(190, 50, 50)',
        confirmButtonText: 'Confirmar',        
                   
    })
    .then((result) => {
        if (result.isConfirmed) {
            func()            
            swal.fire({
                timer: 1,
                didClose: () => {            
                    focus("plato")
                } 
            })             
        } else if (result.isDenied) {
            swal.fire({
                timer: 1,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            })           
        } else {
            swal.fire({
                timer: 1,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            })           
        }    
    })  
        
}


