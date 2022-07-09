/**
 * @author nethe550
 * @license MIT
 * @description A circle SDF generator.
 */

import Vector2 from '../util/Vector2.js';
import Color from '../util/Color.js';

/**
 * @typedef {import('../type/Types.js').SDFCallback} SDFCallback - A callback to determine the color at a specified point.
 */

/**
 * Creates a new signed-distance field of a circle.
 * @param {Vector2} position - The position of the circle.
 * @param {number} radius - The radius of the circle.
 * @param {Color} color - The color of the circle.
 * @param {number} blurRadius - The edge blur radius.
 * @returns {SDFCallback} The signed-distance field of the line.
 */
export default (position=Vector2.zero, radius=5, color=Color.white, blurRadius=5) => {
    /**
     * The SDF of a circle.
     * @type {SDFCallback}
     */
    return p => {
        const d = Vector2.Distance(p, position);
        if (d <= radius) return color;
        else if (d > radius && d <= radius + blurRadius) return Color.Lerp(color, color.transparent, (d - radius) / blurRadius);
        else return null;
    };
};