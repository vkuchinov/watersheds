/**
 *
 * @RIPPLING [CIRCULAR] SYSTEM
 * Each particles would have its own lifetime and would be changes 
 * by a newer node from XML by its death. 
 * 
 * The new node would have its own unique position. 
 *
 * @author Vladimir V. KUCHINOV
 * @email  helloworld@vkuchinov.co.uk
 *
 */

"use strict"

var MAX_RADIUS = 240.0;
var MAX_NODES = 768;

var GENERATOR_INTERVAL = 92;    //# of updates
var GENERATOR_SPEED = 0.46;
var TRANSITIONS = 32;
var INTERVALS = { A: 5000, B: 5000 };
var EXPONENTIAL_COEFFICIENTS = { A: 0.5, B: 1E6, ORDER: 16 };

var nodes = [];
var calculated = false;

var ripplingSystem = {

    inits : function(dataset_, pause_) {

        INTERVALS.A = pause_; INTERVALS.B = pause_;
        this.generator = new Generator(GENERATOR_INTERVAL, GENERATOR_SPEED);
        
        this.feed(dataset_);
        
        this.generator.generate(particles);
        
        //this.update();

    },
    
    firstUpdate : function(){
        
        for(var i = 0; i < nodes.length; i++){
        nodes[i].transition = {radius: {data: this.clear(TRANSITIONS + 1), intervals: this.clear(TRANSITIONS + 1), polynomial: null}};
        }
        
        this.generator.update();

        //d3.selectAll(".particle").remove();
        
        for(var i = 0; i < nodes.length; i++){
            
        //nodes[i].cx_last = nodes[i].cx;
        //nodes[i].cy_last = nodes[i].cy;
        nodes[i].radius.dynamic0 = nodes[i].radius.dynamic1;
         
        var fill = nodes[i].color;
        var rad = 0.0;
            
        var vX = nodes[i].cx;
        var vY = nodes[i].cy;
            
        if(vX == undefined || vY == undefined ) { console.log("Ooops, something wrong!"); }
        var magV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));

        for(var j = 0; j < this.generator.children.length; j++){

        var aX = vX / magV * this.generator.children[j].r;
        var aY = vY / magV * this.generator.children[j].r;

        var dist = Math.sqrt(Math.pow((aX - vX), 2) + Math.pow((aY - vY), 2));
            
        if(dist < 8) { rad = ripplingSystem.map(dist, 0, 8, nodes[i].radius.static, 4); nodes[i].state = 1;  break; } 
        else { nodes[i].state = 0;  }
        }
        
        nodes[i].radius.dynamic1 = rad;
        //D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].cy, nodes[i].radius.dynamic1, nodes[i].color);
        if(nodes[i].state == 1){
        //(group_, id_, x_, y_, radius_, color_) 
        D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].cy, rad, nodes[i].color);
        }
            
        //nodes[i].transition = {radius: {data: this.clear(steps_), intervals: this.clear(steps_), polynomial: null}};
        nodes[i].transition.radius.data[0] = rad;
        nodes[i].transition.radius.intervals[0] = 0.0;
        
        }
        
        this.generator.reverse();
        
    },
    
    update : function(){
        
        for(var i = 0; i < nodes.length; i++){
        nodes[i].radius.dynamic0 = nodes[i].transition.radius.data[TRASNITIONS]; 
        nodes[i].transition = {radius: {data: this.clear(TRANSITIONS + 1), intervals: this.clear(TRANSITIONS + 1), polynomial: null}};
        }
        
        //this.generator.update();

        //d3.selectAll(".particle").remove();
        
        for(var i = 0; i < nodes.length; i++){
            
        //nodes[i].cx_last = nodes[i].cx;
        //nodes[i].cy_last = nodes[i].cy;
        //nodes[i].radius.dynamic0 = nodes[i].radius.dynamic1;
         
        var fill = nodes[i].color;
        var rad = 0.0;
            
        var vX = nodes[i].cx;
        var vY = nodes[i].cy;
            
        if(vX == undefined || vY == undefined ) { console.log("Ooops, something wrong!"); }
        var magV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));

        for(var j = 0; j < this.generator.children.length; j++){

        var aX = vX / magV * this.generator.children[j].r;
        var aY = vY / magV * this.generator.children[j].r;

        var dist = Math.sqrt(Math.pow((aX - vX), 2) + Math.pow((aY - vY), 2));
            
        if(dist < 8) { rad = ripplingSystem.map(dist, 0, 8, nodes[i].radius.static, 4); nodes[i].state = 1;  break; } 
        else { nodes[i].state = 0;  }
        }
        
        nodes[i].radius.dynamic1 = rad;
        //D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].cy, nodes[i].radius.dynamic1, nodes[i].color);
        if(nodes[i].state == 1){
        //(group_, id_, x_, y_, radius_, color_) 
        D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].dynamic0, rad, nodes[i].color);
        }
            
        //nodes[i].transition = {radius: {data: this.clear(steps_), intervals: this.clear(steps_), polynomial: null}};
        nodes[i].transition.radius.data[0] = rad;
        nodes[i].transition.radius.intervals[0] = 0.0;
        
        }
        
    },
    
    updateWithPolynomial : function(timing_, steps_){
        
        for(var s = 0; s < steps_; s++){
            
            this.generator.update();
            
            for(var i = 0; i < nodes.length; i++){

            //nodes[i].cx_last = nodes[i].cx;
            //nodes[i].cy_last = nodes[i].cy;
            nodes[i].radius.dynamic0 = nodes[i].radius.dynamic1;

            var fill = nodes[i].color;
            var rad = 0.0;

            var vX = nodes[i].cx;
            var vY = nodes[i].cy;

            if(vX == undefined || vY == undefined ) { console.log("Ooops, something wrong!"); }
            var magV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));

            for(var j = 0; j < this.generator.children.length; j++){

            var aX = vX / magV * this.generator.children[j].r;
            var aY = vY / magV * this.generator.children[j].r;

            var dist = Math.sqrt(Math.pow((aX - vX), 2) + Math.pow((aY - vY), 2));

            if(dist < 8) { rad = ripplingSystem.map(dist, 0, 8, nodes[i].radius.static, 4); nodes[i].state = 1;  break; } 
            else { nodes[i].state = 0;  }
            }

            nodes[i].radius.dynamic1 = rad;
            //D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].cy, nodes[i].radius.dynamic1, nodes[i].color);
            nodes[i].transition.radius.data[s + 1] = rad;
            nodes[i].transition.radius.intervals[s + 1] = timing_ / steps_ * (s + 1);
            
            }

        }
        
        
    for(var k = 0; k < nodes.length; k++){

        //if(k < 3) { console.log(nodes[k].transition.radius.intervals); }
        //calculate polynomial
        nodes[k].transition.radius.intervals.reverse();
        nodes[k].transition.radius.polynomial = new Polynomial(nodes[k].transition.radius.intervals, nodes[k].transition.radius.data, EXPONENTIAL_COEFFICIENTS.ORDER);

        //if(k < 3) { console.log(nodes[k].transition.radius.intervals); }
    }
     
    },
    
    render: function(timer_){
        
        d3.selectAll(".particle").remove();
        
        var interval = timer_.passed;
        var minInterval = this.exponentialMap(0.0);
        var maxInterval = this.exponentialMap(1.0);
        var smooth = Number(this.map(this.exponentialMap(this.map(interval, 0, INTERVALS.A, 1.0, 0.0)), minInterval, maxInterval, 0, INTERVALS.B));
        
        var datas = "";

        for(var i = 0; i < nodes.length; i++){
            
           var rr = Number(this.limit(nodes[i].transition.radius.polynomial.get(smooth), 0, nodes[i].radius));
            
           if(rr < 4.0) { rr = 0.0; } else {
            
            //group_, id_, x_, y_, radius_, color_
            D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].cy, rr, nodes[i].color);
           }
        }
        
        //console.log(datas);
        //prerendered = false;
    },
    
    getPolynomialRadius: function(parameters_, interval_){
  
        //console.log(parameters_);
        return parameters_.radius.polynomial.get(interval_);
    },
    
    feed : function(dataset_){
        
        var upto = Math.min(MAX_NODES, dataset_.length);
        
        for(var i = 0; i < upto; i++){

            var a = Math.random() * 360.0;
            var r = Math.random() * MAX_RADIUS;

            var xy = ripplingSystem.uniform();
            var x = xy.x * MAX_RADIUS;
            var y = xy.y * MAX_RADIUS;

            var words = dataset_[i].message.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim().split(" ").length;
            var r = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 2, 20);

            var c = colors[this.findByKey(categories, "id", dataset_[i].category, 0)];
            
            //id_, xml_, cx_, cy_            
            nodes.push(new Node(i, i, x, y));

        }
        
            next = nodes.length;
        
        
    },
    
    takeover: function(index_, data_){
        
        var a = Math.random() * 360.0;
        var r = Math.random() * MAX_RADIUS;

        var xy = ripplingSystem.uniform();
        var x = xy.x * MAX_RADIUS;
        var y = xy.y * MAX_RADIUS;


        var words = data_.message.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim().split(" ").length;
        var r = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 6, 20);

        var c = colors[this.findByKey(categories, "id", data_.category, 0)];

        var node = d3.select("#particle_" + index_.xmlID);
        node.attr("cx", x)
        .attr("cy", y)
        .attr("stroke-width", 0.0);

         //id_, xml_, cx_, cy_            
        //nodes.push(new Node(i, i, x, y));
        
        nodes[index_.nodeID] = new Node(index_.nodeID, next, x, y);
        nodes[index_.nodeID].transition = {radius: {data: this.clear(TRANSITIONS + 1), intervals: this.clear(TRANSITIONS + 1), polynomial: null}};
        
        nodes[index_.nodeID].transition.radius.data[0] = r;
        nodes[index_.nodeID].transition.radius.intervals[0] = 0.0;
        
        //this.delete(nodes, index_.nodeID);
        //nodes.push({"id" : next, "radius": r, "depth" : 0, "color" : c, "state" : 0});

    },
    
    display : function(timing_){
        
        prerendered = false;
        //calculate n + 2 transitions
        //rather by creating two polynimoal (linear 1 and complex 3 or 4)
        //or by taking first data for first phase
        
        d3.selectAll(".particle").remove();
        
        //linear polynomial...
        //all 1 + 16 steps here
        
        if(calculated == false) { calculated == true; this.firstUpdate(); } else { this.update(); }
        
        var index = this.findLowestIDByKey(nodes, "state", 1);
        
        D3Renderer.highlight(particles, index);
        this.takeover(index, dataset[next]);                          
        
        console.log("node: " + index.nodeID + " xml: " + index.xmlID + " " + next);
        if(next < dataset.length) { next++; } else { next = 0; }
            
        d3.select("#particle_" + index.nodeID).remove();
        
        this.updateWithPolynomial(timing_, TRANSITIONS);
        
    },
    
    pause : function(timing_){

        prerendered = true;
        //this.updateWithPolynomial(timing_, 16);
        //d3.selectAll("#test").remove();
        
        d3.select("#HUD").attr("opacity", 1.0)
        .transition()
        .duration(500)
        .attr("opacity", 0.0)
        .each("end", function(d) { this.remove(); });

    },
    
    clear : function(size_){
      
        var array = [];
        for(var i = 0; i < size_; i++){ array.push(1E-4); }
        return array;
    },
    
    map: function(value_, min1_, max1_, min2_, max2_){ 
        
        return min2_ + (value_ - min1_) / (max1_ - min1_) * (max2_ - min2_); 
    
    },
    
    exponentialMap : function(value_){

        //value_ should be from 0.0 to 1.0
        var a = EXPONENTIAL_COEFFICIENTS.A; //coefficient a
        var b = EXPONENTIAL_COEFFICIENTS.B; //coefficient b
    
        return a * Math.pow(b, value_);

    },

    limit : function(value_, min_, max_){
        
        //if(value_ == NaN || value_ == "NaN") { console.log("shit happens"); return 0.0; }
        if(Number(value_) < min_) { return min_; }
        else if(Number(value_) > max_) { return max_; }
        return Number(value_);
        
    },
    
    uniform : function(){
        
        var n = 1E4;
        var rho = Math.sqrt(Math.random(n));
        var theta = Math.random() * 2.0 * Math.PI;
        var x = rho * Math.cos(theta);
        var y = rho * Math.sin(theta);
        
        return {"x" : x, "y" : y};
        
    },
    
    findByKey: function(array_, key_, value_, default_) {
        
        for (var i = 0; i < array_.length; i++) {
            if (array_[i][key_] === value_) {
                return i;
            }
        }
        return default_;
    },

    findLowestIDByKey: function(array_, key_, value_) {
        

        var available = [];
        var keys = [];
        
        for (var i = array_.length - 1; i >= 0; i--) {
            if (array_[i][key_] === value_) { available.push({ nodeID: i, xmlID : array_[i]["xml"]}); 
                                              keys.push( array_[i]["xml"]); }
        }
        
        var lowest = Math.min.apply(null, keys);
        return available[this.findByKey(available, "xmlID", lowest, 0)];
    }

}

function Generator(theta_, speed_) {

    this.children = [];
    this.theta = theta_;
    this.counter = 0;
    this.speed = speed_;
    this.passed = 0;

    this.children = [];

    this.update = function() {

        var candidates = [];
        this.counter++;
        if(this.counter > this.theta) { this.counter = 0; this.generate(particles) }
        
        var ripples = d3.selectAll("#ripple");
        ripples.remove();
        
        for(var i = 0; i < this.children.length; i++){
            
            if(this.children[i].r < MAX_RADIUS) {
            this.children[i].speed *= 1.005;
            this.children[i].r += this.children[i].speed;
                
            //for debuggin only
            //D3Renderer.drawCircle(d3.select("#particles"), 0, 0, this.children[i].r);
                
            } else {
            candidates.push(i);                     
            }
            
            
        }
        
        this.delete(this.children, candidates); 

    }

    this.reverse = function() {


        for(var i = 0; i < this.children.length; i++){
            
            this.children[i].speed /= 1.005;
            this.children[i].r -= this.children[i].speed;

        }
        

    }
    
    this.generate = function(scene_) { 

        this.children.push({r: 32, speed: GENERATOR_SPEED});
        
    }
    
    this.delete = function(array_, indices_){
        
        for(var j = 0; j < indices_.length; j++){
          
            for(var i = 0; i < array_.length; i++) { if(i === indices_[j]) { array_.splice(i, 1); } }
            
        }
        
        return array_;
        
    }

}