class Timer{
 
     long last, passed;
     int interval = 15000;
     float slowdown = 1.0;
     
     Timer(){ last = millis();  } 
     
     void update(){
       
           passed = millis() - last;
           if(passed > interval) { reset(); refreshBuffer(buffer, scene); }
     }
     
     void reset(){ last = millis(); }
     
     void setInterval(int value_){ interval = value_; }
  
}

void refreshBuffer(PGraphics buffer_, PGraphics scene_){
  
    //buffer_ = createGraphics(scene_.width, scene_.height); 
    buffer_.loadPixels(); 
    arrayCopy(scene_.pixels, buffer_.pixels); 
    buffer_.updatePixels(); 
    
}
