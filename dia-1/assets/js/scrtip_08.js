function cargarPost(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, titulo: `Artículo #${id}`, likes: 42 }), 1500));
}
function cargarAutor(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, nombre: 'Ana García', seguidores: 1200 }), 1700));
}
function cargarStats() {
  return new Promise(resolve =>
    setTimeout(() => resolve({ vistas: 8450, suscriptores: 340 }), 1200));
}
console.log('⏱ Iniciando 3 cargas en paralelo...');
const t0 = Date.now();

Promise.all([
  cargarPost(1),
  cargarAutor(7),
  cargarStats()
]).then(([post, autor, stats])=>{

  const ms = Date.now() - t0;
  console.log(`✅ Todo listo en ${ms}ms (máx de los 3, no la suma)`);
  console.log('Post:', post.titulo, '—', post.likes, 'likes');
  console.log('Autor:', autor.nombre, '—', autor.seguidores, 'seguidores');
  console.log('Stats:', stats.vistas, 'vistas,', stats.suscriptores, 'suscriptores');
})
.catch(err => console.log('❌ Error:', err.message));