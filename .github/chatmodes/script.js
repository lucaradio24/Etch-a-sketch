const container = document.querySelector('#grid-container');

function createGrid(size) {
  container.innerHTML = '';
    for (let i=0; i < (size * size); i++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = 'red';
})
    container.appendChild(square)

}
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