//styling the container 
const flexbox = document.createElement('div')
flexbox.classList.add("flex-grid")
document.body.appendChild(flexbox)

//Styling the slider
const sliderContainer = document.createElement('div')
sliderContainer.classList.add('slider-container')
flexbox.appendChild(sliderContainer)

//Create a label for the slider
const sliderLabel = document.createElement('label')
sliderLabel.textContent = "Grid size"
sliderContainer.appendChild(sliderLabel)

//Styling the range slider
const rangeSlider = document.createElement('input');
rangeSlider.type = 'range';
rangeSlider.min = '1';
rangeSlider.max = '64';
rangeSlider.value = '16'
rangeSlider.step = '1'
rangeSlider.name = 'slider-size'
rangeSlider.id = 'size'
sliderContainer.appendChild(rangeSlider)

const sizeTip = document.createElement('div')
sizeTip.id = "tooltip"
sliderContainer.appendChild(sizeTip)

//Styling the grid and nest it inside the flexbox
const grid = document.createElement('div')
grid.classList.add("grid")
flexbox.appendChild(grid)

//Button menu
const buttonMenu = document.createElement('div')
buttonMenu.classList.add('menu')
buttonMenuStyle = buttonMenu.style
document.body.appendChild(buttonMenu)


//Buttons
const togglePen = document.createElement('button')
togglePen.innerText="Toggle pen"
togglePen.id= 'pen'


const toggleColor = document.createElement('input')
toggleColor.type = 'color'
toggleColor.id = 'color'


const eraser = document.createElement('button')
eraser.innerText = 'Eraser'
eraser.id='eraser'


const reset = document.createElement('button')
reset.innerText = 'Reset'
reset.id = 'reset'


buttonMenu.append(togglePen, toggleColor, eraser, reset)

//Footer
const footer = document.createElement('div')
footer.classList.add('footer')
footerStyle = footer.style
document.body.appendChild(footer)

const footerText = document.createElement('p')
footerText.innerText= 'Copyright © Carl Warren 2023'
footer.appendChild(footerText)

// Create an <a> element for the GitHub logo link
const githubLink = document.createElement('a')
githubLink.href = 'https://github.com/SkepticalYouth'
githubLink.classList.add('github-link')
footer.appendChild(githubLink);

// Create an <i> element for the GitHub logo using Font Awesome icon classes
const githubIcon = document.createElement('i');
githubIcon.classList.add('fab', 'fa-github'); 
githubLink.appendChild(githubIcon);

//Set slider logic
let isDrawing = false
let eraserOn = false

function updateSlider(){
    grid.innerHTML = '';
    let i = 0
    let dim = parseInt(document.getElementById('size').value)
    while (i< dim**2){
        const miniBox = document.createElement('div')
        miniBoxStyle = miniBox.style
        miniBoxStyle.width = 480/dim + 'px'
        miniBoxStyle.height = 480/dim + 'px'
        miniBoxStyle.border = 'none'
        miniBox.classList.add('etchBlock')
        grid.appendChild(miniBox)
        i +=1  
    }
    canvas = document.querySelectorAll('.etchBlock')
}
 
//Initialize the grid upon loading page
function initializeGrid(){
    let i = 0
    let dim = parseInt(document.getElementById('size').value)
    while (i <dim**2){
        const miniBox = document.createElement('div')
        miniBoxStyle = miniBox.style
        miniBoxStyle.width = 480/dim + 'px'
        miniBoxStyle.height = 480/dim + 'px'
        miniBoxStyle.border = 'none'
        miniBox.classList.add('etchBlock')
        grid.appendChild(miniBox)
        i +=1  
    }
}
initializeGrid()

//logic for pen & eraser
const penButton = document.getElementById('pen')
let canvas = document.querySelectorAll('.etchBlock') 
let penColor = document.getElementById('color').value



function drawMouseDown(Event){
    isDrawing = true
    const block = Event.target;
    block.style.backgroundColor = penColor;
}

function drawMouseMove(Event){
    if (isDrawing){
        const block = Event.target
        block.style.backgroundColor = penColor
    }
}

function drawMouseUp(){
    isDrawing = false
}

function drawMouseLeave(){
    isDrawing = false
}

function eraserMouseDown(Event){
    eraserOn = true
    const block = Event.target
    block.style.backgroundColor = 'white'
}

function eraserMouseMove(Event){
    if (eraserOn){
        const block = Event.target
        block.style.backgroundColor = 'white'
    }
}

function eraserMouseUp(){
    eraserOn = false
}

function eraserMouseLeave(){
    eraserOn = false
}

function pen(){
    grid.style.cursor = "url('static/icons/Pictogrammers-Material-Light-Pencil.16.png'), pointer"
    function draw(){
        canvas.forEach(block => {
         block.addEventListener('mousedown', drawMouseDown)
         block.addEventListener('mousemove', drawMouseMove)
         block.addEventListener('mouseup', drawMouseUp)
         reset.addEventListener('click', function(){
            isDrawing = false
            canvas.forEach(block => {
                block.removeEventListener('mousedown', drawMouseDown)
                block.removeEventListener('mouseup', drawMouseUp)
                block.removeEventListener('mousemove', drawMouseMove)
            })
         })
         eraser.addEventListener('click', function(){
            isDrawing = false
            canvas.forEach(block => {
                block.removeEventListener('mousedown', drawMouseDown)
                block.removeEventListener('mouseup', drawMouseUp)
                block.removeEventListener('mousemove', drawMouseMove)
            })
         })
        });
        grid.addEventListener('mouseleave',drawMouseLeave)
    }
    draw()
}

function erase(){
    grid.style.cursor = "url('static/icons/draw-eraser-icon.png'), pointer"
    function eraseBlock(){
        canvas.forEach(block => {
            block.addEventListener('mousedown', eraserMouseDown)
            block.addEventListener('mousemove',eraserMouseMove)
            block.addEventListener('mouseup', eraserMouseUp)
            reset.addEventListener('click', function(){
                eraserOn = false
                canvas.forEach(block => {
                    block.removeEventListener('mousedown', eraserMouseDown)
                    block.removeEventListener('mousemove', eraserMouseMove)
                    block.removeEventListener('mouseup', eraserMouseUp)
                });
            })
            penButton.addEventListener('click', function(){
                eraserOn = false
                canvas.forEach(block => {
                    block.removeEventListener('mousedown', eraserMouseDown)
                    block.removeEventListener('mousemove', eraserMouseMove)
                    block.removeEventListener('mouseup', eraserMouseUp)
                });
            })
        });
        grid.addEventListener('mouseleave',eraserMouseLeave)   
    }
    eraseBlock()
}

//logic for reset
function setInitial(){
    grid.style.cursor = "auto"
    grid.style.backgroundColor = 'white'
    rangeSlider.value = '16';
    rangeSlider.dispatchEvent(new Event('input'));
    isDrawing = false
    eraserOn = false
}

//logic for toggling different colors
document.getElementById('color').addEventListener('input', function chooseColor(){
    penColor = document.getElementById('color').value
})

rangeSlider.addEventListener('input', updateSlider)
penButton.addEventListener('click',pen)
eraser.addEventListener('click',erase)
reset.addEventListener('click',setInitial)
document.addEventListener("dragstart", event => {
    event.preventDefault();
});

//logic for rangeSlider
rangeSlider.addEventListener('input', (event) => {
    sizeTip.textContent = event.target.value;
});

rangeSlider.addEventListener('mouseover', (event) => {
    sizeTip.style.visibility = 'visible';
    sizeTip.style.opacity = '1';
});

rangeSlider.addEventListener('mouseout', () => {
    sizeTip.style.visibility = 'hidden';
    sizeTip.style.opacity = '0';
});
