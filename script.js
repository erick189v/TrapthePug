const gridSize = 11;
let pugPosition ={x:4,y:4};
let blockedCells = new Set();//tracking of blocked cells


function createGrid(){
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    //grid for game and positioning pug
    for(let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize; j++){
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = j;
            cell.dataset.y = i;

            if(i == pugPosition.y && j == pugPosition.x){
                cell.classList.add('pug');
            }else if(blockedCells.has(`${i}-${j}`)){
                cell.classList.add('blocked');
            }


            cell.addEventListener('click',handleCellClick);// function called for clicks
            grid.appendChild(cell);

        }
    }
}

function handleCellClick(event){
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if(blockedCells.has(`${y}-${x}`) || (x == pugPosition.x && y == pugPosition.y)){
        return;
    }

    blockedCells.add(`${y}-${x}`);
    event.target.classList.add('blocked');

    movePug(); // Always try to move pug after a block
    createGrid();
}

function resetGame(){
    do{
        pugPosition = {
            x: Math.floor(Math.random() * 3) +4,
            y: Math.floor(Math.random() * 3) +4
        };
    } while(blockedCells.has(`${pugPosition.y} - ${pugPosition.x}`))

    blockedCells.clear();
    blockedRandom(13);
    createGrid();
}

function movePug() {
    const escapeLogic = [ 
        {x: pugPosition.x + 1, y: pugPosition.y}, // Right
        {x: pugPosition.x - 1, y: pugPosition.y}, // Left
        {x: pugPosition.x, y: pugPosition.y - 1}, // Up
        {x: pugPosition.x, y: pugPosition.y + 1}, // Down
        {x: pugPosition.x + 1, y: pugPosition.y - 1}, // Diagonal up-right
        {x: pugPosition.x - 1, y: pugPosition.y + 1}, // Diagonal down-left
        {x: pugPosition.x + 1, y: pugPosition.y + 1}, // Diagonal down-right
        {x: pugPosition.x - 1, y: pugPosition.y - 1}, // Diagonal up-left
    ];

    const validMoves = escapeLogic.filter(move =>
        move.x >= 0 && move.x < gridSize &&
        move.y >= 0 && move.y < gridSize &&
        !blockedCells.has(`${move.y}-${move.x}`)
    );

    if (validMoves.length > 0) {
        // Move pug to the best (most escaping) position
        validMoves.sort((a, b) => {
            const aDistance = Math.min(a.x, gridSize - 1 - a.x, a.y, gridSize - 1 - a.y);
            const bDistance = Math.min(b.x, gridSize - 1 - b.x, b.y, gridSize - 1 - b.y);
            return aDistance - bDistance;
        });

        // Update pug's position
        pugPosition = validMoves[0];

        // If the pug reaches the edge, it escapes
        if (
            pugPosition.x === 0 || 
            pugPosition.x === gridSize - 1 || 
            pugPosition.y === 0 || 
            pugPosition.y === gridSize - 1
        ) {
            alert('The pug has escaped!');
            setTimeout(resetGame, 1000);
        }
    } else {
        alert('The pug is trapped!');
        setTimeout(resetGame, 1000);
    }
}


function ifTrapped(){
    
    const pugLogic = [
        {x: pugPosition.x + 1, y: pugPosition.y},
        {x: pugPosition.x - 1, y: pugPosition.y},
        {x: pugPosition.x, y: pugPosition.y - 1},
        {x: pugPosition.x, y: pugPosition.y + 1},
        {x: pugPosition.x + 1, y: pugPosition.y - 1},
        {x: pugPosition.x - 1, y: pugPosition.y + 1},
        {x: pugPosition.x + 1, y: pugPosition.y + 1},
        {x: pugPosition.x - 1, y: pugPosition.y - 1},

    ];

    const trapped = pugLogic.every( move=>
        move.x < 0 || move.x >= gridSize ||
        move.y < 0 || move.y >= gridSize ||
        blockedCells.has(`${move.y}-${move.x}`)
    );
    if(trapped){
        alert('Pug is Trapped!');
        return true;
    }
    return false;
}

function blockedRandom(){
    //generating random amount of blocked cells 10-15
    const numCells = Math.floor(Math.random() * 6) +10;

    while(blockedCells.size <  numCells){
    const ranX = Math.floor(Math.random() * gridSize)
    const ranY = Math.floor(Math.random() * gridSize)

    const cellKey = `${ranY}-${ranX}`;

    //avoid blocking pugs starting position
    if(cellKey !== `${pugPosition.y}-${pugPosition.x}`){
        blockedCells.add(cellKey);
    }
}
}

blockedRandom(13);
createGrid();
