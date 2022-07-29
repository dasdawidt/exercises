/**
 * Submission: https://leetcode.com/submissions/detail/760075597/
 * Runtime: 118 ms, faster than 36.96% of JavaScript online submissions for Flood Fill.
 * Memory Usage: 44.2 MB, less than 60.00% of JavaScript online submissions for Flood Fill.
 */

//SOLUTION:
/**
 * @param {number[][]} image An array where each entry represents a pixel of the image at pos [i][j]. Each row/column must have equal length.
 * @param {number} sr The row of the starting pixel.
 * @param {number} sc The column of the starting pixel.
 * @param {number} color The color with which food fill should be performed.
 * @return {number[][]} The modified image Array.
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

actual = floodFill([[0,0,0],[0,0,0]], 1, 1, 2);
expected = [[2,2,2],[2,2,2]];
console.assert(JSON.stringify(actual) === JSON.stringify(expected));

actual = floodFill([[0,0,0],[0,0,0]], 1, 1, 0);
expected = [[0,0,0],[0,0,0]];
console.assert(JSON.stringify(actual) === JSON.stringify(expected));