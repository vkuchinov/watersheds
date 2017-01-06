float rot = 0;
float moveX = 0;
float moveY = 0;
float max = 200;
 
void setup(){
  size(800, 400);
  background(255);
  smooth();
}
 
void draw(){  
  background(0);
  fill(0);
  float x = 0;
  while(x < 128){
    float y = 0;
    while(y < 32){
      rotRect(x, y, 5, rot + x + y, moveX, moveY);
      y += 2;
    }
    x += 2;
  }
  rot += 0.01;
  
}
 
void rotRect(float x, float y, float size, float r, float moveX, float moveY){
  
    moveX = x + width/2;
    moveY = y + height/2;
    translate(moveX, moveY);
    rotate(r);
    fill(255);
    ellipseMode(CENTER);
    ellipse(x * size, y * size, size, size);
    resetMatrix();
    
}
