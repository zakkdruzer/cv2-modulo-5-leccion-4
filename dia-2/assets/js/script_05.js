document.querySelector("body").style.background = "#0f1117";

class Articulo {
    static #nextId = 1;
    #id;
    #leido;
    constructor({ titulo, cuerpo, autorNombre }) {
        this.#id = Articulo.#nextId++;
        this.#leido = false;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.autorNombre = autorNombre;
    }
    get id() { return this.#id; }
    get leido() { return this.#leido; }
    get extracto() { return this.cuerpo.slice(0, 90) + '...'; }
    marcarLeido() { this.#leido = true; return this; }

}

class Feed {
    #articulos = new Map();
    #autores = new Set();

    agregar(a) {
        this.#articulos.set(a.id, a);
        this.#autores.add(a.autorNombre);
        return this;
    }
    buscar(id) { return this.#articulos.get(id); }
    get todos() { return [...this.#articulos.values()]; }
    get total() { return this.#articulos.size; }
    get leidos() { return this.todos.filter(a => a.leido).length; }
    get autores() { return [...this.#autores]; }
}

const simPosts = async () => {
    await esperar(1000);
    return [
        { id: 1, userId: 1, title: 'Introducción a async/await', body: 'async/await es azúcar sobre las promesas que permite escribir código asíncrono como si fuera síncrono.' },
        { id: 2, userId: 1, title: 'Callback Hell y cómo evitarlo', body: 'El callback hell aparece al anidar callbacks. Las promesas y async/await lo resuelven aplanando el código.' },
        { id: 3, userId: 2, title: 'Promise.all para cargas en paralelo', body: 'Promise.all lanza varias promesas a la vez y espera a todas, reduciendo el tiempo total de espera.' },
        { id: 4, userId: 2, title: 'Map y Set en JavaScript moderno', body: 'Map y Set son estructuras ES6 con ventajas claras sobre arrays y objetos para búsquedas y unicidad.' },
        { id: 5, userId: 3, title: 'try/catch con async/await', body: 'Con async/await los errores se manejan con el try/catch de siempre, en lugar de encadenar .catch().' },
        { id: 6, userId: 3, title: 'Clases y campos privados', body: 'Los campos privados con # encapsulan el estado interno de una clase y evitan accesos indebidos.' },
    ]
}
const simUsers = async () => {
    await esperar(1000);
    return [
        { id: 1, name: 'Ana García' },
        { id: 2, name: 'Carlos Ruiz' },
        { id: 3, name: 'María López' },
    ];
}

const container=document.querySelector("#container");
const feed    = new Feed();
const render= (filtro = '')=>{
    const f = filtro.toLowerCase();
    const visibles = feed.todos.filter(a => a.titulo.toLowerCase().includes(f));
    container.innerHTML = `
    <style>
      #ah * { box-sizing:border-box; font-family:system-ui,sans-serif; }
      #ah { color:#e2e8f0; }
      #ah .stats { display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
      #ah .stat  { background:#22263a; border:1px solid #2d3149; border-radius:6px; padding:6px 14px; font-size:11px; font-weight:600; }
      #ah .stat b { font-size:17px; display:block; }
      #ah input  { width:100%; padding:8px 12px; margin-bottom:12px; background:#0f1117; border:1px solid #2d3149; border-radius:6px; color:#e2e8f0; font-size:13px; }
      #ah .card  { background:#1a1d27; border:1px solid #2d3149; border-radius:8px; padding:12px 16px; margin-bottom:8px; }
      #ah .card.leido { opacity:.5; }
      #ah .card-titulo { font-weight:700; font-size:13px; margin-bottom:4px; }
      #ah .card-autor  { font-size:11px; color:#a78bfa; margin-bottom:6px; }
      #ah .card-texto  { font-size:12px; color:#94a3b8; line-height:1.5; margin-bottom:8px; }
      #ah .btn-leer    { font-size:11px; padding:3px 10px; border:1px solid #a78bfa; background:transparent; color:#a78bfa; border-radius:4px; cursor:pointer; }
      #ah .btn-leer:disabled { border-color:#2d3149; color:#4a6650; cursor:default; }
      #ah .vacio { color:#94a3b8; font-size:12px; padding:8px; }
    </style>
    <div id="ah">
      <div class="stats">
        <div class="stat"><b>${feed.total}</b>Artículos</div>
        <div class="stat"><b style="color:#34d399">${feed.leidos}</b>Leídos</div>
        <div class="stat"><b style="color:#a78bfa">${feed.total - feed.leidos}</b>Sin leer</div>
        <div class="stat"><b style="color:#fbbf24">${feed.autores.length}</b>Autores</div>
      </div>
      <input id="buscador" placeholder="🔎 Buscar por título..." value="${filtro}">
      ${visibles.length === 0
        ? '<div class="vacio">Sin resultados para esa búsqueda</div>'
        : visibles.map(a => `
        <div class="card ${a.leido ? 'leido' : ''}">
          <div class="card-titulo">${a.titulo}</div>
          <div class="card-autor">✍ ${a.autorNombre}</div>
          <div class="card-texto">${a.extracto}</div>
          <button class="btn-leer" data-id="${a.id}" ${a.leido ? 'disabled' : ''}>
            ${a.leido ? '✅ Leído' : '▶ Marcar como leído'}
          </button>
        </div>`).join('')}
    </div>`;

  const input= container.querySelector('#buscador');
  input.addEventListener('input', e => render(e.target.value));
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);

  container.querySelectorAll('.btn-leer:not(:disabled)').forEach(btn =>
  btn.addEventListener('click', () => {
      const art = feed.buscar(Number(btn.dataset.id));
      art?.marcarLeido();
      console.log(`📖 Leído: "${art?.titulo}"`);
      render(filtro);
  }));


}


const iniciar= async()=>{
    container.innerHTML = '<p style="color:#94a3b8;font-size:13px;padding:8px">⏳ Cargando ArticleHub...</p>';

    try {
        const t0 = Date.now();
        const [posts, users] = await Promise.all([simPosts(), simUsers()]);
        const userMap= new Map(users.map(u => [u.id, u.name]));
        
        posts.forEach(p => feed.agregar(new Articulo({
            titulo: p.title,
            cuerpo: p.body,
            autorNombre: userMap.get(p.userId) || 'Desconocido'
        })));
       console.log(`✅ ${feed.total} artículos cargados en ${Date.now() - t0}ms (en paralelo)`);
       console.log('Autores:', feed.autores.join(', '));
       render();

    } catch (error) {
        console.log('❌ Error al cargar:', error.message);
        container.innerHTML = `<p style="color:#f87171;padding:8px">Error: ${error.message}</p>`;
    }
}

iniciar();