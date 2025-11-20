// ------------------------------
// Simulación de datos del monitor
// ------------------------------

function generarLecturaSimulada() {
  // Rango de ejemplo para voltaje, corriente, etc.
  const voltaje = (110 + Math.random() * 20).toFixed(1); // 110 - 130 V
  const corriente = (1 + Math.random() * 10).toFixed(2); // 1 - 11 A
  const potencia = (voltaje * corriente * 0.8).toFixed(2); // factor de potencia aproximado
  const consumo = (Math.random() * 10).toFixed(3);        // 0 - 10 kWh

  return {
    voltaje: parseFloat(voltaje),
    corriente: parseFloat(corriente),
    potencia: parseFloat(potencia),
    consumo: parseFloat(consumo),
  };
}

// ------------------------------
// Lógica de alertas y recomendaciones
// ------------------------------

function evaluarAlertas(potencia, consumo) {
  const alertaElem = document.getElementById("alerta");
  const recomendacionElem = document.getElementById("recomendacion");

  // Limpiar mensajes anteriores
  alertaElem.textContent = "";
  recomendacionElem.textContent = "";

  // Potencia alta
  if (potencia > 500) {
    alertaElem.textContent =
      "⚠ Potencia elevada detectada en el prototipo. Se sugiere revisar las cargas simuladas.";
  }

  // Consumo acumulado alto
  if (consumo > 5) {
    recomendacionElem.textContent =
      "💡 Recomendación del prototipo: reducir tiempos de uso y desconectar equipos innecesarios para bajar el consumo.";
  }
}

// ------------------------------
// Actualización del dashboard
// ------------------------------

function actualizarDashboard() {
  const datos = generarLecturaSimulada();

  // Actualizar tarjetas
  document.getElementById("voltaje").textContent =
    datos.voltaje.toFixed(1) + " V";
  document.getElementById("corriente").textContent =
    datos.corriente.toFixed(2) + " A";
  document.getElementById("potencia").textContent =
    datos.potencia.toFixed(2) + " W";
  document.getElementById("consumo").textContent =
    datos.consumo.toFixed(3) + " kWh";

  // Evaluar alertas según los valores simulados
  evaluarAlertas(datos.potencia, datos.consumo);

  // Registrar en historial visual
  agregarFilaHistorial(datos);
}

// ------------------------------
// Historial (solo visual, en la tabla)
// ------------------------------

function agregarFilaHistorial(datos) {
  const tbody = document.getElementById("historial-body");
  const fila = document.createElement("tr");

  const ahora = new Date();
  const fechaHora = ahora.toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "medium",
  });

  fila.innerHTML = `
    <td>${fechaHora}</td>
    <td>${datos.voltaje.toFixed(1)}</td>
    <td>${datos.corriente.toFixed(2)}</td>
    <td>${datos.potencia.toFixed(2)}</td>
    <td>${datos.consumo.toFixed(3)}</td>
  `;

  // Agregar la fila al inicio
  tbody.prepend(fila);

  // Limitar a 10 registros visibles
  if (tbody.rows.length > 10) {
    tbody.deleteRow(tbody.rows.length - 1);
  }
}

// ------------------------------
// Inicio del prototipo
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Actualizar al abrir
  actualizarDashboard();

  // Actualizar cada 10 segundos
  setInterval(actualizarDashboard, 10000);
});