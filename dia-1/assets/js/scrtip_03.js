document.querySelector("#container").innerHTML = `
  <div style="display:flex;flex-direction:column;gap:12px">
    <p style="color:var(--text-dim);font-size:13px">Cada botón tiene su propio callback registrado:</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button id="btn-a" style="padding:9px 18px;background:#5b8af0;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:13px;font-weight:600">Botón A</button>
      <button id="btn-b" style="padding:9px 18px;background:#a78bfa;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:13px;font-weight:600">Botón B</button>
      <button id="btn-c" style="padding:9px 18px;background:#34d399;color:#000;border:none;border-radius:7px;cursor:pointer;font-size:13px;font-weight:600">Botón C</button>
    </div>
    <div id="resultado" style="font-size:13px;color:#fbbf24;min-height:20px">Esperando clic...</div>
  </div>`;
let clicks = 0;
const manejarClickA = () => {
    clicks++;
    document.getElementById('resultado').textContent = `🔵 Botón A — clic #${clicks}`;
    console.log('Callback A ejecutado. Total clicks:', clicks);

}
document.querySelector("#btn-a")
    .addEventListener('click', manejarClickA);

document.querySelector("#btn-b")
    .addEventListener('click', function () {
        clicks++;
        document.getElementById('resultado').textContent = `🟣 Botón B — clic #${clicks}`;
        console.log('Callback B ejecutado. Total clicks:', clicks);
    });
document.getElementById('btn-c').addEventListener('click', () => {
    clicks++;
    document.getElementById('resultado').textContent = `🟢 Botón C — clic #${clicks}`;
    console.log('Callback C ejecutado. Total clicks:', clicks);
});