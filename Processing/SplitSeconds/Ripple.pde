class Ripple{
 
   float radius;
   float inc = 1.0;
   
   Ripple(){
    
       radius = 100;
    
   } 
   
   void update(int interval_){
     
       //inc *= 1.025;
       radius = map(interval_, 0.01, 5000, 100.0, 480);
       if(radius < 580) { radius += 3 * inc; } else { radius = 0; inc = 1.0; }
     
     
   }
   
   void draw(){
     
     ellipseMode(CENTER);
     noFill();
     ellipse(0, 0, radius, radius);
     
   }
   
   float mapLog(float value, float start1, float stop1, float start2, float stop2) {
     
      start2 = log(start2);
      stop2 = log(stop2);
       
      float outgoing =
        exp(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)));
       
      return outgoing;
      
  }
  
}
