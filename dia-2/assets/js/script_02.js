
 // htmlLog(saludo) 

 obtenerUsuario=(id)=>{
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
            if(id<=0){
                reject(new Error("ID inválido"));
                return;
            }
            resolve({id, nombre:'Julio Perez', rol:"Tecnico"});

        },1000);
    });
 }


 ///then 
 function conThen() {
    htmlLog('--- .then()---');
    return obtenerUsuario(5)
        .then(({id,nombre,rol})=>{
             htmlLog(`.then → ${id}:  ${nombre} (${rol})`);
        });    
 }
 

 // con async y await

 const conAwait= async()=>{
    htmlLog('--- cons async/await ---');
    const {id,nombre,rol}= await obtenerUsuario(6);
    htmlLog(`.then → ${id}: ${nombre} (${rol})`);
 }

 async function demo() {
    await conThen();
    await conAwait();
 }

 demo();