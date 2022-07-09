import Vector2 from '../util/Vector2.js';
import Color from '../util/Color.js';

export default (position=Vector2.zero, size=Vector2.one.mul(10), radius=4, color=Color.white, blurRadius=5) => {
    const s = size.div(2);
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