class Utils {
    static getCell = (table, cell) => table.rows[cell.y].cells[cell.x];

    static inSameCell = (cell1, cell2) => (cell1.x === cell2.x && cell1.y === cell2.y);

    static directionsIncompatible = (a, b) => {
        if ((a == "up" && b == "down") || (a == "down" && b == "up") ||
            (a == "left" && b == "right") || (a == "right" && b == "left")) {
            return true;
        } else {
            return false;
        }
    }
}