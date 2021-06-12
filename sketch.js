let bubbles = [];
let rxpos = 0;
let rsize = 0;
let animationStart = 0;
let animation = -1;
let animationTime = 30;
let animationPercentage = 0;
let fogo = true;
let bgCounter = 0;
let returning = false;

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
    button.style('background-color', 'transparent');
    button.style('color', 'red');
    button.style('border-color', 'red');
    //button.style('position', 'absolute');
    button.center();
    button.style('top', '60%');
    button.style('transition', 'opacity', '10s')

    //button.position(width/2, height*3/5);
    button.mousePressed(expurgatio);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //button.center();
}

function draw(){

    background(0);
    if (animation>=0) {
        animate();
    } else if (animation >= 150) {
        returning = true;
    }
    if(returning == true){
        eraseText();
        bgCounter = -1;
    }
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
        rxpos = randomGaussian(width / 2, width / 50);
        rsize = 150 -  Math.abs((rxpos - width / 2));
        bubbles.push(new Bubble(rxpos, rsize));
/*        rxpos2 = randomGaussian(width / 2, width / 50);
        rsize2 = 150 -  Math.abs((rxpos - width / 2));
        bubbles.push(new Bubble(rxpos2, rsize2));
        rxpos3 = randomGaussian(width / 2, width / 100);
        rsize3 = 150 -  Math.abs((rxpos - width / 2));
        bubbles.push(new Bubble(rxpos3, rsize3));
        */
    }
    
}

class Bubble{
    constructor(xpos, size){
        this.x = xpos;
        this.y = height - random(0, 50);
        this.dx = 0;
        this.dy = -5;
        this.size = size;
        this.hsize = size;
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
        ellipse(this.x, this.y-50, this.size, this.hsize);
        //ellipse(this.x+width/3, this.y, this.size, this.hsize);
        //ellipse(this.x-width/3, this.y, this.size, this.hsize);
    }
    
    update(){
        this.size -= 2.4; 
        this.hsize -= 2;
        
        this.dy -= pow(Math.abs(this.y - height),2) / 1000000; 
    
        if (this.alpha < 50 && fogo==true){ 
            this.alpha += 2;
        }
        if (this.brightness < 100){ 
            this.brightness += 2;
        }
        /*if (this.hue < 40 / 360 * 100){ 
            this.hue += 0.3;
        }*/
        
    }
        
}

function expurgatio() {
    bgCounter = 1;
    fogo= false;
    animationStart = frameCount;
    animation = 0;
    document.getElementById("caixaDeTexto").style.opacity = "0";
}

function animate() {
    animation += bgCounter;
    background(0,100,animation);
}

function eraseText() {
    document.getElementById("caixaDeTexto").value = "";
}


