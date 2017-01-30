/*

EXPONENTIAL FUNCTION WITH COEFFICIENT
for mapping

f(x) = a * b ^ x

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

float min = 999999;
float max = -999999;

float b = 9.0;

void setup(){
 
   size(500, 500); 
   
   for(float y = 0; y < 1.0; y += 0.01){
    
      float x = exp(y * b); 

      point(map(x, 1.0, exp(1.0 * b), 500, 0), map(y, 0, 1, 0, 500)); 
     
   }
   
   println(min + " " + max);
  
  
}
