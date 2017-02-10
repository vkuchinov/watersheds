/**
 *
 * @POLYNOMIAL INTERPOLATION [FITTING]
 * 
 * In mathematics, a polynomial is an expression consisting of variables (or indeterminates) 
 * and coefficients, that involves only the operations of addition, subtraction, multiplication, 
 * and non-negative integer exponents. An example of a polynomial of a single indeterminate 
 * x is x2 − 4x + 7. An example in three variables is x3 + 2xyz2 − yz + 1.
 *
 * cubic
 * y = a + b * x + c * x²  + d * x³  3rd order
 *
 * x: values
 * y: timing
 *
 * Polynomial(data_, order_)
 *
 * Have to interpolate x, y, radius, color parameters
 *
 * @author Vladimir V. KUCHINOV
 * @email  helloworld@vkuchinov.co.uk
 *
 */

function Polynomial(data_, time_, order_) {
    
    exponentialMap = function(value_){

        //value_ should be from 0.0 to 1.0
        var a = 0.5; //coefficient a
        var b = 5E4; //coefficient b
    
        return a * Math.pow(b, value_);

    }
    
    this.get = function(value_){
        
        var output = this.a[0];
        
        for(var  i = 1; i < n; i++){ output += this.a[i] * Math.pow(value_, i); }

        return Number(output);
        
    };
    
    this.formula = function(){
        
        var s = "y = " + this.a[0];
        
        for(var  i = 1; i < n; i++){ s += " + " + this.a[i] + " * x^" + i; }

        console.log(s);
        
    };
    
    this.create2DArray = function(size_) {
  
        var arr = [];

        for (var i = 0; i < size_; i++) { arr[i] = []; }
        return arr;
        
    };
    
    this.create1DArray = function(size_) {
  
        var arr = [];

        for (var i = 0; i < size_; i++) { arr[i] = 0.0; }
        return arr;
        
    };
    
    this.a;
    
    var EPSILON = 1E-4;
    var n, N;
    
    var x, y, X, Y, B;
        
    if(data_.length != time_.length) { console.log("polynomial: Oooops, bad inputs!"); }
        
        n = order_; 
        N = data_.length;

        x = [data_.length];
        y = [data_.length];
    
        for(var i = 0; i < data_.length; i++){

            x[i] = data_[i];
            y[i] = time_[i];

        }

        //sigma(xi^2n)
        X = [2 * n + 1]; 

        for (var i = 0; i < 2 * n + 1; i++) {

            X[i] = 0.0;
            for (var j = 0; j < N; j++) { X[i] += Math.pow(x[j], i); }

        }

        //normal matrix (augmented)
        B = this.create2DArray(n + 2); 
        this.a = this.create1DArray(n + 1);
        
        for (var i = 0; i <= n; i++) { for (var j = 0; j <=n ; j++) { B[i][j] = X[i + j]; }}  

        //sigma(yi^2n)
        Y = [n + 1];              

        for (var i = 0; i < n + 1; i++){

            Y[i] = 0.0;
            for (var j = 0; j < N; j++) {  Y[i] += Math.pow(x[j], i) * y[j]; }

        }

        for (var i = 0; i <= n; i++) { B[i][n + 1] = Y[i]; }  

        n++;
        
        for(var i = 0; i < n; i++){
          
            for (var k = i + 1; k < n; k++){
              
                if (B[i][i] < B[k][i]) {
                  
                    for (var j = 0; j <= n; j++) {
                      
                        tmp = B[i][j];
                        B[i][j] = B[k][j];
                        B[k][j] = tmp;
                    
                    }
                }
            }
        }
    
        
        for (var i = 0; i < n - 1; i++){
          
            for (var k = i + 1; k < n; k++){ 
            
            tt = B[k][i] / B[i][i];
            for (var j = 0; j <= n; j++) { B[k][j] -= tt * B[i][j]; }
            
            }
            
        }

        for (var i = n - 1; i >= 0; i--) {                        
        
            this.a[i] = B[i][n]; 
      
            for (var j = 0; j < n; j++) { if (j != i)  { this.a[i] -= B[i][j] * this.a[j]; } }
            
            this.a[i] /=  B[i][i];
            
        } 

}