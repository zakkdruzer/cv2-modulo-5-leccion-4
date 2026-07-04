

function autenticar(email,pass,fnCb){
    setTimeout(()=>{
        if(pass!== '1234'){
            fnCb(new Error("Contraseña incorrecta"),null);
            return;
        }
        fnCb(null,{id:7,email,token:'tkn-abc123'});
    },1500)
}

function obtenerPerfil(userId,fnCb) {
    setTimeout(()=>{
        fnCb(null, {nombre:"Ana Garcia",rol:"Editora",confId:"cfg-145"});
    },1000);
}
function obtenerPermisos(rol,fnCb) {
    setTimeout(() => {
        fnCb(null, { puede: ['leer', 'escribir', 'publicar'] });
    }, 2000);
}

function cargarDashboard(userId,fnCb) {
    setTimeout(() => {
    fnCb(null, { articulos: 12, borradores: 3, notificaciones: 5 });
  }, 1500);
}

// 😱 CALLBACK HELL ────────────────────────────────────────────────
autenticar('ana@blog.com','1234',(err,user)=>{
    if(err){ console.error('❌', err.message); return;}
    console.log('✓ Autenticado:', user.email);
    obtenerPerfil(user.id,(err,perfil)=>{
        if (err) { console.log('❌', err.message); return; }
        console.log('✓ Perfil:', perfil.nombre, '(' + perfil.rol + ')');
        obtenerPermisos(perfil.rol,(err,permisos)=> {
            if (err) { console.log('❌', err.message); return; } 
            console.log('✓ Permisos:', permisos.puede.join(', '));
            cargarDashboard(user.id,(err,dash)=>{
                if (err) { console.log('❌', err.message); return; }
                console.log('✓ Dashboard: ' + dash.articulos + ' artículos');
                console.log('\n🏁 Sesión lista. Bienvenida, ' + perfil.nombre + '!');
                console.log('   Borradores: ' + dash.borradores + ' | Notif: ' + dash.notificaciones);
            });
        });
    });
});