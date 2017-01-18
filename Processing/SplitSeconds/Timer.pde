class Timer{
 
   int current = millis();
   int last = 0;
   float inc = 0.1;
   
   int resolution = 30; //millis // /frameRate
   
   Timer(){
   
   } 
   
   void update(){
     
     current = floor(millis());
     inc *= 1.1;
     
     if((current * inc - last) > 5000) { last = current; println("5 sec");  inc = 0.1; }
     
   }
   
   int getInterval(){ return int(current * inc - last); }
  
}
