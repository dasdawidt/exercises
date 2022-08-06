/**
 * Submission: https://leetcode.com/submissions/detail/766924849/
 * Runtime: 317 ms, faster than 16.10% of JavaScript online submissions for Number of Enclaves.
 * Memory Usage: 62.3 MB, less than 9.27% of JavaScript online submissions for Number of Enclaves.
 */

//SOLUTION:
/**
 * @param {number[][]} grid A grid of 0 and 1 where 0 is water and 1 is land.
 * @return {number} The number of islands in the grid that are connected to the border.
 */
 var numEnclaves = function(grid) {
    console.log(grid);
    for (let i = 0; i < grid[0].length; i++) {
        grid = floodFill(grid, 0, i, 0).grid;
    }
    for (let i = 1; i < grid.length-1; i++) {
        grid = floodFill(grid, i, 0, 0).grid;
        grid = floodFill(grid, i, grid[i].length-1, 0).grid;
    }
    for (let i = 0; i < grid[grid.length-1].length; i++) {
        grid = floodFill(grid, grid.length-1, i, 0).grid;
    }
    let count = 0;
    let position = [0, 0];
    while (true) {
        position = findValue(grid, '1', position[0], position[1]);
        if (position[0] < 0 || position[1] < 0) {
            break;
        }
        let result = floodFill(grid, position[0], position[1], '0');
        grid = result.grid;
        count += result.area;
    }
    return count;
};

/**
 * @param {number[][]} grid A grid of values.
 * @param {number} value A value.
 * @param {number} rowStart 
 * @param {number} columnStart
 * @return {number[]} The position of the value, [-1, -1] if not found.
 */
var findValue = function(grid, value, rowStart = 0, columnStart = 0) {
    if (rowStart < 0 || columnStart < 0) {
        throw new Error('Parameters rowStart and rowEnd must be 0 or higher.');
    }
    for (let i = rowStart; i < grid.length; i++) {
        for (let j = columnStart; j < grid[i].length; j++) {
            if (grid[i][j] == value) {
                return [i, j];
            }
        }
        columnStart = 0;
    }
    return [-1, -1];
}

class FloodFillResult {
    grid;
    area;
    constructor(grid, area) {
        this.area = area;
        this.grid = grid;
    }
}

/**
 * @param {character[][]} image An array where each entry represents a pixel of the image at pos [i][j]. Each row/column must have equal length.
 * @param {number} sr The row of the starting pixel.
 * @param {number} sc The column of the starting pixel.
 * @param {number} color The color with which food fill should be performed.
 * @return {FloodFillResult} An oject containing the resulting grid and the number (area) of changed fields.
 */
 var floodFill = function(image, sr, sc, newColor) {
    let oldColor = image[sr][sc];
    if (oldColor == newColor) {
        return new FloodFillResult(image, 0);
    }
    let stack = [];
    let area = 0;
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
        area++;
        stack.push(
            [sr-1, sc],  //above
            [sr, sc-1],  //left
            [sr, sc+1],  //right
            [sr+1, sc]   //below
        );
    }
    return new FloodFillResult(image, area);
};

//TESTS:
let actual = numEnclaves([[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]);
let expected = 3;
console.log(`actual: ${actual}; expected: ${expected}`);
console.assert(JSON.stringify(actual) === JSON.stringify(expected));

actual = numEnclaves([[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]);
expected = 0;
console.log(`actual: ${actual}; expected: ${expected}`);
console.assert(JSON.stringify(actual) === JSON.stringify(expected));