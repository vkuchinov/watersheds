class Particle extends PVector {

  float radius = 2.0;
  float depth = 0.0;
  float c;
  PVector v;

  Particle(float x_, float y_, PVector v_) {

    x = x_; 
    y = y_;
    c = random(255);
    
    v = new PVector(v_.x, v_.y);
    
  } 

  void update() {

    depth -= 0.33;

    for (int r = 0; r < ripples.size (); r++) {

      float vX = x; //cX
      float vY = y; //cY
      float  magV = sqrt(pow(vX, 2) + pow(vY, 2));
      float aX = vX / magV * ripples.get(r).radius;
      float aY = vY / magV * ripples.get(r).radius;

      if (PVector.dist(new PVector(x, y), new PVector(aX, aY)) < 16) { 
        if (direction(x, y, aX, aY) == 1 ) {  
          stroke(0, 255, 255);
          depth +=  PVector.dist(new PVector(x, y), new PVector(aX, aY)) * 1.8; v.mult(PVector.dist(new PVector(x, y), new PVector(aX, aY)) * 0.1);
        } else { 
          depth -=  PVector.dist(new PVector(x, y), new PVector(aX, aY)) * 2.8; v.mult(1.0 - PVector.dist(new PVector(x, y), new PVector(aX, aY)) * 0.1);
        } 
        { 
          stroke(255, 0, 255);
          line(x, y, aX, aY);
        }
      }
    }
    
    x += v.x; y += v.y;
    
  }

  int direction(float x0_, float y0_, float x1_, float y1_) {

    if (PVector.dist(new PVector(0, 0), new PVector(x0_, y0_)) < PVector.dist(new PVector(0, 0), new PVector(x1_, y1_))) { 
      return 0;
    } else { 
      return 1;
    }
  }

  void draw() {

    colorMode(HSB);
    noStroke();
    fill(c, 240, 240);
    ellipseMode(CENTER);
    float r = map(depth, -50, 50, 0, 16.0);
    ellipse(x, y, r, r);
  }
}

class ParticleList extends ArrayList<Particle> {

  void generate(int num_, float max_) { 

    for (int p = 0; p < num_; p++) {

      float a = random(0, 360);
      float r = random(0, max_);
      float x = cos(a);
      float y = sin(a);
      PVector v = new PVector(x, y);
      this.add(new Particle(x, y, v));
    }
  }

  void draw() { 
    for ( int i = 0; i < this.size (); i++ ) { 
      this.get(i).update(); 
      if (this.get(i).depth < -49) { 
        this.remove(i); 
        this.addNew();
      } else { 
        this.get(i).draw();
      }
    }
  }

  void addNew() {  
    generate(1, 250.0);
  } 
  float monte(float value_) {

    while (true) {
      float r1 = random(1.0);
      float probability = r1;
      float r2 = random(1.0);
      if (r2 < probability) {
        return r1 * value_;
      }
    }
  }
}

