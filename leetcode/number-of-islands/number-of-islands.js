//SOLUTION:
/**
 * @param {character[][]} grid A grid of '0' and '1' where '0' is water and '1' is land.
 * @return {number} The number of islands in the grid.
 */
 var numIslands = function(grid) {
    let count = 0;
    let position = [0, 0];
    while (true) {
        position = findValue(grid, '1', position[0], position[1]);
        if (position[0] < 0 || position[1] < 0) {
            break;
        }
        count++;
        grid = floodFill(grid, position[0], position[1], '0');
    }
    return count;
};

/**
 * @param {character[][]} grid A grid of values.
 * @param {character} value A value.
 * @param {number} rowStart The starting row.
 * @param {number} columnStart The starting column.
 * @return {number[]} The position of the value, [-1, -1] if not found.
 */
var findValue = function(grid, value, rowStart = 0, columnStart = 0) {
    if (rowStart < 0 || columnStart < 0) {
        throw new Error('Parameters rowStart and rowEnd must be 0 or higher.');
    }
    for (let i = rowStart; i < grid.length; i++) {
        for (let j = columnStart; j < grid[j.length]; j++) {
            if (grid[i][j] == value) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

/**
 * @param {character[][]} image An array where each entry represents a pixel of the image at pos [i][j]. Each row/column must have equal length.
 * @param {number} sr The row of the starting pixel.
 * @param {number} sc The column of the starting pixel.
 * @param {character} color The color with which food fill should be performed.
 * @return {character[][]} The modified image Array.
 */
 var floodFill = function(image, sr, sc, newColor) {
    let oldColor = image[sr][sc];
    if (oldColor == newColor) {
        return image;
    }
    let stack = [];
    stack.push([sr, sc]);
    while (stack.length > 0) {
        let pair = stack.pop();
        sr = pair[0];
        sc = pair[1];
        if (sr < 0 || sc < 0) {
            continue;
        }
        if (sr >= image.length || sc >= image[0].length) {
            continue;
        }
        if (image[sr][sc] != oldColor) {
            continue;
        }
        image[sr][sc] = newColor;
        stack.push(
            [sr-1, sc],  //above
            [sr, sc-1],  //left
            [sr, sc+1],  //right
            [sr+1, sc]   //below
        );
    }
    return image;
};

//TESTS:
let actual = floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2);
let expected = [[2,2,2],[2,2,0],[2,0,1]];
console.assert(JSON.stringify(actual) === JSON.stringify(expected));