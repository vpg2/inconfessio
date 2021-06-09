let bubbles = [];
let rxpos = 0;
let rsize = 0;

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvasForHTML');
    canvas.position(0,0);
    canvas.style('z-index', '-1', 'display', 'block');

    
    ellipseMode(CENTER);
    colorMode(HSB, 100);
    bub = new Bubble(width / 2, 50);
    
    let col0 = color(0);
    let button = createButton('expurgatio');
    button.style('background-color', col0);
    button.style('color', 'white');
    button.style('position', 'absolute');
    //button.style('left', '50%');
    button.center();
    button.style('top', '60%');

    //button.position(width/2, height*3/5);
    button.mousePressed(eraseText);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    background(0);

    for(const bub of bubbles){
        bub.move();
        bub.draw();
        bub.update();
        if (bub.y < 0 || bub.size < 0){		//tá viva?
            bub.alive = 0;
        }
    }

    for (let i = 0; i < bubbles.length; i++) { // ?
        if (bubbles[i].alive == 0) {
            bubbles.splice(i, 1);
        }
    }

    if( frameCount % 1 == 0){			//todo quadro?
        rxpos = randomGaussian(width / 2, width / 10);
        rsize = 150 -  Math.abs((rxpos - width / 2));
        bubbles.push(new Bubble(rxpos, rsize));
    }
}

class Bubble{
    constructor(xpos, size){
        this.x = xpos;
        this.y = height - random(0, 50);
        this.dx = 0;
        this.dy = -5;
        this.size = size;
        this.brightness = 50;
        this.saturation = 100;
        this.hue = 0;
        this.alive = 1;
        this.alpha = 0;
    }
    
    move(){
        this.x += this.dx;
        this.y += this.dy;
    }
    
    draw(){
        noStroke();
        fill(this.hue,  this.saturation, this.brightness, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
    
    update(){
        this.size -= 2.4; 
        
        this.dy -= pow(Math.abs(this.y - height),2) / 1000000; 
    
        if (this.alpha < 50){ 
            this.alpha += 2;
        }
        if (this.brightness < 100){ 
            this.brightness += 2;
        }
        if (this.hue < 40 / 360 * 100){ 
            this.hue += 0.3;
        }
        
    }
        
}

function eraseText() {
    document.getElementById("caixaDeTexto").value = "";
}