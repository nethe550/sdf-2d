class Color {

    static transparent = new Color(0,0,0,0);
    static get white() { return new Color(255,255,255) };
    static get black() { return new Color(0,0,0); }

    constructor(r, g, b, a=255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get transparent() { return new Color(this.r, this.g, this.b, 0); }
    get hex() { 
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`;
    }

    static Lerp(a, b, t) {
        const iT = 1 - t;
        return new Color(
            iT * a.r + t * b.r,
            iT * a.g + t * b.g,
            iT * a.b + t * b.b,
            iT * a.a + t * b.a,
        );
    }

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