
  //Santificación
  // const URLApp= 'https://script.google.com/macros/s/AKfycbyfKldB6V4g-Pz5eXaw8WwBrTqCe4ocuMEBCsVQR0T3tVgzbGOY7MirG5sHoULtVXTx/exec';
  //Líderes
  const URLApp= 'https://script.google.com/macros/s/AKfycbyr5RYG-wkIigfPVdEEUqVPGw0yQjoL7zS2ODW-QAXdIjKRtHiq5bLKR2Qzum0RKLGv1w/exec';
  
  

const params = new URLSearchParams(window.location.search);
const idPersona = params.get("id");
const nombrePersona = params.get("nombre");
console.log(idPersona); // "ABC123"
let SI = document.getElementById("si");
let NO = document.getElementById("no");
let Veri = document.getElementById("veri");
let Info = document.getElementById("info");
let Lugar = document.getElementById("lugar");

// const FechaObjetivo = new Date("2025-11-18T18:20:00"); //Pruebas 
const fechaObjetivo = new Date("2025-12-18T18:20:00"); // Fecha real
const Ahora = new Date();



const p = 20;

async function Ingresar(lugar) {

  Lugar.style.display = "none";
  Veri.style.display = "flex";

  const idDes = des(idPersona, p);

  const modo = "ingreso";

  const url =
    URLApp +    "?texto=" +    encodeURIComponent(idDes) +    "&modo=" +    encodeURIComponent(modo) +    "&lugar=" +    encodeURIComponent(lugar);
  const res = await fetch(url);
  const data = await res.json();

  if (data.encontrado) {
    SI.style.display = "flex";
    NO.style.display = "none";
    Veri.style.display = "none";
    Info.style.display = "none";

    const yaIngreso = lugar === "bodega" ? data.registradoBodega : data.registradoIglesia;
    const sitio = lugar === "bodega" ? "EF" : "la iglesia";

    // Caso repetido: bloque negro. Caso exitoso: bloque verde.
    SI.classList.toggle("repetido", Boolean(yaIngreso));

    if (yaIngreso) {
      pintarMensaje(SI, ["Upss...", "Parece que " + nombrePersona + " ya ingresó a " + sitio + ".", "❌"]);
    } else {
      const saludo = data.genero === "FEMENINO" ? "Bienvenida" : "Bienvenido";
      pintarMensaje(SI, [saludo + " " + nombrePersona, "✅"]);
    }
  } else {
    SI.style.display = "none";
    SI.classList.remove("repetido");
    NO.style.display = "flex";
    Veri.style.display = "none";
    Info.style.display = "none";
    pintarMensaje(NO, ["No se encuentra en la lista.", "❌"]);
  }
}

function pintarMensaje(contenedor, lineas) {
  const msg = document.createElement("p");
  lineas.forEach((linea, i) => {
    if (i) msg.append(document.createElement("br"));
    msg.append(linea);
  });
  contenedor.replaceChildren(msg);
}

function des(texto, clave) {
  const alfabeto =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const largo = alfabeto.length;
  let resultado = "";

  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    const index = alfabeto.indexOf(char);

    if (index !== -1) {
      const nuevoIndex = (index - clave + largo) % largo;
      resultado += alfabeto[nuevoIndex];
    } else {
      resultado += char;
    }
  }

  return resultado;
}


document.addEventListener("DOMContentLoaded", () => {
  iniciar();
});

function iniciar() {
  if (Ahora < fechaObjetivo) {
    SI.style.display = "none";
    NO.style.display = "none";
    Veri.style.display = "none";
    Lugar.style.display = "none";
    Info.style.display = "flex";
  } else {
    SI.style.display = "none";
    NO.style.display = "none";
    Veri.style.display = "none";
    Lugar.style.display = "flex";
    Info.style.display = "none";
  }
}


