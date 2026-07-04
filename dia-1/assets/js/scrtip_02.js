function buscaEngoogle(text,funCallback) {
    setTimeout(()=>{
        let resultadoBusqueda="Lorem ipsum dolo";
        console.log("resultadoGoogle",resultadoBusqueda);
        funCallback(resultadoBusqueda)
    },2000);
}



console.log("Iniciando la ejecucion del programa");
console.log("proceso 1");
buscaEngoogle("rere",(rsl)=>console.log("procesando resultado",rsl));
console.log("proceso 2");
console.log("Proceso 3");



