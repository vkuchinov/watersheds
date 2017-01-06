class Buffer{
  
     float damping = 0.5;
     PImage img;
     
     int dim = 501;
     float[][] values;
     
     Buffer(){
      
         img = createImage(501, 501, RGB);
         
         values = new float[dim][dim];
         
         for(int i = 0; i < dim; i++){
           for(int j = 0; j < dim; j++){
                 values[i][j] = 0.0;
           }
         }
      
     } 
     
     void set(int x_, int y_, float value_){
         values[x_][y_] = value_;
     }
     
     void swap(Buffer buffer_){
       
       for(int i = 0; i < dim; i++){
           for(int j = 0; j < dim; j++){
               float tmpValue =  values[i][j];
               values[i][j] = buffer_.values[i][j];
               buffer_.values[i][j] = tmpValue;
           }
       }
       
       
     }
     
     void applyHugoElias(Buffer buffer_){
       
        float tmpValue = 0.0;
        
        for(int i = 1; i < dim - 1; i++){
           for(int j = 1; j < dim - 1; j++){
             
               tmpValue = (values[i - 1][j] + values[i + 1][j] + values[i][j + 1] + values[i][j - 1]) / 4;
               tmpValue -= buffer_.values[i][j];
               
               values[i][j] = tmpValue * damping;
             
           }
        }
       
     }
     
     void draw(){
       
         for(int i = 0; i < dim; i++){
           for(int j = 0; j < dim; j++){
             
               //set(i, j, map(values[i][j], 0, 1, 255, 0));
               img.set(i, j, color(map(values[i][j], 0, 1, 255, 0)));
             
           }
         }
         
         image(img, 0, 0);
       
     }
  
}
