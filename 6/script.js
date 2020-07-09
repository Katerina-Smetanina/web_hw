const height = 500;
const width = 1000;

const grow = 0.1;

const max_diameter = 150;
const max_diagonal = 150;

let figures = [];

let direction;

function setup() {
  cnv = createCanvas(width, height);
  cnv.mousePressed(createFigure);
  //strokeWeight(0);
  frameRate(60);
}

function draw() {
  background('#FA8072');
  figures.forEach(function (figure) {
    if (figure.posX < 0 || figure.posX > width || figure.posY < 0 || figure.posY > height 
      || figure.diameter > max_diameter || figure.diagonal > max_diagonal) 
    {
      figure.isStay = false;   //pop
    }
    else {
      for (let i = 0; i < figures.length; i++) {
        if (figures[i] == figure) {
          continue;
        }
        else {
          if ((figure instanceof Ball && figures[i] instanceof Ball) || 
            (figure instanceof Triangle && figures[i] instanceof Ball))
             
            {
            let distance = dist(figure.posX, figure.posY, figures[i].posX, figures[i].posY);
            if (distance <= (figure.diameter / 2 + figures[i].diameter / 2)) {
              figure.isStay = false;
              figures[i].isStay = false;
            }
          }

          if ((figure instanceof Ball && figures[i] instanceof Rectangle) || 
          (figure instanceof Ball && figures[i] instanceof Triangle) ||
          (figure instanceof Triangle && figures[i] instanceof Rectangle) || 
            (figure instanceof Rectangle && figures[i] instanceof Triangle)) 
          {
            let testX = figure.posX;
            let testY = figure.posY;

            if (figure.posX < figures[i].posX) testX = figures[i].posX;
            else if (figure.posX > figures[i].posX + figures[i].width) testX = figures[i].posX + figures[i].width
            if (figure.posY < figures[i].posY) testY = figures[i].posY;
            else if (figure.posY > figures[i].posY + figures[i].height) testY = figures[i].posY + figures[i].height;

            let distX = figure.posX - testX;
            let distY = figure.posY - testY;
            let distance = Math.sqrt((distX * distX) + (distY * distY));

            if (distance <= figure.diameter / 2) {
              figure.isStay = false;
              figures[i].isStay = false;
            }
          }

          if ((figure instanceof Rectangle && figures[i] instanceof Ball) || 
          (figure instanceof Rectangle && figures[i] instanceof Triangle)) 
          {
            let testX = figures[i].posX;
            let testY = figures[i].posY;

            if (figures[i].posX < figure.posX) testX = figure.posX;
            else if (figures[i].posX > figure.posX + figure.width) testX = figure.posX + figure.width
            if (figures[i].posY < figure.posY) testY = figure.posY;
            else if (figures[i].posY > figure.posY + figure.height) testY = figure.posY + figure.height;

            let distX = figures[i].posX - testX;
            let distY = figures[i].posY - testY;
            let distance = Math.sqrt((distX * distX) + (distY * distY));

            if (distance <= figures[i].diameter / 2) {
              figure.isStay = false;
              figures[i].isStay = false;
            }
          }

          if (figure instanceof Rectangle && figures[i] instanceof Rectangle) {
            if (figure.posX + figure.width >= figures[i].posX &&
              figure.posX <= figures[i].posX + figures[i].width &&
              figure.posY + figure.height >= figures[i].posY &&
              figure.posY <= figures[i].posY + figures[i].height) {
              figure.isStay = false;
              figures[i].isStay = false;
            }
          }
        }
      }
    }
    figures = figures.filter(figure => figure.isStay);

    if (figure.chaos) {
      figure.Chaos();
    }

    figure.render();
  })
}

function createFigure() {
  let figure;

  switch (Math.round(random(1, 3))) {
    case 1:
      figure = new Triangle(mouseX, mouseY, direction);
      break
    case 2:
      figure = new Ball(mouseX, mouseY, direction);
      break
    case 3:
      figure = new Rectangle(mouseX, mouseY, direction);
      break
  }
  figures.push(figure);
  figures[figures.length - 1].chaos = direction == 6;
  figures[figures.length - 1].direction = direction;
}

function move(dir) {
  direction = dir;
  figures.forEach(figure => {
    figure.chaos = direction == 6;
    figure.direction = dir;
  })
}
