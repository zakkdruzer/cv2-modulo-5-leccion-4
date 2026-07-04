const POSTS_D = [
  { id: 1, userId: 1, title: 'Introducción a las Promesas' },
  { id: 2, userId: 1, title: 'Callback Hell y cómo evitarlo' },
  { id: 3, userId: 2, title: 'Promise.all para cargas en paralelo' },
  { id: 4, userId: 2, title: 'Map y Set en JavaScript moderno' },
  { id: 5, userId: 3, title: 'Clases y herencia en JavaScript' },
];
const USERS_D = [
  { id: 1, name: 'Ana García' },
  { id: 2, name: 'Carlos Ruiz' },
  { id: 3, name: 'María López' },
];
function obtenerPosts(limit) {
  return new Promise(resolve => setTimeout(() => resolve(POSTS_D.slice(0, limit)), 1000));
}
function obtenerUsuarios() {
  return new Promise(resolve => setTimeout(() => resolve(USERS_D), 1500));
}
console.log('⏱ Lanzando posts y usuarios en paralelo...');
const t0 = Date.now();
Promise.all([
  obtenerPosts(5),
  obtenerUsuarios()
])
.then(([posts, users]) => {
  console.log(`✅ Listo en ${Date.now() - t0}ms `);


  const userMap = new Map(users.map(u => [u.id, u.name]));

  console.log('\nPosts con su autor:');
  posts.forEach(post =>
    console.log(`  [#${post.id}] "${post.title}" → ${userMap.get(post.userId)}`));

  console.log('\nAutores únicos (Set):');
  const autorIds = new Set(posts.map(p => p.userId));
  autorIds.forEach(id => console.log('  -', userMap.get(id)));
})
.catch(err => console.log('❌ Error:', err.message));