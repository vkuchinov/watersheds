class Attractor extends PVector{
 
     PVector velocity;
     
     Attractor(float x_, float y_){
       
       x = x_; y = y_;
       velocity = new PVector(random(1.6), random(1.6));
      
     } 
     
     void update(){
       
       if(x < 0 || x > width) velocity.x *= -1;
       if(y < 0 || y > height) velocity.y *= -1;
       
       this.add(velocity);
  
     }
     
     void draw(){
       
       update();
       
       ellipseMode(CENTER);
       fill(255, 0, 255);
       ellipse(x, y, 32, 32);
       
     }
  
}
