/*

RIPPLES EXPERIMENT #001

CONCEPT
Each element has arbitrary initial position within certain radius and zero depth.
If it intersected by a wave [ring] i

CONSIDERATION:
Increasing weight parameter


@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

int NUM_PARTICLES = 1512;

ParticleList particles = new ParticleList();
RippleList ripples = new RippleList();

int currentFrame = 0;

void setup(){
 
     size(750, 750, "processing.core.PGraphicsRetina2D"); 
     background(0);
     frameRate(30);
     particles.generate(NUM_PARTICLES,300.0);
     
  
}

void draw(){
 
   background(0); 
   translate(width/2, height/2);
   
   stroke(255);
   strokeWeight(1);
   line(0, -10, 0, 10);
   line(-10, 0, 10, 0);
   
   //ripples.draw();
   particles.draw();
   
   if(currentFrame%30 == 0) { ripples.generate(); }
   //if(currentFrame%60 == 0) { particles.addNew(); }
   currentFrame++;
  
}
