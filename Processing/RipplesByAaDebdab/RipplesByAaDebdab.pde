/**
* Ripple 
*
* @author aa_debdeb
* @date 2015/09/08
*/

float RIPPLE_INITIAL_RADIOUS = 5.0;
float RIPPLE_RADIOUS_STEP_SIZE = 3.0;
float RIPPLE_TRANSPARENCY_STEP_SIZE = 5.0;
float NEW_RIPPLE_RATE = 0.05;

ArrayList<Ripple> ripples;

void setup(){
  size(500, 500);
  frameRate(60);
  
  ripples = new ArrayList<Ripple>();
  ripples.add(new Ripple());
}

void draw(){
  
  background(0);
  
  for(Ripple ripple: ripples){
    ripple.draw();
  }
  for(Ripple ripple: ripples){
    ripple.update();
  }
  
  ArrayList<Ripple> nextRipples = new ArrayList<Ripple>();
  for(Ripple ripple: ripples){
    if(!ripple.isTransparent()){
      nextRipples.add(ripple);
    }
  }  
  ripples = nextRipples;
  
  if(random(1) < NEW_RIPPLE_RATE){
    ripples.add(new Ripple());
  }
}

class Ripple{

  float x;
  float y;
  float radious;
  float transparency;
  
  Ripple(){
    x = random(width - 100.0) + 50.0;
    y = random(height - 100.0) + 50.0;
    radious = RIPPLE_INITIAL_RADIOUS;
    transparency = 255.0;
  }
  
  void draw(){
    noFill();
    stroke(255, transparency);
    strokeWeight(1);
    arc(x, y, radious * 2.0, radious * 2.0, 0, PI * 2);
  }

  void update(){
    radious += RIPPLE_RADIOUS_STEP_SIZE;
    transparency -= RIPPLE_TRANSPARENCY_STEP_SIZE;
  }  

  boolean isTransparent(){
    if(transparency <= 0.0){
      return true;
    } else {
      return false;
    }
  }  
}


