/**
 * @author nethe550
 * @license MIT
 * @description An iterable image.
 */

/**
 * @typedef {import('../type/Types.js').SDFCallback} SDFCallback - A callback to determine the color at a specified point.
 */

import Vector2 from '../util/Vector2.js';

/**
 * An iterable image.
 * @class
 */
class IImage {

    /**
     * Creates a new iterable image.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     */
    constructor(width, height) {

        /**
         * The raw image data of this iterable image.
         * @type {ImageData}
         */
        this.image = new ImageData(width, height);

    }

    /**
     * The width of this iterable image.
     * @returns {number}
     */
    get width() { return this.image.width; }

    /**
     * The height of this iterable image.
     * @returns {number}
     */
    get height() { return this.image.height; }

    /**
     * Iterates over every pixel in this image, and assigns a color returned by the specified callback.
     * @param {SDFCallback} callback - The callback that determines the color of each pixel.
     */
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

    /**
     * Renders this iterable image to a canvas rendering context/
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context to draw this image to.
     */
    render(ctx) {
        ctx.putImageData(this.image, 0, 0);
    }

}

export default IImage;