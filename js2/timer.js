const fechaObjetivo = new Date("Oct 04, 2025 00:00:00").getTime();

// Actualizar el contador cada 1 segundo
const intervalo = setInterval(() => {
  
  // Obtener la fecha y hora actual
  const ahora = new Date().getTime();
  
  // Calcular la diferencia entre la fecha objetivo y ahora
  const diferencia = fechaObjetivo - ahora;
  
  // Calcular días, horas, minutos y segundos
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
  
  // Actualizar los elementos del DOM
  document.getElementById("dias").innerText = dias;
  document.getElementById("horas").innerText = horas;
  document.getElementById("minutos").innerText = minutos;
  document.getElementById("segundos").innerText = segundos;
  
  // Si la cuenta regresiva ha terminado, mostrar un mensaje
  if (diferencia < 0) {
    clearInterval(intervalo);
    document.querySelector(".contador").innerHTML = "<h2>¡El evento ha comenzado!</h2>";
  }
  
}, 1000);