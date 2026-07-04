const validarContenido = articulo =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (!articulo.titulo.trim()) { reject(new Error('Título vacío')); return; }
      if (articulo.cuerpo.length < 20) { reject(new Error('Contenido muy corto')); return; }
      console.log('✓ Contenido válido');
      resolve({ articulo, validado: true });
    }, 1500));

const revisarPlagio = ctx =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const score = Math.random();
      if (score < 0.05) { reject(new Error('Plagio detectado')); return; }
      console.log(`✓ Sin plagio (score: ${(score * 100).toFixed(0)}%)`);
      resolve({ ...ctx, plagioScore: score });   // spread: agrega al contexto sin mutar
    }, 2000));


const publicar = ctx =>
  new Promise(resolve =>
    setTimeout(() => {
      const publicadoEn = new Date().toLocaleDateString('es-CL');
      console.log('✓ Publicado en', publicadoEn);
      resolve({ ...ctx, publicadoEn, estado: 'publicado' });
    }, 1500));


const notificarAutor = ({ articulo, estado, publicadoEn }) =>  // destructuring en parámetro
  new Promise(resolve =>
    setTimeout(() => {
      console.log(`✓ Notificación enviada al autor #${articulo.autorId}`);
      resolve({ articulo, estado, publicadoEn });
    }, 1000));

const articuloOk = { 
  titulo: 'JavaScript Promesas para principiantes', 
  cuerpo: 'Las promesas resuelven el problema del callback hell de forma elegante...', 
  autorId: 3 
};

const articuloMal = { titulo: '', cuerpo: 'corto', autorId: 5 };


console.log('▶ Publicando artículo válido...');


validarContenido(articuloOk)
.then(revisarPlagio)
.then(publicar)
.then(notificarAutor)
.then(({ articulo }) => console.log(`\n🏁 "${articulo.titulo}" publicado`))
.catch(err => console.log('🚫', err.message));


setTimeout(() => {
  console.log('\n▶ Publicando artículo inválido...');
  validarContenido(articuloMal)
    .then(revisarPlagio)
    .then(publicar)
    .then(notificarAutor)
    .catch(err => console.log('🚫 Fallo en pipeline:', err.message));
}, 9000);
