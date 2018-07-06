// our keras model
let model = null
let results = []

function predictImage(image) {
  // first, reshape the image
  // format for shape is [n_images, x_shape, y_shape, n_steps::channels?]
  // src: https://stackoverflow.com/questions/43895750/keras-input-shape-for-conv2d-and-manually-loaded-images
  reshapedImage = image.reshape([1, 28, 28, 1])

  // then create a tensor, which our model expects
  _tensor = tf.tensor(reshapedImage.selection.data, [1, 28, 28, 1])

  // gives an array of len num_classes
  model.predict(_tensor).data().then(function(predVector) {
    console.log(predVector)
    // loop over and check which is 1, that's your class
    for (var i = 0; i < predVector.length; i++) {
      if (predVector[i]) {
        results.push(i)
        setMessage('I see a ' + i + '!')
      }
    }
  })
}

function loadImage(src) {
  let img = new Image()
  img.src = src
  img.crossOrigin = 'Anonymous'

  img.onload = function() {
    // resize first if not correct dims
    if (this.width !== 28 || this.height !== 28) {
      clearCanvas(resizedCtx)
      resizedCtx.drawImage(img, 0, 0, 28, 28)

      loadImage(resizedCnv.toDataURL('image/jpeg'))
    } else {
      predictImage(nj.images.read(img))
    }
  }
}

document.getElementById('readDrawing').addEventListener('click', function() {
  setMessage('Let me think...')
  loadImage(drawingCnv.toDataURL('image/png'))
})

tf.loadModel('https://beatobongco.com/handy/tfjs_artifacts/model.json').then(function(res) {
  model = res
  var drawBtn = document.getElementById('readDrawing')
  drawBtn.disabled = false
  drawBtn.innerHTML = 'Read'
  setMessage('I have loaded! You can draw now! :)')
})
