class Vector2 {

    static get zero() { return new Vector2(0, 0); }
    static get one() { return new Vector2(1, 1); }
    static get left() { return new Vector2(-1, 0); }
    static get right() { return new Vector2(1, 0); }
    static get up() { return new Vector2(0, -1); }
    static get down() { return new Vector2(0, 1); }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    get normalized() {
        const m = this.magnitude;
        return new Vector2(this.x / m, this.y / m);
    }

    copy() { return new Vector2(this.x, this.y); }

    add(v) {
        if (v instanceof Vector2) return new Vector2(this.x + v.x, this.y + v.y);
        else return new Vector2(this.x + v, this.y + v);
    }

    sub(v) {
        if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);
        else return new Vector2(this.x - v, this.y - v);
    }

    mul(v) {
        if (v instanceof Vector2) return new Vector2(this.x * v.x, this.y * v.y);
        else return new Vector2(this.x * v, this.y * v);
    }

    div(v) {
        if (v instanceof Vector2) return new Vector2(this.x / v.x, this.y / v.y);
        else return new Vector2(this.x / v, this.y / v);
    }

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

    static Abs(v) {
        return new Vector2(
            Math.abs(v.x),
            Math.abs(v.y)
        );
    }

    static Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    static Distance(a, b) {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }

}

export default Vector2;