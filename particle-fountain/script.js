var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var particles = [];
var colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];
var amount = 1000;
var speedX = 1;
var speedY = 1;

// create particles
function initParticles() {
    for (var i = 0; i < amount; i++) {
        setTimeout(createParticle, 20*i, i);
    }
}

// create a single particle
function createParticle(i) {

    // initial position in middle of canvas
    var x = width*0.5;
    var y = height*0.5;

    // randomize the vx and vy a little - but we still want them flying 'up' and 'out'
    var vx,
        vy

    // get random direction (true = positive direction, false = negative direction)
    var directionX = !!Math.floor(Math.random() * 2),
        directionY = !!Math.floor(Math.random() * 2);

    vx = (directionX ? -speedX : speedX) * Math.random();
    vy = Math.random()* (directionY ? -speedY : speedY);

    // randomize size and opacity a little & pick a color from our color palette
    var size = 5+Math.random()*5;
    var color = colors[i%colors.length];
    var opacity =  0.5 + Math.random()*0.5;

    // create new instance of Particle and save it
    var p = new Particle(x, y, vx, vy, size, color, opacity);
    particles.push(p);

}

// Particle object

function Particle(x, y, vx, vy, size, color, opacity) {

    this.update = function() {
        x += vx;
        y += vy;
    }

    this.draw = function() {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
    }
}

// Draw

function render() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(render);
}


// resize
window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}


// init
initParticles();

// Start loop
render();