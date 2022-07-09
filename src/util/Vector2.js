/**
 * @author nethe550
 * @license MIT
 * @description A two-dimensional numerical vector.
 */

/**
 * A two-dimensional numerical vector.
 * @class
 */
class Vector2 {

    /**
     * A Vector2 with both components set to zero.
     * @returns {Vector2}
     */
    static get zero() { return new Vector2(0, 0); }
    /**
     * A Vector2 with both components set to one.
     * @returns {Vector2}
     */
    static get one() { return new Vector2(1, 1); }
    /**
     * A Vector2 pointing left.
     * @returns {Vector2}
     */
    static get left() { return new Vector2(-1, 0); }
    /**
     * A Vector2 pointing right.
     * @returns {Vector2}
     */
    static get right() { return new Vector2(1, 0); }
    /**
     * A Vector2 pointing up.
     * @returns {Vector2}
     */
    static get up() { return new Vector2(0, -1); }
    /**
     * A Vector2 pointing down.
     * @returns {Vector2}
     */
    static get down() { return new Vector2(0, 1); }

    /**
     * Creates a new two-dimensional vector.
     * @param {number} x - The x component.
     * @param {number} y - The y component.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * The magnitude, or length, of this vector.
     * @returns {number}
     */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * The normalized direction of this vector.
     * @returns {Vector2}
     */
    get normalized() {
        const m = this.magnitude;
        return new Vector2(this.x / m, this.y / m);
    }

    /**
     * Creates a copy of this vector.
     * @returns {Vector2}
     */
    copy() { return new Vector2(this.x, this.y); }

    /**
     * Adds a vector or constant to this vector.
     * @param {Vector2|number} v - The vector or constant to add.
     * @returns {Vector2} - The sum of this vector and the vector or constant.
     */
    add(v) {
        if (v instanceof Vector2) return new Vector2(this.x + v.x, this.y + v.y);
        else return new Vector2(this.x + v, this.y + v);
    }

    /**
     * Subtracts a vector or constant to this vector.
     * @param {Vector2|number} v - The vector or constant to subtract.
     * @returns {Vector2} - The difference of this vector and the vector or constant.
     */
    sub(v) {
        if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);
        else return new Vector2(this.x - v, this.y - v);
    }

    /**
     * Multiplies a vector or constant to this vector.
     * @param {Vector2|number} v - The vector or constant to multiply.
     * @returns {Vector2} - The product of this vector and the vector or constant.
     */
    mul(v) {
        if (v instanceof Vector2) return new Vector2(this.x * v.x, this.y * v.y);
        else return new Vector2(this.x * v, this.y * v);
    }

    /**
     * DIvides a vector or constant to this vector.
     * @param {Vector2|number} v - The vector or constant to divide.
     * @returns {Vector2} - The quotient of this vector and the vector or constant.
     */
    div(v) {
        if (v instanceof Vector2) return new Vector2(this.x / v.x, this.y / v.y);
        else return new Vector2(this.x / v, this.y / v);
    }

    /**
     * Calculates the maximum of an arbitrary amount of vectors, component-wise.
     * @param  {...Vector2} v - The vectors to find the maximum components of.
     * @returns {Vector2} The maximum of the respective x and y components.
     */
    static Max(...v) {
        if (v.length < 1) return null;
        if (v.length < 2) return v[0];
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        for (let vec of v) {
            maxX = Math.max(maxX, vec.x);
            maxY = Math.max(maxY, vec.y);
        }
        return new Vector2(maxX, maxY);
    }

    /**
     * Calculates the absolute value of the specified vector, component-wise.
     * @param {Vector2} v - The vector to calculate the absolute value of.
     * @returns {Vector2} The absolute value of the respective x and y components.
     */
    static Abs(v) {
        return new Vector2(
            Math.abs(v.x),
            Math.abs(v.y)
        );
    }

    /**
     * Calculates the dot product between two vectors.
     * @param {Vector2} a - The first vector.
     * @param {Vector2} b - The second vector.
     * @returns {number} The dot product of the two vectors.
     */
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * Calculates the unsigned distance between two vectors.
     * @param {Vector2} a - The first vector.
     * @param {Vector2} b - The second vector.
     * @returns {number} The unsigned distance between the two vectors.
     */
    static Distance(a, b) {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }

}

export default Vector2;