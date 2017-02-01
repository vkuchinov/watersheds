class Polynomial{
 
     float EPSILON = 1E-4;
     float[] coeff = {-20, 60, -27, 5};
     
     Polynomial(){
      
      
     }
     
     float[] horner(float[] a_, float t_){
       
         int n = a_.length - 1;
         FloatList b = new FloatList();
         FloatList c = new FloatList();
         
         for(int i = 0; i <= n; i++){ b.append(0.0); c.append(0.0); }
         
         b.set(n, a_[n]);
         c.set(n, b.get(n));
         
         for(int k = n - 1; k >= 1; k--){
         
             b.set(k, a_[k] + t_ * b.get(k + 1));
             c.set(k, b.get(k) + t_ * c.get(k + 1));
         
         }
         
         b.set(0, a_[0] + t_ * b.get(1));
         return new float[]{b.get(0), c.get(1)};
        
     }
     
     float[] get(float eval_, float x0_){
       
         float eps = 1E-4;
         int max = 20;
         
         for (int i = 0; i < max; i++) {
         
           float fdf = horner(coeff, x0_);
           float x1 = x0_ - fdf[0]/fdf[1];
          
           if (abs(x1 - x0) < eps) { break; }
           
           x0_ = x1;
         
         }
         
         return new foat[]{x1, i};
         

     }
  
}
