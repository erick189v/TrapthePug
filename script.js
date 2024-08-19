const gridSize = 10;
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

if(!ifTrapped()){
    movePug();
}
    
    createGrid();
}

function movePug(){
    const escapeLogic = [ 
        {x: pugPosition.x + 1, y: pugPosition.y},
        {x: pugPosition.x - 1, y: pugPosition.y},
        {x: pugPosition.x, y: pugPosition.y - 1},
        {x: pugPosition.x, y: pugPosition.y + 1},
        {x: pugPosition.x + 1, y: pugPosition.y - 1},
        {x: pugPosition.x - 1, y: pugPosition.y + 1},
        {x: pugPosition.x + 1, y: pugPosition.y + 1},
        {x: pugPosition.x - 1, y: pugPosition.y - 1},
    ];
    const validMoves = escapeLogic.filter(move =>
        move.x >= 0 && move.x < gridSize && 
        move.y >= 0 && move.y < gridSize &&
        !blockedCells.has(`${move.y}-${move.x}`)
    );

    if(validMoves.length > 0){
        pugPosition = validMoves[Math.floor(Math.random()* validMoves.length)]
        if(pugPosition.x == 0 || pugPosition.x == gridSize  || pugPosition.y == 0 || pugPosition.y == gridSize ){
            alert('pug has escaped');
            return;
        }
    } else{
        alert('pug is trapped')
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

createGrid();
