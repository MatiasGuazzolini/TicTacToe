const cells = document.querySelectorAll(".cell");    // declaro mis constatntes, en este caso, las todas las celdas, el boton de reseteo y el texto que indica el estado
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [   // aca pongo las posibles combinaciones para ganar
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;  //hago que aranque en false asi esta "apagado"

initializeGame();

function initializeGame(){ // funcion para que inicialice el juego
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //agrego oyente a la espera de un click para agregar X o O
    restartBtn.addEventListener("click", restartGame); //puedo reiniciar el juego
    statusText.textContent = `${currentPlayer}'s turn`; // indico de quien es el turno 
    running = true; //inicializo el juego
}
function cellClicked(){ // funcion que guarda el valor en la celda
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){ // me fijo si esta ocupada la celda o no esta corriendo el juego
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){ // funcion para actualizar la celda
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){ // funcion para que cambie de jugador
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){ // funcion para ganar 
    let roundWon = false;
 
    for(let i = 0; i < winConditions.length; i++){      // recorro los diferentes elementos del array y al mismo tiempo verifico las condiciones para ganar
        const condition = winConditions[i];
        const cellA = options[condition[0]];   // comparo los elementos de los arrays que recorro
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){  //se sigue juganod mientras haya casillas vacias
            continue;
        }
        if(cellA == cellB && cellB == cellC){       //en caso de que  haya 3 iguales en fila hay un ganador
            roundWon = true;
            break;
        }
    }

    if(roundWon){           //devuelve que hay un ganador 
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){     //devuelve un empate
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();             //este else me permite seguir juganod mientras no haya ganador o empate
    }
}
function restartGame(){ // funcion para resetear el juego
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}