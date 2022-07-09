import Vector2 from '../util/Vector2.js';

class IImage {

    constructor(width, height) {

        this.image = new ImageData(width, height);

    }

    get width() { return this.image.width; }
    get height() { return this.image.height; }

    fragment(callback) {

        for (let i = 0; i < this.image.data.length; i += 4) {
            
            const p = new Vector2(
                (i / 4) % this.image.width,
                Math.floor((i / 4) / this.image.width)
            );
            
            const c = callback(p, this.image);
            if (c) {
                this.image.data[i] = c.r;
                this.image.data[i+1] = c.g;
                this.image.data[i+2] = c.b;
                this.image.data[i+3] = c.a;
            }

        }

    }

    render(ctx) {
        ctx.putImageData(this.image, 0, 0);
    }

}

export default IImage;