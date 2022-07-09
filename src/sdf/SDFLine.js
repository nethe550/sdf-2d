import Vector2 from '../util/Vector2.js';
import Color from '../util/Color.js';

export default (a=Vector2.zero, b=Vector2.one, thickness=5, color=Color.white, blurRadius=5) => {
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