// htmlLog(saludo) 
const cargarPost=async(id)=>{
    await esperar(1000);
    return { id, titulo: `Post #${id}` };
}
const cargarAutor=async(id)=>{
    await esperar(1300);
    return { id, nombre: 'Ana García' };
}
const cargarStats=async(id)=>{
    await esperar(1700);
    return { vistas: 8450 };
}

const cargarEnFila= async()=>{
    const t0 = Date.now();
    const post= await cargarPost(1);
    const autor= await cargarAutor(7);
    const stats= await cargarStats(1);

    htmlLog(`❌ En fila:   ${Date.now() - t0}ms  (se suman los tiempos)`);
}

const cargarJuntas=async () => {
    const t0 = Date.now();
    const [post,autor,stats]= await Promise.all([
        cargarPost(1),
        cargarAutor(7),
        cargarStats(1)
    ]);
    htmlLog(`✅ En paralelo: ${Date.now() - t0}ms  (solo la más lenta)`)
    htmlLog( post.titulo, '·', autor.nombre, '·', stats.vistas, 'vistas')
}

async function comparar() {
  htmlLog('Comparando 3 cargas independientes de 500ms...\n');
  await cargarEnFila();
  await cargarJuntas();
  htmlLog('\n💡 Si NO dependen entre sí → Promise.all. Ganás ~1 segundo.');
}
comparar();