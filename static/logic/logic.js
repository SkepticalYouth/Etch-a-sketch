const flexbox = document.createElement('div')
flexbox.classList.add("flex-grid")

//styling the container 
flexboxStyle = flexbox.style
flexboxStyle.backgroundColor="#F5F5F5"
flexboxStyle.display="flex"
flexboxStyle.justifyContent="center"
document.body.appendChild(flexbox)

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
let i = 0
while (i<256){
    const miniBox = document.createElement('div')
    miniBoxStyle = miniBox.style
    miniBoxStyle.width = '30px'
    miniBoxStyle.height = '30px'
    miniBoxStyle.border = 'none'
    miniBox.classList.add('etchBlock')
    // miniBoxStyle.borderCollapse = 'collapse'
    grid.appendChild(miniBox)
    i +=1  
}



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
// togglePen.classList.add("common")
togglePen.id= 'pen'
togglePen.style.margin="10px"

const toggleColor = document.createElement('button')
toggleColor.innerText = 'Toggle color'
// toggleColor.classList.add("common")
toggleColor.id = 'color'
toggleColor.style.margin="10px"

const eraser = document.createElement('button')
eraser.innerText = 'Eraser'
// eraser.classList.add("common")
eraser.id='eraser'
eraser.style.margin="10px"

const reset = document.createElement('button')
reset.innerText = 'Reset'
reset.id = 'reset'
// reset.classList.add("common")
reset.style.margin="10px"

//Styling the buttons
// buttons = document.querySelectorAll(".common")
// buttons.forEach(button => {
//     button.style.margin = '10px'
// });

buttonMenu.append(togglePen, toggleColor, eraser, reset)

const penButton = document.getElementById('pen')
const canvas = document.querySelectorAll('.etchBlock') 

let isDrawing = false
let eraserOn = false

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
    function erase(){
        canvas.forEach(block => {
            block.addEventListener('mousedown', eraserMouseDown)
            block.addEventListener('mousemove',eraserMouseMove)
            block.addEventListener('mouseup', eraserMouseUp)
            reset.addEventListener('click', function(){
                canvas.forEach(block => {
                    block.removeEventListener('mousedown', eraserMouseDown)
                    block.removeEventListener('mousemove', eraserMouseMove)
                    block.removeEventListener('mouseup', eraserMouseUp)
                });
            })
        });   
    }
    erase()
}

function setInitial(){
    grid.style.cursor = "auto"
    canvas.forEach(block => {
        block.style.backgroundColor='white'
    });
    isDrawing = false
    eraserOn = false
}

penButton.addEventListener('click',pen)
eraser.addEventListener('click',erase)
reset.addEventListener('click',setInitial)