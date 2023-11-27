// Seleccionamos los elementos del DOM con los que vamos a trabajar, esos elementos son:
// ...boton-inicio-pausa, boton-reiniciar
const timer = document.getElementById('timer');
const buttonStartPause = document.getElementById('button-start-pause');
const buttonRestart = document.getElementById('button-restart');

// Definimos 3 variables: una para la hora, otro para los minutos y otro para los segundos.
let [hours, minutes, seconds] = [0, 0, 0];

// Definimos otra variable para el intervalo de tiempo qeu debe transcurrir antes de actualizar
// ...el cronometro y su estado (si esta pausado o andando)
let timeInterval; 
let timerStatus = 'paused';

//Definimos una función que maneje como se va actualizar el cronometro en seg,min y horas y... 
//...como se va a calcular lo que ha transcurrido. 
function updateTimer() {
    seconds ++; 

    if(seconds / 60 === 1) {           // Si han transcurrido 60 segundos el contador se pone 
        seconds = 0;                   // a 0 
        minutes++;                      // y se añade 1 minuto
                                    
    if(minutes / 60 === 1) {             // Si han transcurrido 60 minutos el contador se pone
        minutes = 0;                     // a 0 
        hours++;                         // y se añade 1 hora
    }
    }

    const secondsWithFormat = addFormat(seconds);
    const minutesWithFormat = addFormat(minutes);
    const hoursWithFormat = addFormat(hours);

    timer.innerText = `${hoursWithFormat}:${minutesWithFormat}:${secondsWithFormat} `;  
}

// Hacemos una funcion para cuando los seg/min/horas sean menores de 2 digitos
//... y haya que añadir un 0
function addFormat(unidadDeTiempo) {
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

// Asignamos esas funciones como eventlistener o eventhandler para cuando se hace clic
buttonStartPause.addEventListener('click', function() {
    if(timerStatus === 'paused') {
        timeInterval = window.setInterval(updateTimer, 1000);
        buttonStartPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
        buttonStartPause.classList.remove('start');
        buttonStartPause.classList.add('pause');
        timerStatus = 'running';
    } else {
        window.clearInterval(timeInterval);
        buttonStartPause.innerHTML = '<i class="bi bi-play-fill"></i>';
        buttonStartPause.classList.remove('pause');
        buttonStartPause.classList.add('start');
        timerStatus = 'paused';
    }
});

// Botón reiniciar

buttonRestart.addEventListener('click', function() {
    window.clearInterval(timeInterval);
   
    hours = 0;
    minutes = 0;
    seconds = 0;

    //Reiniciar
    timer.innerText = '00:00:00';

    //Actualizar botones
    buttonStartPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    buttonStartPause.classList.remove('pause');
    buttonStartPause.classList.add('start');

    //Estado
    timerStatus = 'paused';
});