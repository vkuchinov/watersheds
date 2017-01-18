class Rolling{
     
    float orbit = 256.0;
    float radius = 32.0;
    
    //0.05 radians in 200 millis
    PVector speed = new PVector(0.05, 200);
    float a = 0;
    
    Rolling(){
    
    }
    
    void update(int interval_){
      
      a += speed.x * (interval_ / speed.y);
      
    }

    void draw(float orbit_, int interval_){
      
          update(interval_);
          
          float x = orbit_ * cos(a);
          float y = orbit_ * sin(a); 
          
          noStroke();
          fill(49);
          
          ellipseMode(CENTER);
          ellipse(x, y, radius, radius);
    
    }
     
  
}
