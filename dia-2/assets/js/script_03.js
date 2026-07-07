// htmlLog(saludo) 

 const procesarPago=async(monto)=>{
    await esperar(1000);// espera un segundo
    if(monto>1000){
        throw new Error("Monto excede el limite de $1.000");        
    }
    return { ok:true, monto, comprobante:`PAGO-${monto}`}
 }
 /*
 function procesarPago(monto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (monto > 1000) { reject(new Error('Monto excede el límite de $1000')); return; }
      resolve({ ok: true, monto, comprobante: 'PAGO-' + monto });
    }, 300);
  });
 
}*/

 const pagar= async (monto)=>{
    htmlLog(`▶ Intentando pagar $${monto}...`);
    try {
        const resp= await procesarPago(monto);
        htmlLog(`✅ Pago exitoso: ${resp.comprobante}`);
    } catch (err) {
        htmlLog(`❌ Error: ${err.message}`)
    }finally{
        htmlLog('🔒 Transacción cerrada (finally SIEMPRE corre)');
    }
}


const demo= async () => {
    await pagar(500); //exitoso
    await pagar(5000); //fallido    
}
demo();