/**
 * @author nethe550
 * @license MIT
 * @description A line SDF generator.
 */

import Vector2 from '../util/Vector2.js';
import Color from '../util/Color.js';

/**
 * @typedef {import('../type/Types.js').SDFCallback} SDFCallback - A callback to determine the color at a specified point.
 */

/**
 * Creates a new signed-distance field of a line.
 * @param {Vector2} a - The position of the first point.
 * @param {Vector2} b - The position of the second point.
 * @param {number} thickness - The thickness of the line.
 * @param {Color} color - The color of the line.
 * @param {number} blurRadius - The edge blur radius.
 * @returns {SDFCallback} The signed-distance field of the line.
 */
export default (a=Vector2.zero, b=Vector2.one, thickness=5, color=Color.white, blurRadius=5) => {
    /**
     * The SDF of a line.
     * @type {SDFCallback}
     */
    return p => {
        const pMinusA = p.sub(a);
        const bMinusA = b.sub(a);
        const h = Math.min(
            1,
            Math.max(
                0,
                Vector2.Dot(pMinusA, bMinusA) / Vector2.Dot(bMinusA, bMinusA)
            )
        );
        const d = pMinusA.sub(bMinusA.mul(h)).magnitude;
        const r = thickness / 2;
        if (d <= r) return color;
        else if (d > r && d <= r + blurRadius) return Color.Lerp(color, color.transparent, (d - r) / blurRadius);
        else return null;
    };
};