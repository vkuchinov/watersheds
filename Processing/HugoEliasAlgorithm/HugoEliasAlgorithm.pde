/*

HUGO ELIAS ALGORITHM

REFERENCES:
http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
https://classes.soe.ucsc.edu/cmps162/Spring12/proj/klew3/proj/main.html
http://schiho.com/2011/08/24/waves-without-sincos-hugo-elias-algorithm/

https://scratch.mit.edu/projects/89974568/
https://github.com/Ross-Code/RippleSimulationCSharp

http://matthias-mueller-fischer.ch/talks/GDC2008.pdf
https://github.com/Mystfit/FluidMotion/tree/master/addons/ofxFX/src/interactive

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

Buffer bufferA;
Buffer bufferB;

void setup(){
  
  size(501, 501);
  
  bufferA = new Buffer();
  bufferB = new Buffer();
  
  bufferB.set(250, 250, 0.9);
 
}

void draw(){
  
    background(255);
    bufferA.applyHugoElias(bufferB);
    bufferA.draw();
    
    bufferB.swap(bufferA);
  
}
