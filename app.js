
//calling the canvas API
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//fixinf the width and height of the canvas manually
canvas.width = innerWidth
canvas.height = innerHeight

//Declaring the position of the ball
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

//picking colors for the balls
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const radius = 30;
const gravity = 1;
const friction = 0.9;

// Event Listeners
//Tracking the mousemove
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

//To track resizing
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

//Utility functions
function randomIntFromRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if(this.y + this.radius > canvas.height - 30){
        this.dy = -this.dy * friction;
    } else {
        this.dy += gravity;
    }
        this.y += this.dy;
    this.draw()
  }
}

// Implementation
let objects;
var ball;
var ballArray = [];
console.log(ballArray);
function init() {
    for(var i = 0; i < 200; i++){
        ballArray.push(new Ball(randomIntFromRange(0, canvas.width), randomIntFromRange(0, canvas.height - radius - 50), gravity, radius, randomColor()))
    }
    ball = new Ball(canvas.width / 2, canvas.height / 2, 2, radius, randomColor())
}


// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  for(i = 0; i < ballArray.length; i++){
    ballArray[i].update();
  }
  // objects.forEach(object => {
  //  object.update()
  // })
  ball.update()
}

init()
animate()
