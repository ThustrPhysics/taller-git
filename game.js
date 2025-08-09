const readline = require('readline');

const rangoMin = 1;
const rangoMax = 100;
const umbralCaliente = 10;

function generarSecreto() {
  return Math.floor(Math.random() * (rangoMax - rangoMin + 1)) + rangoMin;
}

let numeroSecreto = generarSecreto();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function darPista(diferencia) {
  return diferencia <= umbralCaliente ? 'caliente' : 'frío';
}

let intentos = 0;

function reiniciar() {
  numeroSecreto = generarSecreto();
  intentos = 0;
  console.log(`Adivina el número (${rangoMin}-${rangoMax}). Escribe "salir" para terminar.`);
}

function preguntar() {
  rl.question('Tu intento: ', (txt) => {
    if (txt.trim().toLowerCase() === 'salir') {
      console.log('Hasta luego.');
      rl.close();
      return;
    }

    const intento = Number(txt);

    if (!Number.isInteger(intento)) {
      console.log('Ingresa un número entero.');
      return preguntar();
    }

    if (intento < rangoMin || intento > rangoMax) {
      console.log(`Debe estar entre ${rangoMin} y ${rangoMax}.`);
      return preguntar();
    }

    intentos++;

    if (intento === numeroSecreto) {
      console.log(`¡Correcto! 🎉 Lo lograste en ${intentos} intento(s).`);
      rl.question('¿Jugar de nuevo? (s/n): ', (r) => {
        if (r.trim().toLowerCase().startsWith('s')) {
          reiniciar();
          preguntar();
        } else {
          rl.close();
        }
      });
      return;
    }

    const diferencia = Math.abs(numeroSecreto - intento);
    const direccion = intento < numeroSecreto ? 'más alto' : 'más bajo';
    console.log(`Pista: ${darPista(diferencia)} (${direccion}). Intentos: ${intentos}`);
    preguntar();
  });
}

reiniciar();
preguntar();
