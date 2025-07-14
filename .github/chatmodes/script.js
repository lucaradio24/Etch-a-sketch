const container = document.querySelector('#grid-container');
let isClickMode = false;
let isMouseDown = false;

function createGrid(size) {
  container.innerHTML = '';
    for (let i=0; i < (size * size); i++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;
        
        square.addEventListener('mouseover', () => {
            if (!isClickMode || isClickMode && isMouseDown){
            square.style.backgroundColor = 'red';
            }
})
    container.appendChild(square)

}
}

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

function toggleMode(){
    isClickMode = !isClickMode;
}


    function changeSize() {
        let newSize = prompt('Enter number of squares per side (max 100)');
        newSize = parseInt(newSize);
        if (newSize > 0 && newSize <= 100) {
            createGrid(newSize);
        } else {
            alert('Please enter a number between 1 and 100');
    }
}

createGrid(16);


// Randomize RGB values
// Implement progressive darkening 
// Toggle to change color
// Remove grid lines
