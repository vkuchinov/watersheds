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
   
   for(float y = 0; y < 3000; y++){

      float x = exp(map(y, 0.0, 3000.0, 0.0, 1.0) * b); 

      println(map(x, 0, exp(1.0 * b), 0, 3000));
     
   }
   
   println(min + " " + max);
  
  
}
