var s;
var scl = 20;
var previousKey;
var food;

function setup() {
  createCanvas(400,400);
  s = new Snake();
  frameRate(10);
  pickLocation();
  previousKey = RIGHT_ARROW;
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  do{
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
  } while (wrongLocation(food, s.x, s.y, s.tail));
}

function wrongLocation(food, x, y, tail) {
  var d = dist(food.x, food.y, x,y);
  if (d < 1){
    return true;
  }

  for (var i = 0; i < tail.lenght; i++){
    var pos = this.tail[i];
    var d = dist(food.x, food.y, pos.x, pos.y);

    if (d < 1){
      return true;
    }
  }
  return false;
}

function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW && previousKey !== DOWN_ARROW){
    s.dir(0,-1);
    previousKey = UP_ARROW;
  } else if (keyCode === DOWN_ARROW && previousKey !== UP_ARROW) {
    s.dir(0,1);
    previousKey = DOWN_ARROW;
  } else if (keyCode === RIGHT_ARROW && previousKey !== LEFT_ARROW) {
    s.dir(1,0);
    previousKey = RIGHT_ARROW;
  } else if (keyCode === LEFT_ARROW && previousKey !== RIGHT_ARROW) {
    s.dir(-1,0);
    previousKey = LEFT_ARROW;
  }
}
