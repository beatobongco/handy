# handy

Client-side handwritten digit recognizer

## Notes

1. First I trained a CNN through keras with the MNIST dataset. This just used the keras repo's defaults. This could still be improved but is good enough for now.

2. Then I saved the model and used `tensorflowjs_converter` to convert src: https://js.tensorflow.org/tutorials/import-keras.html

3. In index.html you'll find code that tensorflow.js uses to import the model, convert a png into a tensor, then predict the class!

## Next steps

https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
