class Target extends PVector{
  
      float inc = 1.0;
      float r = 8.0;
      
      
      
      Target(float x_, float y_){
        
        x = x_; y = y_;
        
      }
      
      void update(){
        
        float phase = 0.0;
        float freq = 0.8;
        
  
        
        y = height/2 + 120.0 * sin(freq * radians(x) + phase); 
        
        
      }
      
      void draw(){
       
         update();
         
         fill(255);
         strokeWeight(1.0);
         stroke(0);
         
         ellipseMode(CENTER);
         ellipse(x, y, r * 2.0, r * 2.0); 
        
      }
  
}
