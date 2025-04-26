let hypotenuse = Math.sqrt(800**2 + 800**2);

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  stroke(0,0,255);
  strokeWeight(3);
  point(mouseX, mouseY); 
  let a1 = 100;
  let b1 = 100;
  let a2 = 200;
  let b2 = 250;
  let m1 = 300;
  let n1 = 50;
  let m2 = 350;
  let n2 = 200;
  let k1 = 400;
  let l1 = 250;
  let k2 = 400;
  let l2 = 450;
  //Wall lines created.
  line(a1,b1,a2,b2);
  line(m1,n1,m2,n2);
  line(k1,l1,k2,l2);
  stroke(255,100);
  strokeWeight(1);
  // Walls are created by using object named "walls".
  let walls = [
    { x1: a1, y1: b1, x2: a2, y2: b2 },
    { x1: m1, y1: n1, x2: m2, y2: n2 },
    { x1: k1, y1: l1, x2: k2, y2: l2 }
  ];
  // Rays are created for a circle that covers all the canvas
  for (let angle = 0; angle < 360; angle++) {
    let radian = angle * Math.PI / 180;
    let x3 = mouseX;
    let y3 = mouseY;
    let x4 = mouseX + hypotenuse * Math.cos(radian); 
    let y4 = mouseY + hypotenuse * Math.sin(radian);

    let closestIntersection = null;
    let minDist = Infinity;
    //Closest intersection should also be calculated to decide at which wall the ray will stop.
    for (let wall of walls) {
      let intersection = getIntersection(x3, y3, x4, y4, wall.x1, wall.y1, wall.x2, wall.y2);
      if (intersection) {
        let d = dist(mouseX, mouseY, intersection.x, intersection.y);
        if (d < minDist) {
          minDist = d;
          closestIntersection = intersection;
        }
      }
    }

    if (closestIntersection) {
      line(x3, y3, closestIntersection.x, closestIntersection.y);
    } else {
      line(x3, y3, x4, y4);
    }
  }
}

// function to compute intesections between rays and walls for all rays with all corresponding walls.
function getIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denom === 0) return null; // Parallel lines, no intersection

  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };
  }
  return null;
}
