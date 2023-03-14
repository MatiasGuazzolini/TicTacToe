var  numSelected =null;
var tileSelected =null;
var errors=0;
var board =[
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---",
]
var solution =[
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763",
]

window.onload = function () {
    setGame();
}

function setGame () {
    //Digitos debajo del board
    for (let i=1; i<=9; i++){
        let number= document.createElement("div");
        number.id=i;
        number.innerText = i;
        number.addEventListener("click", selectedNumber); // cuando se realiza un click, llamamos a la funcion select
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);      //con esto creamos como si en html fuera: <div id= "1" class= "number"> 1 <div>
    }

    //Cremaos el board 9x9 aca por el mismo motivo mencionado anteriormente

    for (let m=0; m<9; m++){
        for  (let g=0; g<9; g++){
            let tile = document.createElement("div");
            tile.id = m.toString() + "-" + g.toString();
            if (board[m][g] != "-"){
                tile.innerText= board[m][g];
                tile.classList.add("tile-start");
            }
            if (m == 3 || m == 6){
                tile.classList.add("horizontal-line");
            }
            if (g==3 || g == 6){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectedTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

// una vez creado el tablero de juego agregamos funcionalidades del juego en si

function selectedNumber (){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected")
    }
    numSelected=this;
    numSelected.classList.add("number-selected");
}
function selectedTile() {
    if (numSelected){
        if(this.innerText != ""){
            return;
        }
        this.innerText = numSelected.id;
        let coords= this.id.split("-");     //hacemos split para tener numeros individuales, 0-0, 0-1, que seria ["0", "0"] y asi consecutivamente
        let m= parseInt(coords[0]);     //usamos el parseint debido a que tenemos un string en el array y queremos que nos devuelva un entero (int)
        let g = parseInt(coords [1]);

        if (solution[m][g] == numSelected.id){
            this.innerText = numSelected.id
        }
        else{
            errors+= 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}