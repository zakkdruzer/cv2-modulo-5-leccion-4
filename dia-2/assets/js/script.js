document.querySelector("body").style.background = "#0f1117";

class Producto {
    static #nextId = 1;
    #id;
    #precio=0;
    constructor({ nombre, precio, categoria,cantidad }) {
        this.#id = Producto.#nextId++;
        this.nombre = nombre;
        this.#precio = precio;
        this.categoria = categoria;
    }
    get id() { return this.#id; }
    get precio() { return '$' + this.#precio.toLocaleString('es-CL'); }
}
class Carrito {              // el ESTADO vive acá
    #items = new Map();       // id → { producto, cantidad }

    agregar(producto) {
        console.log(JSON.stringify(producto));
        
        const item = this.#items.get(producto.id);
        if (item) {
            item.cantidad++;          // ya estaba → suma cantidad
        } else {
                        
            this.#items.set(producto.id, { producto, cantidad: 1 });
            console.log(this.#items);
            
        }
        return this;
    }
    quitar(id) { this.#items.delete(id); return this; }

    get items() { return [...this.#items.values()]; }
    get cantidad() { return this.items.reduce((s, l) => s + l.cantidad, 0); }
    get total() { return this.items.reduce((s, l) => s + l.producto.precio * l.cantidad, 0); }
}

const simProductos = async () => {
    await esperar(1000);
    return [
        { nombre: 'Teclado mecánico', precio: 45990, categoria: 'Periféricos' },
        { nombre: 'Mouse inalámbrico', precio: 19990, categoria: 'Periféricos' },
        { nombre: 'Monitor 27 pulgadas', precio: 189990, categoria: 'Pantallas' },
        { nombre: 'Audífonos', precio: 34990, categoria: 'Audio' },
        { nombre: 'Webcam HD', precio: 29990, categoria: 'Periféricos' },
        { nombre: 'Parlante Bluetooth', precio: 24990, categoria: 'Audio' },
    ]
}

const simCategorias = async() =>{
     await esperar(1000);
     return ['Periféricos', 'Pantallas', 'Audio'];
}

const container=document.querySelector("#container");
const carrito  = new Carrito();
let productos = [];
let filtro    = 'Todas';


const render=()=>{
    const visibles = filtro === 'Todas' ? productos : productos.filter(p => p.categoria === filtro);
    const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))]; 

    container.innerHTML = `
    <style>
      #shop * { box-sizing:border-box; font-family:system-ui,sans-serif; }
      #shop { color:#e2e8f0; }
      #shop .filtros { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
      #shop .filtro { font-size:11px; padding:4px 12px; border:1px solid #2d3149; background:#22263a; color:#94a3b8; border-radius:20px; cursor:pointer; }
      #shop .filtro.on { background:#a78bfa; color:#000; border-color:#a78bfa; font-weight:700; }
      #shop .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:8px; margin-bottom:14px; }
      #shop .prod { background:#1a1d27; border:1px solid #2d3149; border-radius:8px; padding:10px 12px; }
      #shop .prod-cat { font-size:10px; color:#a78bfa; text-transform:uppercase; letter-spacing:.05em; }
      #shop .prod-nom { font-weight:700; font-size:13px; margin:2px 0; }
      #shop .prod-precio { font-size:14px; color:#34d399; margin-bottom:8px; }
      #shop .btn-add { width:100%; font-size:11px; padding:5px; border:1px solid #a78bfa; background:transparent; color:#a78bfa; border-radius:5px; cursor:pointer; }
      #shop .carrito { background:#22263a; border:1px solid #2d3149; border-radius:8px; padding:12px 14px; }
      #shop .carrito h4 { font-size:12px; margin-bottom:8px; color:#fbbf24; }
      #shop .linea { display:flex; justify-content:space-between; font-size:12px; padding:3px 0; color:#94a3b8; }
      #shop .total { display:flex; justify-content:space-between; font-size:14px; font-weight:700; color:#e2e8f0; margin-top:8px; padding-top:8px; border-top:1px solid #2d3149; }
      #shop .vacio { color:#94a3b8; font-size:12px; }
    </style>
    <div id="shop">
      <div class="filtros">
        ${categorias.map(c => `<button class="filtro ${c === filtro ? 'on' : ''}" data-cat="${c}">${c}</button>`).join('')}
      </div>
      <div class="grid">
        ${visibles.map(p => `
          <div class="prod">
            <div class="prod-cat">${p.categoria}</div>
            <div class="prod-nom">${p.nombre}</div>
            <div class="prod-precio">${p.precioCLP}</div>
            <button class="btn-add" data-id="${p.id}">+ Agregar</button>
          </div>`).join('')}
      </div>
      <div class="carrito">
        <h4>🛒 Carrito (${carrito.cantidad})</h4>
        ${carrito.items.length === 0
          ? '<div class="vacio">Vacío — agrega productos</div>'
          : carrito.items.map(l => `<div class="linea"><span>${l.cantidad}× ${l.producto.nombre}</span><span>$${(Number(l.producto.precio)||0 * l.cantidad).toLocaleString('es-CL')}</span></div>`).join('')
            + `<div class="total"><span>Total</span><span>$${carrito.total.toLocaleString('es-CL')}</span></div>`}
      </div>
    </div>`;

    // Evento: cambiar filtro de categoría (click)
  container.querySelectorAll('.filtro').forEach(b =>
    b.addEventListener('click', () => { filtro = b.dataset.cat; render(); }));


    // Evento: agregar al carrito (click) → actualiza el estado y redibuja
  container.querySelectorAll('.btn-add').forEach(b =>
    b.addEventListener('click', () => {
      const prod = productos.find(p => p.id === Number(b.dataset.id));
      carrito.agregar(prod);
      console.log(`🛒 Agregado: ${prod.nombre} — Total: $${carrito.total.toLocaleString('es-CL')}`);
      render();
    }));
}

const inicia= async () => {
    container.innerHTML = '<p style="color:#94a3b8;font-size:13px;padding:8px">⏳ Cargando tienda...</p>'

    try {
        const [prods, cats] = await Promise.all([simProductos(), simCategorias()]);
        productos = prods.map(p => new Producto(p));
        render();
    } catch (err) {
        console.log('❌ Error al cargar la tienda:', err.message,err);
        container.innerHTML = `<p style="color:#f87171;padding:8px">Error: ${err.message}</p>`;

    }
    

    
}

inicia();


