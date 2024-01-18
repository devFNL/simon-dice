const $botonStart = document.querySelector("#start");
const $rondas = document.querySelector("#rondas");

let jugadasBot = [];
let jugadasUsuario = [];
let rondas = 0;

$botonStart.onclick = empezarJuego;

// main
function empezarJuego() {
  manejarTurnos();
}

// handlers
function manejarTurnos() {
  manejarTurnoBot();
  let USUARIO_DELAY = jugadasBot.length * 1020;
  setTimeout(() => {
    manejarTurnoUsuario();
  }, USUARIO_DELAY);
  rondas++;
  $rondas.innerText = rondas;
}

function manejarTurnoBot() {
  mostrarMensajes("turnoBot");
  const $nuevoCuadro = seleccionarAleatorio();
  jugadasBot.push($nuevoCuadro);
  mostrarJugadas(jugadasBot);
}

function manejarTurnoUsuario() {
  jugadasUsuario = [];
  mostrarMensajes("turnoUsuario");
  document.querySelectorAll(".cuadro").forEach(($cuadro) => {
    $cuadro.onclick = clickUsuario;
  });
}

function manejarBoton(state) {
  if (state) {
    document.querySelector("#start").classList.remove("d-none");
  } else {
    document.querySelector("#start").classList.add("d-none");
  }
}

function seleccionarAleatorio() {
  const $cuadros = document.querySelectorAll(".cuadro");
  const index = Math.floor(Math.random() * 4);
  return $cuadros[index];
}

// block
function bloquearUsuario() {
  document.querySelectorAll(".cuadro").forEach(($cuadro) => {
    $cuadro.onclick = function () {};
  });
}

// prints
function clickUsuario(event) {
  const $nuevoCuadro = event.target;
  mostrarCuadrado($nuevoCuadro);
  jugadasUsuario.push($nuevoCuadro);
  manejarResultado($nuevoCuadro);
}

function mostrarMensajes(valid) {
  if (valid === "turnoBot") {
    mostrarMensaje("El bot está jugando");
    manejarBoton(false);
    bloquearUsuario();
  } else if (valid === "turnoUsuario") {
    mostrarMensaje("Tu turno");
    manejarBoton(false);
  } else {
    mostrarMensaje("Perdiste");
    manejarBoton(true);
    bloquearUsuario();
  }
}

function mostrarMensaje(message) {
  document.querySelector("#mensaje").innerText = message;
}

function mostrarJugadas($sequence) {
  $sequence.forEach(($cuadro, index) => {
    const BOT_DELAY = index * 1000;
    setTimeout(function () {
      mostrarCuadrado($cuadro);
    }, BOT_DELAY);
  });
}

function mostrarCuadrado($cuadro) {
  $cuadro.classList.add("activo");
  setTimeout(function () {
    $cuadro.classList.remove("activo");
  }, 500);
}

function manejarResultado($cuadro) {
  const $cuadroBot = jugadasBot[jugadasUsuario.length - 1];
  if ($cuadroBot !== $cuadro) {
    lose();
  } else {
    if (jugadasUsuario.length === jugadasBot.length) {
      setTimeout(function () {
        manejarTurnos();
      }, 1000);
    }
  }
}

function lose() {
  mostrarMensajes();
  restart();
}

function restart() {
  jugadasBot = [];
  jugadasUsuario = [];
  rondas = 0;
}
