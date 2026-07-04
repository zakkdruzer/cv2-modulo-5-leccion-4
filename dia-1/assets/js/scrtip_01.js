function cb_simple(nombre,edad,fncallback){

    console.log(`funcion principal ejecutada ${nombre},${edad}`);
    
    fncallback();
}

//cb_simple("Juan Pablo",41,()=>console.log('callback Ejecutado'));


function cb_suma(num1,num2,fncallback){
    const total= num1+num2;
    console.log(`suma de  ${num1}+${num2}=${total}`);    
    fncallback(total);
}
let varCualquiera=0;
cb_suma(2,3,(total)=>{ varCualquiera=total*5})

console.log('varCualquiera',varCualquiera);
