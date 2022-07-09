/**
 * @author nethe550
 * @license MIT
 * @description A collection of color utilities.
 */

/**
 * A collection of color utilities.
 * @class
 */
class Color {

    /**
     * A transparent color.
     * @type {Color}
     */
    static transparent = new Color(0,0,0,0);

    /**
     * The color white.
     * @returns {Color}
     */
    static get white() { return new Color(255,255,255) };

    /**
     * The color black.
     * @returns {Color}
     */
    static get black() { return new Color(0,0,0); }

    /**
     * Creates a new color.
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     * @param {number} [a=255] - The alpha component.
     */
    constructor(r, g, b, a=255) {
        /**
         * The red component of this color.
         * @type {number}
         */
        this.r = r;

        /**
         * The green component of this color.
         * @type {number}
         */
        this.g = g;

        /**
         * The blue component of this color.
         * @type {number}
         */
        this.b = b;

        /**
         * The alpha component of this color.
         * @type {number}
         */
        this.a = a;
    }

    /**
     * The transparent version of this color.
     * @returns {Color} 
     */
    get transparent() { return new Color(this.r, this.g, this.b, 0); }

    /**
     * The hexadecimal string representation of this color.
     * @returns {string}
     */
    get hex() { 
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`;
    }

    /**
     * Linearly interpolates between two colors.
     * @param {Color} a - The starting color.
     * @param {Color} b - The ending color.
     * @param {number} t - The percentage toward the ending color.
     * @returns {Color} The linearly interpolated color.
     */
    static Lerp(a, b, t) {
        const iT = 1 - t;
        return new Color(
            iT * a.r + t * b.r,
            iT * a.g + t * b.g,
            iT * a.b + t * b.b,
            iT * a.a + t * b.a,
        );
    }

    /**
     * Creates a color from a hexadecimal string representation.
     * @param {string} hex - The hexadecimal string color.
     * @param {number} [alpha=255] - The alpha value to use.
     * @returns {Color} The new color.
     */
    static FromHex(hex, alpha=255) {
        hex = hex.trim();
        if (hex.charAt(0) == '#') hex = hex.substring(1);
        const rgb = hex.match(/.{1,2}/g);
        return new Color(
            parseInt(rgb[0], 16),
            parseInt(rgb[1], 16),
            parseInt(rgb[2], 16),
            alpha
        );

    }

}

export default Color;