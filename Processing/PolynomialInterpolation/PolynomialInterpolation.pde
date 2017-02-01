/*

POLYNOMIAL INTERPOLATION
Newton's polynomials

In the mathematical field of numerical analysis, a Newton polynomial, 
named after its inventor Isaac Newton, is the interpolation polynomial 
for a given set of data points in the Newton form. The Newton polynomial 
is sometimes called Newton's divided differences interpolation polynomial 
because the coefficients of the polynomial are calculated using 
divided differences.

(The other difference formulas, such as those of Gauss, Bessel and Stirling, 
can be derived from Newton's, by renaming of the x-values of the data points.)

P(x) = c0 + c1(x - x0) + c2(x - x0) * (x - x1) + ... + cn(x - x0) * (x - x1) ... (x - xn1)
In some cases could be slower than bisections.

REFERENCES:
https://en.wikipedia.org/wiki/Polynomial_interpolation
https://en.wikipedia.org/wiki/Newton_polynomial
https://math.okstate.edu/people/binegar/4513-F98/4513-l17.pdf
http://note.sonots.com/SciSoftware/NewtonInterpolation.html#c2ba5e59

https://ece.uwaterloo.ca/~dwharder/aads/Algorithms/Newton_polynomials/

D3.JS
https://bl.ocks.org/mbostock/4342190

NEWTON's ROOT
http://mathworld.wolfram.com/NewtonsMethod.html


@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

static int LINEAR = 1;
static int PARABOLIC = 2;
static int CUBIC = 3;
static int QUARTIC = 4;
//...

Polynomial interpolation;
ArrayList<PVector> points = new ArrayList<PVector>();

void setup(){
 
     size(600, 600, "processing.core.PGraphicsRetina2D"); 
     background(49);
     
     points.add(new PVector(80, 300));
     points.add(new PVector(290, 550));
     points.add(new PVector(510, 500));
     
     for(PVector p : points){
      
        stroke(0, 255, 255);
        strokeWeight(8);
        point(p.x, p.y);
       
     }
  
}
