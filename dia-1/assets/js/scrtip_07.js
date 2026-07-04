function autenticar(email,pass) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (pass !== '1234') {  
                reject(new Error('Contraseña incorrecta')); 
                return;          
            }
            resolve({id:7,email,token:'tkn-abc123'});
        },1000);
    });
}
function obtenerPerfil(userId) {
     return new Promise(resolve =>
        setTimeout(() => resolve({ nombre: 'Ana García', rol: 'editora' }), 1500));
}
function obtenerPermisos(rol) {
    return new Promise(resolve =>
        setTimeout(() => resolve( { puede: ['leer', 'escribir', 'publicar'] }), 1500));
}
function cargarDashboard(userId) {
    return new Promise(resolve =>
        setTimeout(() => resolve( { articulos: 12, borradores: 3, notificaciones: 5 }), 1500));
}

let _user;


autenticar('ana@blog.com', '1234')
.then((user) =>{
    console.log('✓ Autenticado:', user.email);
    _user=user;
    return obtenerPerfil(user.id); 
})
.then((perfil)=>{
    console.log('✓ Perfil:', perfil.nombre, '(' + perfil.rol + ')');
    return obtenerPermisos(perfil.rol);
})
.then((permisos)=>{
    console.log('✓ Permisos:', permisos.puede.join(', '));
    return cargarDashboard(_user.id);
})
.then((dash) => {
    console.log('✓ Dashboard: ' + dash.articulos + ' artículos');
    console.log('\n🏁 Sesión lista. Código plano, sin pirámide.');
    console.log('   Borradores: ' + dash.borradores + ' | Notif: ' + dash.notificaciones);
  })
.catch(err => {
    // UN solo catch para TODOS los errores de toda la cadena
    console.log('❌ Error en cualquier paso:', err.message);
  });