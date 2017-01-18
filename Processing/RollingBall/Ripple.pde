class Ripple{
  
      float radius = 256.0;
      
      Ripple(){
       
      }
      
      void draw(){
        
          noFill();
          stroke(128);
          ellipseMode(CENTER);
          ellipse(0, 0, radius * 2, radius * 2);
        
      }

}
