function Figure(x, y, direction) {
    this.posX = x;
    this.posY = y;
    this.speed = 0.1;
    this.fast = random(0.02)
    this.color = {
        r: random(255),
        g: random(255),
        b: random(255)
    }
    this.direction = direction;
    this.chaos = false;    
    this.isStay = true;

    this.Left = () => {
        this.speed = this.speed + this.fast
        this.posX = this.posX - this.speed
    }

    this.Right = () => {
        this.speed = this.speed + this.fast
        this.posX = this.posX + this.speed
    }

    this.Up = () => {
        this.speed = this.speed + this.fast
        this.posY = this.posY - this.speed
    }

    this.Down = () => {
        this.speed = this.speed + this.fast
        this.posY = this.posY + this.speed
    }

    this.Random = () => {
        this.direction = Math.round(random(1, 5));
    }

    this.Chaos = () => {
        this.direction = Math.round(random(1, 5));
    }
}
function Ball(x, y, direction) {

    Figure.apply(this, [x, y, direction]);
    this.diameter = random(5, 100);
  
    this.render = () => {
      fill(this.color.r, this.color.g, this.color.b);
      this.diameter = this.diameter + grow;
      switch (this.direction) {
        case 1:
          this.Up();
          break;
        case 2:
          this.Down();
          break;
        case 3:
          this.Left();
          break;
        case 4:
          this.Right();
          break;
        case 5:
          this.Random();
          break;
      }
      circle(this.posX, this.posY, this.diameter);
    }
  }
  function Rectangle(x, y, direction) {
    Figure.apply(this, [x, y, direction]);
    this.height = random(5, 100);
    this.width = random(5, 100);
    this.diagonal;
    this.posX = this.posX - this.width / 2;
    this.posY  = this.posY - this.height / 2;
  
    this.render = () => {
      this.width = this.width + grow;
      this.height = this.height + grow;
      this.diagonal = Math.sqrt(this.width * this.width + this.height * this.height);
      fill(this.color.r, this.color.g, this.color.b);
  
      switch (this.direction) {
        case 1:
          this.Up();
          break;
        case 2:
          this.Down();
          break;
        case 3:
          this.Left();
          break;
        case 4:
          this.Right();
          break;
        case 5:
          this.Random();
          break;
      }
      rect(this.posX , this.posY, this.width, this.height);
    }
  }
  function Triangle(x, y, direction) {
    Figure.apply(this, [x, y, direction]);
    this.height = random(5, 100);
    this.width = random(5, 100);
    this.diagonal;
   
  
    this.render = () => {
      this.width = this.width + grow;
      this.height = this.height + grow;
      this.diagonal = this.width + this.height;
      fill(this.color.r, this.color.g, this.color.b);
      this.diameter = this.diameter + grow;
  
      switch (this.direction) {
        case 1:
          this.Up()
          break;
        case 2:
          this.Down()
          break;
        case 3:
          this.Left()
          break;
        case 4:
          this.Right()
          break;
        case 5:
          this.Random();
          break;
      }
      triangle(this.posX, this.posY,this.posX+this.height, this.posY+this.width,this.posX-this.height, this.posY+this.width);
    }
  }