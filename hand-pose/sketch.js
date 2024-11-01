
let video;
let handPose;
let hands = [];

let hx = 0;
let hy = 0;

let ball = { x: 100, y: 100, vx: 1, vy: 1, d: 9};

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);  
}

function gotHands(results) {
  hands = results;
}

function videoLoaded() {}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped:true }, videoLoaded);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        for (let i = 8; i < 9; i++) {
          let keypoint = hand.keypoints[i];
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }
          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }
      }
    }

    if (hands.length > 0) {
        let hand = hands[0];
        hx = hand.keypoints[8].x;
        hy = hand.keypoints[8].y;
    }
  }

  fill(124, 255, 255);
  circle(ball.x, ball.y, ball.d);
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.x > 640 || ball.x <= 0) {
    ball.vx *= -1;
  }
  if (ball.y > 480 || ball.y <= 0) {
    ball.vy *= -1;
  }
  if (Math.abs(ball.x - hx) < ball.d) {
    ball.vx *= -1;
  }
  if (Math.abs( ball.y - hy) < ball.d) {
    ball.vy *= -1;
  }
}
