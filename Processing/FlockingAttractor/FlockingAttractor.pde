// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

// Click mouse to add boids into the system

Flock flock;
Attractor attractor;

void setup() {
  size(640,360);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (int i = 0; i < 6; i++) {
    Boid b = new Boid(width/2,height/2);
    flock.addBoid(b);
  }
  smooth();
  attractor = new Attractor(width/2, height/2);
}

void draw() {
  background(255);
  attractor.draw();
  flock.run(attractor);
  
  
    // Instructions
  fill(0);
  //text("Drag the mouse to generate new boids.",10,height-16);
}

// Add a new boid into the System
void mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}


