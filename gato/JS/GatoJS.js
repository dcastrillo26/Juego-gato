// Todas las celdas se insertan un array
var cells = document.querySelectorAll('.cell');

// Agrega un eventListener a todas las celdas
for (var cell=0; cell < cells.length; cell++) {
  cells[cell].addEventListener('click', Marca);
}

// Rastrea el proceso de juego
var count = 0;
var x = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
var o = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
var Turno = document.querySelector(".playerTurn");


var win = [[1,1,1,0,0,0,0,0,0], [0,0,0,1,1,1,0,0,0], [0,0,0,0,0,0,1,1,1],
           [1,0,0,1,0,0,1,0,0], [0,1,0,0,1,0,0,1,0], [0,0,1,0,0,1,0,0,1],
           [1,0,0,0,1,0,0,0,1], [0,0,1,0,1,0,1,0,0]];

var inARow;
function checkWin (player) {
  for (var i=0; i < win.length; i++) {
    inARow = 0;
    for (var j=0; j < win[i].length; j++) {
      if(win[i][j] === player[j]){
        inARow += 1;
      }
      if (inARow > 2){
        return true;
      }
    }
  }
  return false;
}


// Agrega X || O alternando y verifica el ganador
function Marca(e) {
  if ( count % 2 === 0) {
    e.target.innerText = "X";
    x[e.target.id[4]] = 1;
    count += 1;
    e.target.removeEventListener('click', Marca);
    if (count > 4 && checkWin(x)) {
      Turno.innerText = "Fin del juego! X Gana!";
      finJuego();
    } else if (count > 7){
      Turno.innerText = "Fin del juego! Es un Empate!";
      finJuego();
    } else {
      Turno.innerText = "Turno de O";
    }
  } else {
    e.target.innerText = "O";
    count += 1;
    o[e.target.id[4]] = 1;
    e.target.removeEventListener('click', Marca);
    if (count > 4 && checkWin(o)) {
      Turno.innerText = "Fin del juego! O Gana!";
      finJuego();
    } else if (count > 7) {
      Turno.innerText = "Fin del juego! Es un Empate!";
      finJuego();
    } else {
      Turno.innerText = "Turno de X";
    }
  } 
}

function reset() {
  Turno.innerText = "Turno de X";
  count = 0;
  x = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
  o = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
  for (var cell=0; cell < cells.length; cell++) {
    cells[cell].addEventListener('click', Marca);
    cells[cell].innerHTML = "&nbsp;" ;
  }
}

// Boton reset
var resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);

// No permite hacer mas clic cuando termina el juego
function finJuego() {
  for (var cell=0; cell < cells.length; cell++) {
  cells[cell].removeEventListener('click', Marca);
}
}