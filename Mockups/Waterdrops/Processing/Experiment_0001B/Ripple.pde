class Ripple{
  
      float radius = 0;
      float speed = 2;
      
      Ripple(){
        
      }
      
      void update(){
        
           radius += speed;
           speed *= 1.01;
        
      }
      
      void draw(){
          
          noFill();
          stroke(128, 64);
          strokeWeight(2);
          ellipseMode(CENTER);
          ellipse(0, 0, radius, radius);
        
      }
  
}

class RippleList extends ArrayList<Ripple>{
  
      float MAX = 600.0;
      
      void draw(){ for(int i = 0; i < this.size(); i++) { this.get(i).update(); if(this.get(i).radius > MAX) { this.remove(i); } else { this.get(i).draw(); } } }
      
      void update(){
       
           for(Ripple r : this) { r.update(); } 
        
      }
      
      void generate(){
       
           this.add(new Ripple()); 
        
      }
  
  
}
