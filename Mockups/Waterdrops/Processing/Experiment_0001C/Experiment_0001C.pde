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
Timer timer = new Timer();

PGraphics scene, buffer;


boolean update = true;
int currentFrame = 0;

void setup(){
 
     size(1200, 760, "processing.core.PGraphicsRetina2D"); 
     background(0);
     frameRate(30);
     particles.generate(NUM_PARTICLES,300.0);
     
     scene = createGraphics(width, height);
     buffer = createGraphics(width, height);
  
     buffer.beginDraw();
     buffer.background(24);
     buffer.endDraw();
     
}

void draw(){
 
     scene.beginDraw();
     scene.background(24); 
     scene.translate(width/2, height/2);
         
     scene.stroke(255);
     scene.strokeWeight(1);
         //line(0, -10, 0, 10);
         //line(-10, 0, 10, 0);
      
     particles.draw(scene);

     scene.endDraw();
     
     timer.update();
     ripples.update();
   //particles.update();

   if(currentFrame%30 == 0) { ripples.generate(); }
   //if(currentFrame%60 == 0) { particles.addNew(); }
   currentFrame++;
   
   image(scene, 0, 0);
   image(buffer, 10, 10, 300, 190);
  
}
