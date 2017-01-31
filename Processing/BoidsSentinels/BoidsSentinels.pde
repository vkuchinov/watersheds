/*

BOIDS SENTINELS

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

Target object;
Flock flock;

void setup(){
 
     size(900, 400, "processing.core.PGraphicsRetina2D");
     smooth();
     
     object = new Target(64, height/2);
     
      flock = new Flock();
      for (int i = 0; i < 5; i++) {
      flock.addBoid(new Boid(object.x + random(-8, 8), object.y + random(-8, 8), random(8, 32)));
      }
  
     
}

void draw(){
 
     background(50); 
     flock.run();
     object.draw();
  
}
