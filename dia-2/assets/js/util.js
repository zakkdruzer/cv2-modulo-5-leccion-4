function htmlLog(...texto){
console.log(texto);

    if(!texto)throw Error("debes entregar texto");
    const container=document.querySelector("#container");
    
   
    texto.forEach(t=>{
        container.innerHTML+=`<p>${t}</p>`
    });
}

const esperar= (ms)=> new Promise((resolve)=>{
    console.log('esperando');
    
    setTimeout(resolve,ms)
});