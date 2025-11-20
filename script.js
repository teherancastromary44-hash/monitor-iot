function generarDatos() {
    const voltaje = (110 + Math.random() * 10).toFixed(1);
    const corriente = (2 + Math.random() * 2).toFixed(2);
    const potencia = (voltaje * corriente).toFixed(2);
    const consumo = (Math.random() * 0.5).toFixed(3);
    const fecha = new Date().toLocaleString();
    return { voltaje, corriente, potencia, consumo, fecha };
}

function actualizarDashboard(datos) {
    document.getElementById("voltaje").textContent = ${datos.voltaje} V;
    document.getElementById("corriente").textContent = ${datos.corriente} A;
    document.getElementById("potencia").textContent = ${datos.potencia} W;
    document.getElementById("consumo").textContent = ${datos.consumo} kWh;

    const alertaEl = document.getElementById("alerta");
    const recoEl = document.getElementById("recomendacion");
    alertaEl.textContent = "";
    recoEl.textContent = "";

    if (parseFloat(datos.potencia) > 500) {
        alertaEl.textContent = "⚠ Potencia elevada detectada. Revisar las cargas conectadas.";
    }
    if (parseFloat(datos.consumo) > 0.4) {
        recoEl.textContent = "💡 Recomendación: ajustar horarios de uso para reducir el consumo.";
    }
}

function guardarHistorial(datos) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(datos);
    localStorage.setItem("historial", JSON.stringify(historial));
    mostrarHistorial();
}

function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    const tbody = document.querySelector("#historial tbody");
    tbody.innerHTML = "";
    historial.slice(-10).forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = <td>${d.fecha}</td><td>${d.voltaje}</td><td>${d.corriente}</td><td>${d.potencia}</td><td>${d.consumo}</td>;
        tbody.appendChild(tr);
    });
}

document.getElementById("actualizar").addEventListener("click", () => {
    const datos = generarDatos();
    actualizarDashboard(datos);
    guardarHistorial(datos);
});

mostrarHistorial();
