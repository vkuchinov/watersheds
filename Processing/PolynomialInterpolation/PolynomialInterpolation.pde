/*

POLYNOMIAL INTERPOLATION
[polynomial regression fitting]

In mathematics, a polynomial is an expression consisting of variables (or indeterminates) 
and coefficients, that involves only the operations of addition, subtraction, multiplication, 
and non-negative integer exponents. An example of a polynomial of a single indeterminate 
x is x2 − 4x + 7. An example in three variables is x3 + 2xyz2 − yz + 1.

Polynomials appear in a wide variety of areas of mathematics and science. 
For example, they are used to form polynomial equations, which encode a wide range of problems, 
from elementary word problems to complicated problems in the sciences; they are used to define 
polynomial functions, which appear in settings ranging from basic chemistry and physics to 
economics and social science; they are used in calculus and numerical analysis to approximate 
other functions. In advanced mathematics, polynomials are used to construct polynomial rings 
and algebraic varieties, central concepts in algebra and algebraic geometry.

    quadratic
    y = a + b * x + c * x²              2nd order
    
    cubic
    y = a + b * x + c * x²  + d * x³    3rd order
    
    ....
    
    and so on...                      (n)th order
    
    EXAMPLE
    
    x = { 1, 2, 3, 4, 5 };
    y = { 1, 1.2, 3, 7, 7 };
    
    
    RESULTS:
    
    R²         0.9815
    aR²        0.926
    P          0.1726
    SE         0.8128
    F          17.69
    
    a          7.24          ±3.998
    b         -10.00476      ±5.226
    c          4.328571      ±1.94
    d         –0.4666667     ±0.2142
    
    y = 7.24 - 10.00476*x + 4.328571*x^2 - 0.4666667*x^3
    
REFERENCES:
https://en.wikipedia.org/wiki/Polynomial
https://en.wikipedia.org/wiki/Polynomial_interpolation
https://en.wikipedia.org/wiki/Newton_polynomial
https://math.okstate.edu/people/binegar/4513-F98/4513-l17.pdf
http://note.sonots.com/SciSoftware/NewtonInterpolation.html#c2ba5e59

https://mycurvefit.com/
https://ece.uwaterloo.ca/~dwharder/aads/Algorithms/Newton_polynomials/

D3.JS
https://bl.ocks.org/mbostock/4342190

NEWTON's ROOT
http://mathworld.wolfram.com/NewtonsMethod.html

https://rosettacode.org/wiki/Polynomial_regression

http://www.bragitoff.com/2015/09/c-program-for-polynomial-fit-least-squares/

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

*/

static int OFFSET = 64;

static int LINEAR = 1;
static int PARABOLIC = 2;
static int CUBIC = 3;
static int QUARTIC = 4;
//...
                   
Polynomial interpolation;
ArrayList<PVector> points = new ArrayList<PVector>();

float minX, maxX, minY, maxY;

void setup(){
 
     size(600, 600, "processing.core.PGraphicsRetina2D"); 
     background(49);
     
    //     points.add(new PVector(64.0, 0.0));
    //     points.add(new PVector(68.0, 500.0));
    //     points.add(new PVector(70.0, 1000.0));
    //     points.add(new PVector(72.0, 1500.0));
    //     points.add(new PVector(74.0, 2500.0));
    //     points.add(new PVector(76.0, 3000.0));
    //     points.add(new PVector(78.0, 3500.0));
    //     points.add(new PVector(80.0, 4000.0));
    //     points.add(new PVector(82.0, 4500.0));
    //     points.add(new PVector(84.0, 5000.0));
    //     points.add(new PVector(86.0, 5500.0));
    //     points.add(new PVector(88.0, 6000.0));
    //     points.add(new PVector(90.0, 6500.0));
    //     points.add(new PVector(92.0, 7000.0));
    //     points.add(new PVector(94.0, 7500.0));
    
     points.add(new PVector(0.0, 64.0));
     points.add(new PVector(500.0, 68.0));
     points.add(new PVector(1000.0, 70.0));
     points.add(new PVector(1500.0, 72.0));
     points.add(new PVector(2500.0, 74.0));
     points.add(new PVector(3000.0, 76.0));
     points.add(new PVector(3500.0, 78.0));
     points.add(new PVector(4000.0, 80.0));
     points.add(new PVector(4500.0, 82.0));
     points.add(new PVector(5000.0, 84.0));
     points.add(new PVector(5500.0, 86.0));
     points.add(new PVector(6000.0, 88.0));
     points.add(new PVector(6500.0, 90.0));
     points.add(new PVector(7000.0, 92.0));
     points.add(new PVector(7500.0, 94.0));
        
     interpolation = new Polynomial(points, 3);

     println(interpolation.getY(3000));
     setBounds(points);
     
     for(PVector p : points){
      
        stroke(0, 255, 255);
        strokeWeight(8);
        point(map(p.x, minX, maxX, OFFSET, width - OFFSET), map(p.y, minY, maxY, OFFSET, height - OFFSET));
       
     }
     
     for(float x = minX; x < maxX; x+= 0.05){
       
       float y = interpolation.getY(x);
       stroke(255, 0, 255);
       strokeWeight(2.0);
       point(map(x, minX, maxX, OFFSET, width - OFFSET), map(y, minY, maxY, OFFSET, height - OFFSET));
       
     }
  
  
}

void setBounds(ArrayList<PVector> points_){
  
      for(PVector p : points_) { minX = min(minX, p.x); maxX = max(maxX, p.x); minY = min(minY, p.y); maxY = max(maxY, p.y); }
}
