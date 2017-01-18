/*

ROLLING BALL ON WAVE

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

Ripple r;
Rolling ball;

Timer t;

void setup(){
 
    size(600, 600, "processing.core.PGraphicsRetina2D"); 
    
    t = new Timer();
    r = new Ripple();
    ball = new Rolling();
    
}

void draw(){
  
     background(210); 
     translate(width/2, height/2);
     
     t.update();
     
     r.draw();
     ball.draw(r.radius, t.getInterval());
  
}
