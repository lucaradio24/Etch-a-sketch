const container = document.querySelector('#grid-container');
for (let i=0; i < 256; i++){
  const square = document.createElement('div');
  square.classList.add('grid-square');
  square.style.width = 'calc(100% / 16)';
  square.style.height = 'calc(100% / 16)';
  container.appendChild(square)
}

const square = document.querySelectorAll('.grid-square');
square.forEach(square => {
    square.addEventListener('mouseover', () => {
        square.style.backgroundColor = 'red';
    })
})