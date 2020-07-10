const height = 500;
const width = 1000;
const grow = 0.1;

const max_diameter = 150;
const max_diagonal = 150;

let mass_figure = [];
let area;

function setup() {
  cnv = createCanvas(width, height);
  cnv.mousePressed(createFigure);
  frameRate(60);
}
function createFigure() {
  let figure;

  switch (Math.round(random(1, 3))) {
    case 1:
      figure = new Triangle(mouseX, mouseY, area);
      break
    case 2:
      figure = new Ball(mouseX, mouseY, area);
      break
    case 3:
      figure = new Rectangle(mouseX, mouseY, area);
      break
  }
  mass_figure.push(figure);
  mass_figure[mass_figure.length - 1].chaos = area == 6;
  mass_figure[mass_figure.length - 1].direction = area;
}
function draw() {
  background('#FA8072');
  mass_figure.forEach(function (figure) {
    if (figure.posX < 0 || figure.posX > width || figure.posY < 0 || figure.posY > height 
      || figure.diameter > max_diameter || figure.diagonal > max_diagonal) 
    {
      figure.isStay = false;   //pop
    }
    else {
      for (let i = 0; i < mass_figure.length; i++) {
        if (mass_figure[i] == figure) {
          continue;
        }
        else {
          if ((figure instanceof Ball && mass_figure[i] instanceof Ball) || 
            (figure instanceof Triangle && mass_figure[i] instanceof Ball))
             
            {
            let distance = dist(figure.posX, figure.posY, mass_figure[i].posX, mass_figure[i].posY);
            if (distance <= (figure.diameter / 2 + mass_figure[i].diameter / 2)) {
              figure.isStay = false;
              mass_figure[i].isStay = false;
            }
          }

          if ((figure instanceof Ball && mass_figure[i] instanceof Rectangle) || 
          (figure instanceof Ball && mass_figure[i] instanceof Triangle) ||
          (figure instanceof Triangle && mass_figure[i] instanceof Rectangle) || 
            (figure instanceof Rectangle && mass_figure[i] instanceof Triangle)) 
          {
            let testX = figure.posX;
            let testY = figure.posY;

            if (figure.posX < mass_figure[i].posX) testX = mass_figure[i].posX;
            else if (figure.posX > mass_figure[i].posX + mass_figure[i].width) testX = mass_figure[i].posX + mass_figure[i].width
            if (figure.posY < mass_figure[i].posY) testY = mass_figure[i].posY;
            else if (figure.posY > mass_figure[i].posY + mass_figure[i].height) testY = mass_figure[i].posY + mass_figure[i].height;

            let distX = figure.posX - testX;
            let distY = figure.posY - testY;
            let distance = Math.sqrt((distX * distX) + (distY * distY));

            if (distance <= figure.diameter / 2) {
              figure.isStay = false;
              mass_figure[i].isStay = false;
            }
          }

          if ((figure instanceof Rectangle && mass_figure[i] instanceof Ball) || 
          (figure instanceof Rectangle && mass_figure[i] instanceof Triangle)) 
          {
            let testX = mass_figure[i].posX;
            let testY = mass_figure[i].posY;

            if (mass_figure[i].posX < figure.posX) testX = figure.posX;
            else if (mass_figure[i].posX > figure.posX + figure.width) testX = figure.posX + figure.width
            if (mass_figure[i].posY < figure.posY) testY = figure.posY;
            else if (mass_figure[i].posY > figure.posY + figure.height) testY = figure.posY + figure.height;

            let distX = mass_figure[i].posX - testX;
            let distY = mass_figure[i].posY - testY;
            let distance = Math.sqrt((distX * distX) + (distY * distY));

            if (distance <= mass_figure[i].diameter / 2) {
              figure.isStay = false;
              mass_figure[i].isStay = false;
            }
          }

          if (figure instanceof Rectangle && mass_figure[i] instanceof Rectangle) {
            if (figure.posX + figure.width >= mass_figure[i].posX &&
              figure.posX <= mass_figure[i].posX + mass_figure[i].width &&
              figure.posY + figure.height >= mass_figure[i].posY &&
              figure.posY <= mass_figure[i].posY + mass_figure[i].height) {
              figure.isStay = false;
              mass_figure[i].isStay = false;
            }
          }
        }
      }
    }
    mass_figure = mass_figure.filter(figure => figure.isStay);

    if (figure.chaos) {
      figure.Chaos();
    }

    figure.render();
  })
}

function move(dir) {
  dir = dir;
  mass_figure.forEach(figure => {
    figure.chaos = dir == 6;
    figure.direction = dir;
  })
}
