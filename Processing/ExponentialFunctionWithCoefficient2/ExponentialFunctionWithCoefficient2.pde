/*

EXPONENTIAL FUNCTION WITH COEFFICIENT
for mapping

f(x) = a * b ^ x

Exponential Growth and Decay

For an exponential function f(x)=abkx with a>0, we say that f(x) is an

exponential growth function if k>0 and b>1, or k<0 and 0<b<1
exponential decay function if k<0 and b>1, or k>0 and 0<b<1 In the case where f(x)=aekx, 
f(x) is an exponential growth function if k>0 and an exponential decay function if k<0.

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/
void setup(){
 
   size(500, 500); 
   colorMode(HSB);
   
   for(float a = 1.0; a < 999; a += 16){
     
   stroke(map(a, 1, 999, 0, 255), 240, 240);
   
   for(float y = 0; y < 5; y+= 0.1){

      float x = exponentialMap(a, y); 
      
      strokeWeight(4.0);
      point(map(x, exponentialMap(a, -5), exponentialMap(a, 5), 500, 0), map(y, 0, 5, 0, 500));
      println(x);
      
   }
   }
   
}

float exponentialMap(float a_, float value_){
  
        float a = 0.25;
        float b = a_; //coefficient
        return a * pow(b, value_);
}
