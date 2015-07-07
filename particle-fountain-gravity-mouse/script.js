var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var particles = [];
var colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];
var amount = 5000;
var speedX = 1;
var speedY = 1;
var gravity = 0.025;
var mouseDistance = 40;

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

    var originalSize = size,
        maxSize = size * 15;

    function reset() {
        x = width * 0.5;
        y = height * 0.5;
        opacity = 0.5 + Math.random()*0.5;
        vx = -2+Math.random()*4;
        vy = Math.random()*-3;
    }

    this.update = function() {

        // if a particle has faded to nothing we can reset it to the starting position
        if (opacity - 0.005 > 0){
            opacity -= 0.005 ;
        }
        else {
            reset();
        }

        // add gravity to vy
        vy += gravity;
        x += vx;
        y += vy;

        size += .25;

        // check if particle is near mouse
        if(mouse){
            var pos = {
                x: x,
                y: y
            }

            var distance = calculateDistanceBetweenPoints(mouse, pos);
            if(distance < mouseDistance && size < maxSize){
                size = size+1;
            } else if(size > originalSize) {
                size = size - 1;
            }

            if(distance < mouseDistance){

                if(mouse.x > pos.x){
                    // mouse is to the right of particle
                    x -= Math.random() * distance;
                } else {
                    // mouse is to the left of particle
                    x += Math.random() * distance;
                }

                if(mouse.y > pos.y){
                    // mouse is above particle
                    y -= Math.random() * distance;
                } else {
                    // mouse is below particle
                    y += Math.random() * distance;
                }

            }

        }

    }

    this.draw = function() {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

var mouse;

function calculateDistanceBetweenPoints(a, b){
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return Math.sqrt(dx*dx+dy*dy);
}

canvas.addEventListener('mousemove', function(evt) {
    mouse = getMousePosition(canvas, evt);
}, false);

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
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