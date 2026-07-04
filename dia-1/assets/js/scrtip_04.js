const buscarUsuario=(id, fnCb)=>{
    console.log(`Buscando usuario #${id}...`);

    setTimeout(()=>{
        if(id<=0){
            fnCb(new Error('El ID debe ser mayor a 0'),null);
            return
        }

        const usuario = { id, nombre: 'Ana García', rol: 'editora' };

        fnCb(null,usuario)
    },1000);
}


buscarUsuario(23,(err,usuario)=>{
    if(err){
        console.error('❌ Error: '+err.message);
    }
    console.log('✓ Usuario encontrado:', usuario.nombre, '(' + usuario.rol + ')');
});

buscarUsuario(0,(err,usuario)=>{
    if(err){
        console.error('❌ Error: '+err.message);
    }
    console.log('✓ Usuario encontrado:', usuario.nombre, '(' + usuario.rol + ')');
});