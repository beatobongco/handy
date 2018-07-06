// tells us whether we are allowed to draw on canvas
let paint = null

// canvas vars
let resizedCnv = document.getElementById('resized-drawing')
let resizedCtx = resizedCnv.getContext('2d')
let drawingCnv = document.getElementById('drawing-canvas')
let drawingCtx = drawingCnv.getContext('2d')

drawingCtx.fillStyle = '#000'
resizedCtx.fillStyle = '#000'
drawingCtx.strokeStyle = '#fff'
drawingCtx.lineJoin = 'round'
drawingCtx.lineWidth = 20

// our drawing canvas' state
let clickX = []
let clickY = []
let clickDrag = []

function setMessage(msg) {
  document.getElementById('message').innerHTML = msg
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function addClick(x, y, dragging) {
  clickX.push(x)
  clickY.push(y)
  clickDrag.push(dragging)
}

function redraw() {
  // clear canvas
  clearCanvas(drawingCtx)

  for (var i = 0; i < clickX.length; i++) {
    drawingCtx.beginPath()
    // dont activate on i = 0
    if (clickDrag[i] && i) {
      drawingCtx.moveTo(clickX[i - 1], clickY[i - 1])
    } else {
      drawingCtx.moveTo(clickX[i] - 1, clickY[i])
    }
    drawingCtx.lineTo(clickX[i] - 1, clickY[i])
    drawingCtx.closePath()
    drawingCtx.stroke()
  }
}

function clearAllCanvas() {
  clickX = []
  clickY = []
  clickDrag = []
  clearCanvas(drawingCtx)
  clearCanvas(resizedCtx)
}

function mouseMove(e, cnv) {
  if (paint) {
    var mouseX = e.pageX - cnv.offsetLeft
    var mouseY = e.pageY - cnv.offsetTop
    addClick(mouseX, mouseY, true)
    redraw()
  }
}

function touchMove(e, cnv) {
  if (paint) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      var mouseX = e.changedTouches[i].pageX - cnv.offsetLeft
      var mouseY = e.changedTouches[i].pageY - cnv.offsetTop
      addClick(mouseX, mouseY, true)
    }
    redraw()
  }
}

function mouseDown(e, cnv) {
  var mouseX = e.pageX - cnv.offsetLeft
  var mouseY = e.pageY - cnv.offsetTop
  paint = true
  addClick(mouseX, mouseY)
  redraw()
}

drawingCnv.addEventListener('mousedown', function(e) {
  mouseDown(e, this)
})

drawingCnv.addEventListener('touchstart', function(e) {
  e.preventDefault()
  paint = true
})

drawingCnv.addEventListener('touchmove', function(e) {
  e.preventDefault()
  touchMove(e, this)
})

drawingCnv.addEventListener('mousemove', function(e) {
  mouseMove(e, this)
})

drawingCnv.addEventListener('mouseleave', function() {
  paint = false
})

drawingCnv.addEventListener('mouseup', function() {
  paint = false
})

drawingCnv.addEventListener('touchend', function() {
  paint = false
})

drawingCnv.addEventListener('touchcancel', function() {
  paint = false
})

document.getElementById('clear').addEventListener('click', clearAllCanvas)

clearAllCanvas()
