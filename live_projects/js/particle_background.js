var allParticles = [];
var maxLevel = 3;
var useFull = false;
var data = [];
var friction = 0.9

// Moves to a random direction and comes to a stop. 
// Spawns other particles within its lifetime.
function Particle(x, y, level){
    this.level = level;
    this.life = 0;

    this.pos = new p5.Vector(x,y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(map(this.level, 0, maxLevel, 5, 2));
    
    this.move = function(){
        this.life++;

        // friction
        this.vel.mult(friction);
        this.pos.add(this.vel);

        // Create a new particle if conditions are met
        if (this.life%10 == 0){
            if(this.level>0){
                this.level -= 1;
                var newParticle = new Particle(this.pos.x, this.pos.y, this.level-1);
                allParticles.push(newParticle);
            }
        }
    }
}

opacity=30

function setup(){
    createCanvas(windowWidth, windowHeight*0.9);
    colorMode(HSB, 360);
    textAlign(CENTER);
    background('rgba(255,255,255, 0.25)');
}

function draw(){
    // Create fade effect
    noStroke();
    fill('rgba(255,255,255, 0.25)');
    // fill('#3B474B', 30);
    rect(0,0,width, height);

    // Move and spawn particles.
    // Remove any that is below the velocity threshold
    for(var i = allParticles.length-1; i>-1; i--){
        allParticles[i].move();
        if(allParticles[i].vel.mag() < 0.01){
            allParticles.splice(i,1);
        }
    }

    if (allParticles.length > 0){
        // run script to get points to create triangles with
        data = Delaunay.triangulate(allParticles.map(function(pt){
            return [pt.pos.x, pt.pos.y];
        }));

        strokeWeight(0.1);

        // Display triangles individually.
        for (var i = 0; i<data.length; i+=3){
            var p1 = allParticles[data[i]];
            var p2 = allParticles[data[i+1]];
            var p3 = allParticles[data[i+2]];
            // dont draw if triangle is too big
            if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y)>75){
                continue;
            }
            if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y)>75){
                continue;
            }
            if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y)>75){
                continue;
            }
            // Base its hue by the particle's life
            noStroke();
            fill(165+p1.life*1.5, 360, 360, opacity);
            triangle(p1.pos.x, p1.pos.y,
                     p2.pos.x, p2.pos.y,
                     p3.pos.x, p3.pos.y);
        }
    }
    noStroke();
    fill('rgba(23,28,29, 0.25)');
}


// Will execute myCallback every 0.5 seconds 
var intervalID = window.setInterval((
    ()=>{
        allParticles.push(new Particle(random(windowWidth), random(windowHeight), maxLevel))
    }
), 500);


// function mouseMoved(){
//     allParticles.push(new Particle(random(windowWidth), random(windowHeight), maxLevel))
// }