let currentNumber = 1; // Indica el primer número que el usuario debe pulsar para iniciar correctamente el juego
let contador = 0; // Contador de números eliminados
let startTime; // Almacena el tiempo de inicio del juego
let intervalId; // Variable para almacenar el ID del intervalo del cronómetro

function startTimer() {
    startTime = new Date();
    intervalId = setInterval(updateTimer, 10); // Inicia el intervalo del cronómetro
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;

    document.getElementById('cronometro').textContent = formattedTime; // Actualiza el elemento HTML con el tiempo transcurrido
}

function handleClick(number) {
    if (number === currentNumber) {
        document.getElementById(number).style.display = 'none'; // Oculta el número clicado
        currentNumber++;
        contador++;

        document.getElementById('contador').textContent = contador; // Actualiza el contador de números eliminados

        if (currentNumber === 2) {
            startTimer(); // Inicia el cronómetro cuando se elimina el primer número
        }

        if (currentNumber > 50) {
            alert('¡Felicidades! Has eliminado todos los números en orden.');
            clearInterval(intervalId); // Detiene el intervalo del cronómetro cuando se eliminan todos los números
        }
    } else {
        alert('Oops, selecciona el número correcto .'); // Muestra un mensaje de error si se selecciona un número incorrecto
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const tarjeta1 = document.querySelector('.tarjeta1');
    const numbers = Array.from({ length: 50 }, (_, index) => index + 1);
    shuffleArray(numbers); // Baraja el array de números

    numbers.forEach(i => {
        const numberElement = document.createElement('div');
        numberElement.id = i;
        numberElement.className = 'number';
        numberElement.textContent = i;
        numberElement.addEventListener('click', function () {
            handleClick(i); // Asigna el evento de clic para manejar la interacción del usuario
        });
        tarjeta1.appendChild(numberElement); // Agrega el número al contenedor
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos para barajar el array
        }
    }
});