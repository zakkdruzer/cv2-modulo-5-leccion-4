class Articulo{
  static #nextId = 1;
  #id; 
  #leido;
  constructor({ titulo, cuerpo, autorId, autorNombre }){
    this.#id         = Articulo.#nextId++;
    this.#leido      = false;
    this.titulo      = titulo;
    this.cuerpo      = cuerpo;
    this.autorId     = autorId;
    this.autorNombre = autorNombre;

  }
  get id()       { return this.#id; }
  get leido()    { return this.#leido; }
  get extracto() { return this.cuerpo.slice(0, 90) + '...'; }
  marcarLeido()  { this.#leido = true; return this; }
}
class Feed {
  #articulos = new Map();
  #autores   = new Set();

  agregar(a) { this.#articulos.set(a.id, a); this.#autores.add(a.autorNombre); return this; }
  buscar(id)  { return this.#articulos.get(id); }

  get todos()   { return [...this.#articulos.values()]; }
  get total()   { return this.#articulos.size; }
  get leidos()  { return this.todos.filter(a => a.leido).length; }
  get autores() { return [...this.#autores]; }
}

const container= document.querySelector("#container");
const feed= new Feed();
document.querySelector("body").style.background="#0f1117";
function render() {
 
  const { total, leidos, autores } = { total: feed.total, leidos: feed.leidos, autores: feed.autores };

container.innerHTML=`
    <style>
      #ah * { box-sizing:border-box; font-family:system-ui,sans-serif; }
      #ah { color:#e2e8f0; }
      #ah .stats { display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
      #ah .stat  { background:#22263a; border:1px solid #2d3149; border-radius:6px;
                   padding:6px 14px; font-size:11px; font-weight:600; }
      #ah .stat b { font-size:17px; display:block; margin-bottom:1px; }
      #ah .card  { background:#1a1d27; border:1px solid #2d3149; border-radius:8px;
                   padding:12px 16px; margin-bottom:8px; }
      #ah .card.leido { opacity:.5; }
      #ah .card-titulo { font-weight:700; font-size:13px; margin-bottom:4px; }
      #ah .card-autor  { font-size:11px; color:#5b8af0; margin-bottom:6px; }
      #ah .card-texto  { font-size:12px; color:#94a3b8; line-height:1.5; margin-bottom:8px; }
      #ah .btn-leer    { font-size:11px; padding:3px 10px; border:1px solid #5b8af0;
                         background:transparent; color:#5b8af0; border-radius:4px; cursor:pointer; }
      #ah .btn-leer:disabled { border-color:#2d3149; color:#4a6650; cursor:default; }
    </style>
    <div id="ah">
      <div class="stats">
        <div class="stat"><b>${total}</b>Artículos</div>
        <div class="stat"><b style="color:#34d399">${leidos}</b>Leídos</div>
        <div class="stat"><b style="color:#a78bfa">${total - leidos}</b>Sin leer</div>
        <div class="stat"><b style="color:#fbbf24">${autores.length}</b>Autores</div>
      </div>
      ${feed.todos.map(a => `
        <div class="card ${a.leido ? 'leido' : ''}">
          <div class="card-titulo">${a.titulo}</div>
          <div class="card-autor">✍ ${a.autorNombre}</div>
          <div class="card-texto">${a.extracto}</div>
          <button class="btn-leer" data-id="${a.id}" ${a.leido ? 'disabled' : ''}>
            ${a.leido ? '✅ Leído' : '▶ Marcar como leído'}
          </button>
        </div>
        `).join('')}
    </div>`;
container.querySelectorAll('.btn-leer:not(:disabled)').forEach(btn =>
    btn.addEventListener('click', () => {
      const art = feed.buscar(Number(btn.dataset.id));
      art?.marcarLeido();
      console.log(`📖 Leído: "${art?.titulo}"`);
      render();
    }));

}

const POSTS_E = [
  { id: 1, userId: 1, title: 'Introducción a las Promesas',          body: 'Las promesas representan el resultado eventual de una operación asíncrona y resuelven el callback hell al anidarse.' },
  { id: 2, userId: 1, title: 'Callback Hell y cómo evitarlo',          body: 'El callback hell ocurre al encadenar callbacks anidados. El código toma forma de pirámide imposible de mantener.' },
  { id: 3, userId: 2, title: 'Promise.all para operaciones en paralelo', body: 'Promise.all lanza múltiples promesas al mismo tiempo y espera que todas terminen, optimizando el tiempo total.' },
  { id: 4, userId: 2, title: 'Map y Set en JavaScript moderno',         body: 'Map y Set son estructuras de datos ES6 con ventajas claras sobre arrays y objetos para casos específicos.' },
  { id: 5, userId: 3, title: 'Clases y herencia en JavaScript',         body: 'La sintaxis class es azúcar sintáctica sobre el sistema de prototipos de JavaScript. Permite OOP elegante.' },
  { id: 6, userId: 3, title: 'Destructuring y spread operator',         body: 'El destructuring permite extraer valores de arrays y objetos. El spread los expande o combina de forma concisa.' },
];
const USERS_E = [
  { id: 1, name: 'Ana García' },
  { id: 2, name: 'Carlos Ruiz' },
  { id: 3, name: 'María López' },
];

const simPosts  = () => new Promise(resolve => setTimeout(() => resolve(POSTS_E), 1500));
const simUsers  = () => new Promise(resolve => setTimeout(() => resolve(USERS_E), 1000));

container.innerHTML = '<p style="color:#94a3b8;font-size:13px;padding:8px">⏳ Cargando ArticleHub...</p>';

Promise.all([simPosts(), simUsers()])
.then(([posts, users]) => {
  const userMap = new Map(users.map(u => [u.id, u.name]));
  posts.forEach(p =>
    feed.agregar(new Articulo({
      titulo:       p.title,
      cuerpo:       p.body,
      autorId:      p.userId,
      autorNombre:  userMap.get(p.userId) || 'Desconocido'
    }))
  );
  console.log(`✅ ${feed.total} artículos cargados. Autores: ${feed.autores.join(', ')}`);
  render();
})
.catch(err => {
  console.log('❌ Error:', err.message);
  preview.innerHTML = `<p style="color:#f87171;font-size:13px;padding:8px">Error: ${err.message}</p>`;
});


