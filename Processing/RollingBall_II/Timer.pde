class Timer{
  
   int current = millis();
   int frame;
   int last = 0;

   Timer(){
   
   } 
   
   void update(){
     
     last = current;
     current = millis();
     frame = current - last;
     //if((current * inc - last) > 5000) { last = current; println("5 sec");  inc = 0.1; }
     
   }
   
   int getInterval(){ return current - last; }
  
}
