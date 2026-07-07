

 async function saludar() {
    //throw new Error("Error");
    
    return 'Hola mundo';
}

/*
saludar()
.then(t=> htmlLog(t))
.catch(t=> htmlLog(t));
*/

 async function main() {
    try{
        const saludo= await saludar();
        htmlLog(saludo)
    }catch(error){
         htmlLog('hubo un error',`${error}`)
    }
    
 }
 main();