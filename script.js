if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
};

const canvasContainer = document.querySelector("#canvas-container");

class Particle {
    constructor(args) {
        this.pos = args.pos;
        this.r = args.r;

        this.speed = p5.Vector.random2D().mult(1.5);

        colorMode(HSB);
        this.color = color(random(360), 100, 100);
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    update() {
        this.pos.add(this.speed);
    }

    edges() {
        if (this.pos.x - this.r < 0) {
            this.speed.x *= -1;
            this.pos.x = 0 + this.r;
        };
        if(this.pos.x + this.r > width) {
            this.speed.x *= -1;
            this.pos.x = width - this.r;
        };
        if (this.pos.y - this.r < 0) {
            this.speed.y *= -1;
            this.pos.y = 0 + this.r;
        }; 
        if(this.pos.y + this.r > height) {
            this.speed.y *= -1;
            this.pos.y = height - this.r;
        };
    }

    collide(particles, i) {
        for(let j = 0; j < particles.length; j++) {
            if(i != j) {
                if(p5.Vector.dist(particles[i].pos, particles[j].pos) < this.r * 2) {
                    // particles[i].color = color(random(360), 100, 100);
                    // particles[j].color = color(random(360), 100, 100);

                    let  temp = particles[i].speed;
                    particles[i].speed = particles[j].speed;
                    particles[j].speed = temp;
                };
            };
        };
    }
}

let particles = [];

function setup() {
    const canvas = createCanvas(300, 300);
    background(220);
    canvas.parent(canvasContainer);

    for(let i = 0; i < 50; i++) {
        let particle = new Particle({
            pos: createVector(random(0, width), random(0, height)),
            r: 2.5
        });
        particles.push(particle);
    }
}

function draw() {
    background(0, 0, 100);
    for(let i = 0; i < particles.length; i++) {
        particles[i].show();
        particles[i].update();
        particles[i].edges();
        particles[i].collide(particles, i);
    }
}