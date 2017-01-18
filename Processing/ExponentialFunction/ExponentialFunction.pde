/*

EXPONENTIAL FUNCTION WITH RATIO

 x{t}=x{0}(1+r)^{t}, where r is a growth rate, e.g. r = 5% = 0.05 per interval
 
 What is t, b, c, d parameters?
 
 time, beginning, change, duration
 
 
@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

float t = 0.025;

void setup(){
  
   size(600, 600, "processing.core.PGraphicsRetina2D"); 
   
   for(float x = 0.0; x < 1.0; x += 0.0025){
     
     float y = backIn(x, 0.0, 1.0, 1.0);
     strokeWeight(1);
     point(map(x, 0, 1, 0, width), map(y, 0, 1, 0, height));
     
   }
  
}

float mapLog(float value, float start1, float stop1, float start2, float stop2) {
     
      start2 = log(start2);
      stop2 = log(stop2);
       
      float outgoing = pow(exp(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))), (1.0 / t));
       
      return outgoing;
      
  }
  
  float backIn(float t,float b , float c, float d) {
    
    float s = 1.70158f;
    return c*(t/=d)*t*((s+1)*t - s) + b;
    
  }
  
  float  expIn(float t,float b , float c, float d) {
    
    return (t == 0) ? b : c * (float)Math.pow(2.0, 10 * (t/d - 1.0)) + b;
    
  }
  
