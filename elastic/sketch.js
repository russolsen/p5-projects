
let SCREEN_W = 800;
let SCREEN_H = 400;


/* let objects = [
    { color: 172, d: 35, x: 200, y: 100, vx: 2, vy: -1},
    { color: 0,  d: 15, x: 140, y: 100, vx: 2, vy: -1},
    { color: 15,  d: 25, x: 10, y: 100, vx: 2, vy: -1},
    { color: 125,  d: 25, x: 100, y: 300, vx: 2, vy: -1},
]; */

let objects = [];

for (i = 0; i < 37; i++) {
    objects[i] = {
        color: i, 
        d: Math.random() * 20 + 2, 
        x: Math.random() * SCREEN_W,
        y: Math.random() * SCREEN_H,
        vx: Math.random() * 2 + 0.5,
        vy: Math.random() * 5 + 0.5}
}


function setup() {
    createCanvas(SCREEN_W, SCREEN_H);
}

function enforceBounds(o) {
    if (o.x >= SCREEN_W || o.x <= 0) {
        o.vx *= -1;
    }
    if (o.y >= SCREEN_H || o.y <= 0) {
        o.vy *= -1;
    }

}


function draw() {
    background(200);
       
    for(i = 0; i < objects.length; i++) {
        for(j=0; j < i; j++ ) {
            if (j != i) {
                a = objects[i];
                b = objects[j];
                let diameter = Math.max(a.d, b.d);
                let d = Math.hypot(a.x-b.x, a.y-b.y);
                if (d < diameter) {
                    a.vx *= -1 + Math.random() - 0.5;
                    a.vy *= -1 + Math.random() - 0.5;
                    b.vx *= -1;
                    b.vy *= -1;
                    //break;
                }
            }
        }
    }


    for(i = 0; i < objects.length; i++) {
        o = objects[i];
        enforceBounds(o);
    }


    for(i = 0; i < objects.length; i++) {
        o = objects[i];
        fill(o.color, 100, 200);
        circle(o.x, o.y, o.d);
        o.x += o.vx;
        o.y += o.vy;

    }

}