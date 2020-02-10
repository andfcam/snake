class Snake {
    constructor(table, rows, columns) {
        this.table = table;
        this.rows = rows;
        this.columns = columns;

        this.body = [];
        this.x = (columns - 1) / 2;
        this.y = (rows - 1) / 2;
        this.size = 4;
        this.facing = "left";
        this.direction = "left";
    }

    initiate() {
        for (let i = 0; i < this.size; i++) this.body.push({ x: this.x + i, y: this.y });
    }

    eat() {
        const tail = { ...this.body[this.body.length - 1] };
        this.body.push(tail);
    }

    move() {
        this.setHeading();
        for (let i = this.body.length - 1; i >= 0; i--) {
            if (i === 0) this.stepForward(this.body[i]);
            else this.body[i] = Object.assign(this.body[i], this.body[i - 1]);
        }
    }

    setHeading() {
        if (Utils.directionsIncompatible(this.facing, this.direction)) return;
        else this.facing = this.direction;
    }

    stepForward(segment) {
        switch (this.facing) {
            case "up": segment.y--; break;
            case "right": segment.x++; break;
            case "down": segment.y++; break;
            case "left": segment.x--; break;
        }
        this.wrapBoundary(segment);
    }

    wrapBoundary(segment) {
        if (segment.x < 0) segment.x = this.columns - 1;
        else if (segment.y < 0) segment.y = this.rows - 1;
        else if (segment.x >= this.columns) segment.x = 0;
        else if (segment.y >= this.rows) segment.y = 0;
    }

    clear() { this.body.forEach((segment) => Utils.getCell(this.table, segment).classList.remove("snake")); }

    draw() { this.body.forEach((segment) => Utils.getCell(this.table, segment).classList.add("snake")); }
}