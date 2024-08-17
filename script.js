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
            }

            

        }
    }
}