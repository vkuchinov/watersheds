/*

https://github.com/jesusgollonet/processing-penner-easing/blob/master/src/Back.java
https://github.com/jesusgollonet/processing-penner-easing/blob/master/src/Expo.java

 */

Ripple ripple;
Rolling ball;
Timer t;

void setup() {

  size(700, 700, "processing.core.PGraphicsRetina2D");
  ripple = new Ripple();
  ball = new Rolling();
  t = new Timer();
  
  println(millis());
  
}


void draw() {
  
  background(210);
  translate(width/2, height/2);
  
  t.update();
  
  ripple.update(t.getInterval());
  ripple.draw();
  
  //ball.draw(ripple.radius);
  
  //println(millis());
  
}

