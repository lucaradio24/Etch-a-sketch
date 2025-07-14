const container = document.querySelector('#grid-container');
let isClickMode = true;
let isMouseDown = false;
let isRainbowMode = false;
let isHoverEnabled = false;

container.addEventListener('click', () => {
    isHoverEnabled = !isHoverEnabled;
})

const rgb = function() {
    let R = Math.round(Math.random() * 255);
    let G = Math.round(Math.random() * 255);
    let B = Math.round(Math.random() * 255);
    return `rgb(${R}, ${G}, ${B})`;
}

function toggleRGBMode() {
    isRainbowMode = !isRainbowMode;
}

function createGrid(size) {
    container.innerHTML = '';
    for (let i = 0; i < (size * size); i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;
        square.dataset.passes = '0';

        square.addEventListener('mouseover', () => {
            if (isClickMode && isMouseDown || !isClickMode && isHoverEnabled) {
                let passes = parseInt(square.dataset.passes);
                passes++;
                square.dataset.passes = passes;
                let opacity = passes * 0.1;
                if (isRainbowMode) {
                    square.style.backgroundColor = rgb();
                } else {
                    square.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
                }
            }
        });

        container.appendChild(square);  
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
