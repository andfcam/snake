window.onload = () => {
    // fps, rows, columns
    const game = new Game(12, 25, 25);
    game.start();

    document.onkeydown = (event) => {
        switch (event.keyCode) {
           case 37: game.handleKeyPress("left"); break;
           case 38: game.handleKeyPress("up"); break;
           case 39: game.handleKeyPress("right"); break;
           case 40: game.handleKeyPress("down"); break;
        }
    }
}