# sdf-2d
A 2D signed-distance field renderer.

![A screenshot of the editor implementation.](https://github.com/nethe550/sdf-2d/raw/main/thumbnail.png)

## Usage
### Editor Implementation
Open the [`/impl/index.html`](https://github.com/nethe550/sdf-2d/blob/main/impl/index.html) file in a web browser.
### Custom Implementation Example
```js
import IImage from 'path/to/IImage.js';
import Color from 'path/to/Color.js';

// get reference to canvas and rendering context.
const canvas = document.querySelector('#yourCanvas');
const ctx = canvas.getContext('2d');

// create new iterable image.
const image = new IImage(canvas.width, canvas.height);

// iterate a callback to determine the color 
// of the pixel at 'point'
image.fragment((point, data) => {
  return new Color(
    Math.floor(point.x / canvas.width * 255),
    Math.floor(point.y / canvas.height * 255),
    0,
    255
  );
});

// render image to rendering context
image.render(ctx);
```
