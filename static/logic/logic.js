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
rangeSlider.max = '100';
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

const rainbow = document.createElement('button')
rainbow.innerText = 'Rainbow'
rainbow.id = 'rainbow'

buttonMenu.append(togglePen, toggleColor, eraser, reset, rainbow)

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
// let isDrawing = false
// let eraserOn = false
let isMouseDown
let drawMode

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

//Testing function for draw
function testDrawMouseDown(){
    isMouseDown = true
}

function testDrawMouseUp(){
    isMouseDown = false
}

function testDrawMouseMove(Event){
    const block = Event.target
    if (isMouseDown === true){
        block.style.backgroundColor = penColor
    } 
}

function testRemoveDrawEventListener(){
    grid.removeEventListener('mousedown', testDrawMouseDown)
    window.removeEventListener('mouseup', testDrawMouseUp)
    canvas.forEach(element => {
        element.removeEventListener('mouseenter',testDrawMouseMove)
    });
}

//Testing function for eraser
function testEraserMouseDown(Event){
    const block = Event.target
    if (isMouseDown === true){
        block.style.backgroundColor = 'white'
    }
}

//Remove drawEventListener
function removePenEventListener(){
    grid.addEventListener('mousedown', testDrawMouseDown)
    window.addEventListener('mouseup', testDrawMouseUp)
    canvas.forEach(element => {
        element.removeEventListener('mouseenter',testDrawMouseMove)
    });
}

//Remove EraserEventListene
function removeEraserEventListener(){
    canvas.forEach(element => {
        element.removeEventListener('mouseenter', testEraserMouseDown)
    });
}
function draw(){
    grid.style.cursor = "url('static/icons/Pictogrammers-Material-Light-Pencil.16.png'), pointer"
    drawMode = true
    grid.addEventListener('mousedown', testDrawMouseDown)
    window.addEventListener('mouseup', testDrawMouseUp)
    canvas.forEach(element => {
        element.addEventListener('mouseenter',testDrawMouseMove)
    });
    eraser.addEventListener('click',removePenEventListener)  
}

function erase(){
    grid.style.cursor = "url('static/icons/draw-eraser-icon.png'), pointer"
    drawMode = false
    canvas.forEach(element => {
        element.addEventListener('mouseenter',testEraserMouseDown)
    });
    penButton.addEventListener('click', eraser)
    
}

//logic for reset
function setInitial(){
    grid.style.cursor = "auto"
    grid.style.backgroundColor = 'white'
    rangeSlider.value = '16';
    rangeSlider.dispatchEvent(new Event('input'));
    isMouseDown = undefined
    drawMode = undefined
    grid.style.cursor = "auto"
    reset.addEventListener('click',testRemoveDrawEventListener)
    reset.addEventListener('click',removeEraserEventListener)
}

//logic for toggling different colors
document.getElementById('color').addEventListener('input', function chooseColor(){
    penColor = document.getElementById('color').value
})

rangeSlider.addEventListener('input', updateSlider)

//Initialize pen
penButton.addEventListener('click',draw)

//Initialize eraser
eraser.addEventListener('click',erase)

//Initialize reset
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

grid.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    if (drawMode === true){
        draw(e);
    } else if (drawMode === false) {
        erase(e)
    } else{
        ;;
    }
});

window.addEventListener("mouseup", () => {
    isMouseDown = false;
});