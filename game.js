class Game {
    constructor(fps, rows, columns) {
        this.fps = fps;
        this.rows = rows;
        this.columns = columns;
        this.dead = false;
        this.score = 0;
    }

    start() {
        this.createTable();

        this.display = document.getElementById('score');
        this.updateScore();

        this.snake = new Snake(this.table, this.rows, this.columns);
        this.snake.initiate();

        this.generateFood();

        this.interval = setInterval(() => {
            this.loop();
        }, 1000 / this.fps);
    }

    createTable() {
        this.table = document.querySelector('table');

        for (let r = 0; r < this.rows; r++) {
            this.table.insertRow();
            for (let c = 0; c < this.columns; c++) {
                this.table.rows[r].insertCell();
            }
        }
    }

    handleKeyPress(direction) { this.snake.direction = direction; }

    generateFood() {
        this.randomiseLocation();
        Utils.getCell(this.table, this.food).classList.add("food");
    }

    randomiseLocation() {
        this.food = {
            x: Math.floor(Math.random() * this.rows),
            y: Math.floor(Math.random() * this.columns)
        };
        for (let i = 0; i < this.snake.body.length; i++) {
            if (Utils.inSameCell(this.food, this.snake.body[i])) this.randomiseLocation();
        }
    }

    checkForCollision() {
        const head = this.snake.body[0];

        if (Utils.inSameCell(head, this.food)) this.consumeFood();

        for (let i = 1; i < this.snake.body.length; i++) {
            if (Utils.inSameCell(head, this.snake.body[i])) this.finishGame();
        }
    }

    updateScore() {
        if (this.dead) this.display.innerHTML = `Game over! Score: ${this.score}`;
        else this.display.innerHTML = this.score;
    }

    consumeFood() {
        Utils.getCell(this.table, this.food).classList.remove("food");
        this.snake.eat();
        this.generateFood();
        this.score++;
        this.updateScore();
    }

    finishGame() {
        this.dead = true;
        clearInterval(this.interval);
        this.updateScore();
    }

    loop() {
        this.snake.clear();
        this.snake.move();
        this.checkForCollision();
        this.snake.draw();
    }
}

// for ellen, customise snake color