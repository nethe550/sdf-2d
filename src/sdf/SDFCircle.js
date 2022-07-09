import Vector2 from '../util/Vector2.js';
import Color from '../util/Color.js';

export default (position=Vector2.zero, radius=5, color=Color.white, blurRadius=5) => {
    return p => {
        const d = Vector2.Distance(p, position);
        if (d <= radius) return color;
        else if (d > radius && d <= radius + blurRadius) return Color.Lerp(color, color.transparent, (d - radius) / blurRadius);
        else return null;
    };
};