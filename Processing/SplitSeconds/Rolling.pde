class Rolling{
  
      float radius = 50.0;
      float a = 0.0;
      
      Rolling(){
        
        
      }
      
      void update(){
        
        
      }
      
      void draw(float orbit_){
        
          noStroke();
          fill(0);
          ellipseMode(CENTER);
          float x = orbit_ * cos(a);
          float y = orbit_ * sin(a);
          ellipse(x, y, radius, radius);
        
      }

}
