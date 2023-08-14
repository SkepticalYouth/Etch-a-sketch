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

function pen(){
    grid.style.cursor = "url('static/icons/pen_337127.png'), pointer"
    let isDrawing = false
    function draw(){
        canvas.forEach(block => {
         block.addEventListener('mousedown', function(){
            isDrawing = true
            block.style.backgroundColor = 'black'
         })
         block.addEventListener('mousemove', function(){
            if (isDrawing){
                block.style.backgroundColor = 'black'
            }
         })
         block.addEventListener('mouseup', function(){
            isDrawing = false
         })
        });
    }
    draw()
}

function erase(){
    grid.style.cursor = "url('static/icons/draw-eraser-icon.png'), pointer"
}

function setInitial(){
    grid.style.cursor = "auto"
    canvas.forEach(block => {
        block.style.backgroundColor='white'
    });
}

penButton.addEventListener('mousedown',pen)
eraser.addEventListener('click',erase)
reset.addEventListener('click',setInitial)