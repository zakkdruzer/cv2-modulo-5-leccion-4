const promesaExitosa = new Promise((resolve, reject) => {
  setTimeout(() => {
    const dato = { id: 1, mensaje: 'Operación completada' };
    resolve(dato);    // ← pasa al .then()
  }, 1000);
});

const promesaFallida = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Algo salió mal'));  // ← salta al .catch()
  }, 1500);
});

promesaExitosa
.then((rslt)=>console.log(rslt))
.catch();

promesaFallida
  .then(resultado => {
    console.log('Esto NUNCA se ejecuta si la promise fue rechazada');
  })
  .catch(err => console.log('❌ Capturado en catch:', err.message));


