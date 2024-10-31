
let PIXELS = 1200;


let n_cells_wide = 300;
let n_cells_high = 300;

let pw = PIXELS / n_cells_wide;
let ph = PIXELS / n_cells_high;

var cells = [];
var row = 0;

//let RULE = 105;
//let RULE = 105;
let RULE = 137;
let RULE_BITS = []

for(i = 0; i<8; i++) {
    let mask = 1 << i;
    if ( RULE & mask ) {
        RULE_BITS[i] = 1
    } else {
        RULE_BITS[i] = 0;
    }
}

function setup() {
    createCanvas(PIXELS+10, PIXELS+10);
    for(i=0; i < n_cells_wide; i++ ) {
        cells[i] = 0;
    }
    cells[floor(n_cells_wide/2)] = 1;
}


function draw() {  
    let r = 10;
    let g = 190;
    let b = 180;

    for(i=0; i<n_cells_wide; i++) {
        if (cells[i] == 1) {
            fill(r,g,b);

        } else {
            fill(250,250,255);
        }
        rect(i * pw, row * ph, pw, ph);
    }

    var newCells = [];
    newCells[0] = 0;
    newCells[cells.length-1] = 0;
    for(i = 1; i < cells.length-1; i++) {
        let left = cells[i-1];
        let current = cells[i];
        let right = cells[i+1];
        let idx = (left << 2) + (current << 1) + right;
        let state = RULE_BITS[idx];
        newCells[i] = state;
    }
    cells = newCells;
 
    row = (row + 1) % n_cells_high

}