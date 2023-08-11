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
gridStyle.width = "480px"
gridStyle.height = "480px"
gridStyle.backgroundColor = "white"
gridStyle.border="solid 1px"
flexbox.appendChild(grid)



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
togglePen.classList.add("common")
togglePen.style.margin="10px"

const toggleColor = document.createElement('button')
toggleColor.innerText = 'Toggle color'
toggleColor.classList.add("common")
toggleColor.style.margin="10px"

const eraser = document.createElement('button')
eraser.innerText = 'Eraser'
eraser.classList.add("common")
eraser.style.margin="10px"

const reset = document.createElement('button')
reset.innerText = 'Reset'
reset.classList.add("common")
reset.style.margin="10px"

//Styling the buttons
// buttons = document.querySelectorAll(".common")
// buttons.forEach(button => {
//     button.style.margin = '10px'
// });

buttonMenu.append(togglePen, toggleColor, eraser, reset)
