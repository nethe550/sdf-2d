/**
 * @author nethe550
 * @license MIT
 * @description A box SDF generator.
 */

import Vector2 from '../util/Vector2.js';
import Color from '../util/Color.js';

/**
 * @typedef {import('../type/Types.js').SDFCallback} SDFCallback - A callback to determine the color at a specified point.
 */

/**
 * Creates a new signed-distance field of a box.
 * @param {Vector2} position - The position of the box.
 * @param {Vector2} size - The size of the box.
 * @param {number} radius - The border radius of the box.
 * @param {Color} color - The color of the box.
 * @param {number} blurRadius - The edge blur radius.
 * @returns {SDFCallback} The signed-distance field of the line.
 */
export default (position=Vector2.zero, size=Vector2.one.mul(10), radius=4, color=Color.white, blurRadius=5) => {
    const s = size.div(2);
    /**
     * The SDF of a box.
     * @type {SDFCallback}
     */
    return p => {
        p = p.sub(position.add(s));
        const q = Vector2.Abs(p).sub(s);

        const dm = Vector2.Max(q, Vector2.zero);

        const d = Math.sqrt(dm.x ** 2 + dm.y ** 2) + Math.min(Math.max(q.x, q.y), 0);

        if (d <= radius) return color;
        else if (d > radius && d <= radius + blurRadius) return Color.Lerp(color, color.transparent, (d - radius) / blurRadius);
        else return null;
    };
};