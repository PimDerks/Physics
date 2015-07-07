var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// height and width of cube
var widthCube = 20;
var heightCube = 40;

// position
var x = 0;
var y = 0;

// velocity
var vx = 2;
var vy = 2;

// animation loop
function animate() {

    // clear canvas
    ctx.clearRect(0, 0, width, height);

    // draw square
    ctx.fillRect(x,y, widthCube, heightCube);

    // update position with velocity
    x += vx;
    y += vy;

    // raf
    requestAnimationFrame(animate);

    // if square is out of view reset position to the start
    if (y > height || x > width) {
        x = 0;
        y = 0;
    }
}

// start loop
animate();