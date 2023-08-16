//styling the container 
const flexbox = document.createElement('div')
flexbox.classList.add("flex-grid")
flexboxStyle = flexbox.style
flexboxStyle.backgroundColor="#F5F5F5"
flexboxStyle.display="flex"
flexboxStyle.justifyContent="center"
flexboxStyle.flexDirection = 'column'
flexboxStyle.alignItems = 'center'
document.body.appendChild(flexbox)

//Styling the slider
const sliderContainer = document.createElement('div')
sliderContainer.classList.add('slider-container')
sliderStyle = sliderContainer.style
sliderStyle.display="flex"
sliderStyle.justifyContent="center"
sliderStyle.alignItems = "center"
sliderStyle.marginBottom = '20px'
sliderStyle.flexDirection = 'column'
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
gridStyle = grid.style
gridStyle.display = "flex"
gridStyle.width = "480px"
gridStyle.height = "480px"
gridStyle.backgroundColor = "white"
gridStyle.borderCollapse = 'collapse'
gridStyle.border="solid 1px" 
gridStyle.overflow = "hidden"
gridStyle.flexDirection = "row"
gridStyle.flexWrap = 'wrap'
flexbox.appendChild(grid)

//Styling the inside of .grid
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


//Button menu
const buttonMenu = document.createElement('div')
buttonMenu.classList.add('menu')
buttonMenuStyle = buttonMenu.style
buttonMenuStyle.display = 'flex'
buttonMenuStyle.flexDirection = 'row'
buttonMenuStyle.justifyContent = 'center'
document.body.appendChild(buttonMenu)


//Buttons
const togglePen = document.createElement('button')
togglePen.innerText="Toggle pen"
togglePen.id= 'pen'
togglePen.style.margin="10px"

const toggleColor = document.createElement('button')
toggleColor.innerText = 'Toggle color'
toggleColor.id = 'color'
toggleColor.style.margin="10px"

const eraser = document.createElement('button')
eraser.innerText = 'Eraser'
eraser.id='eraser'
eraser.style.margin="10px"

const reset = document.createElement('button')
reset.innerText = 'Reset'
reset.id = 'reset'
reset.style.margin="10px"

buttonMenu.append(togglePen, toggleColor, eraser, reset)

//logic for pen & eraser
const penButton = document.getElementById('pen')
let canvas = document.querySelectorAll('.etchBlock') 



function drawMouseDown(Event){
    isDrawing = true
    const block = Event.target; // Get the specific block that was clicked
    block.style.backgroundColor = 'black';
}

function drawMouseMove(Event){
    if (isDrawing){
        const block = Event.target
        block.style.backgroundColor = 'black' 
    }
}

function drawMouseUp(){
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
    }
    eraseBlock()
}

function setInitial(){
    grid.style.cursor = "auto"
    gridStyle.backgroundColor = 'white'
    rangeSlider.value = '16';
    rangeSlider.dispatchEvent(new Event('input'));
    isDrawing = false
    eraserOn = false
}

rangeSlider.addEventListener('input', updateSlider)
penButton.addEventListener('click',pen)
eraser.addEventListener('click',erase)
reset.addEventListener('click',setInitial)

rangeSlider.addEventListener('input', (event) => {
    sizeTip.textContent = event.target.value; // Update the tooltip content
});

rangeSlider.addEventListener('mouseover', (event) => {
    sizeTip.style.visibility = 'visible';
    sizeTip.style.opacity = '1';
});

rangeSlider.addEventListener('mouseout', () => {
    sizeTip.style.visibility = 'hidden';
    sizeTip.style.opacity = '0';
});
