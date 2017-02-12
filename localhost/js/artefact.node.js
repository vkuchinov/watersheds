function Node(id_, xml_, cx_, cy_){
    
    this.map = function(value_, min1_, max1_, min2_, max2_) {

        return min2_ + (value_ - min1_) / (max1_ - min1_) * (max2_ - min2_);

    }
    
    this.findByKey = function(array_, key_, value_, default_) {
        
        for (var i = 0; i < array_.length; i++) {
            if (array_[i][key_] === value_) {
                return i;
            }
        }
        return default_;
    }
    
    //this.lerp = function(value0_, value1_, t_){  return value0_ * t_ + (value0_ - value1_) * (1.0 - t_); }
    
    this.blendColors = function(perc_) {
	
    color0_ = this.foam;
    color1_ = this.color;
        
    if (color0_.length == 4)
        color0_ = color0_[1] + color0_[1] + color0_[2] + color0_[2] + color0_[3] + color0_[3];
    else
        color0_ = color0_.substring(1);
    if (color1_.length == 4)
        color1_ = color1_[1] + color1_[1] + color1_[2] + color1_[2] + color1_[3] + color1_[3];
    else
        color1_ = color1_.substring(1);   

    //console.log("valid: c1 => " + color0_ + ", c2 => " + color1_);

    color0_ = [parseInt(color0_[0] + color0_[1], 16), parseInt(color0_[2] + color0_[3], 16), parseInt(color0_[4] + color0_[5], 16)];
    color1_ = [parseInt(color1_[0] + color1_[1], 16), parseInt(color1_[2] + color1_[3], 16), parseInt(color1_[4] + color1_[5], 16)];

    //console.log("hex -> rgba: c1 => [" + color0_.join(", ") + "], c2 => [" + color1_.join(", ") + "]");

    var result = [ 
        (1 - perc_) * color0_[0] + perc_ * color1_[0], 
        (1 - perc_) * color0_[1] + perc_ * color1_[1], 
        (1 - perc_) * color0_[2] + perc_ * color1_[2]
    ];

    //console.log("c3 => [" + result.join(", ") + "]");

    // 5: convert to hex
    result = "#" + this.Int2Hex(result[0]) + this.Int2Hex(result[1]) + this.Int2Hex(result[2]);
        
    return result;
}
    
    this.Int2Hex = function(number_)
    
    {
        var hex = Math.round(number_).toString(16);
        if (hex.length == 1) { hex = "0" + hex; }
        return hex;
        
    }
    
    this.lerp = function(value0_, value1_, t_){ return (1.0 - t_) * value0_ + t_ * value1_; }
    
    this.hexToRGB = function(hex_) {
        
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
        
    }
    
    this.componentToHex = function(color_) {
        
    var hex = color_.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
        
    }

    this.rgbToHex = function(color_) {
        
    return "#" + this.componentToHex(color_.r) + this.componentToHex(color_.g) + this.componentToHex(color_.b);
        
    }
    
    this.calculateColor = function(value_){
        
        //normal: 1.0, foam 0.0
        if(value_ == 1 ) { return this.color; }
        else if( value_ == 0) { return this.foam; }
        else{
            
            var result = {r: parseInt(this.lerp(this.normalRGB.r, this.foamRGB.r, value_)),
                          g: parseInt(this.lerp(this.normalRGB.g, this.foamRGB.g, value_)),
                          b: parseInt(this.lerp(this.normalRGB.b, this.foamRGB.b, value_)) };

            return this.rgbToHex(result);
            
        }
    }

    this.findLowestIDByKey = function(array_, key_, value_) {
        
        var available = [];
        var keys = [];
        
        for (var i = array_.length - 1; i >= 0; i--) {
            if (array_[i][key_] === value_) { available.push({ nodeID: i, xmlID : array_[i]["xml"]}); 
                                              keys.push( array_[i]["xml"]); }
        }
        
        var lowest = Math.min.apply(null, keys);
        return available[this.findByKey(available, "xmlID", lowest, 0)];
    }
    
    this.id = id_;
    this.xml = xml_;
    
    //last
    this.cx_last = cx_;
    this.cy_last = cy_;
    
    this.cx = cx_;
    this.cy= cy_;
    this.global = { x: 0, y: 0, angle: 0};
    //radius & colours are taken form xml
    //based on category and wish length
    //dataset[xml_]
    
    var words = dataset[xml_].message.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim().split(" ").length;
    this.radius = {static: 0, dynamic0: 0, dynamic1: 0};
    this.radius.dynamic0 = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 10, 24);
    this.radius.dynamic1 = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 10, 24);
    this.radius.static = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 8, 18);

    var cat = this.findByKey(categories, "id", dataset[xml_].category, 0);
    this.color = colors[cat];
    this.foam = foams[cat];

    this.normalRGB = this.hexToRGB(this.color);
    this.foamRGB = this.hexToRGB(this.foam);

    this.transition = {cx: {data: [0, 0, 0], intervals: [], polynomial: null},
                       cy: {data: [0, 0, 0], intervals: [], polynomial: null},
                       radius: {data: [0, 0, 0], intervals: [], polynomial: null},
                       color: {data: [0, 0, 0], intervals: [], polynomial: null},
                       global: {data: [0, 0, 0], intervals: [], polynomial: null}
                      };
    
    this.state = 0;
    this.offscreen = 0;

}

function Vector2(x_, y_){
    
    this.x = x_;
    this.y = y_;
    
    this.dist = function(v_){ return Math.sqrt(Math.pow(v_.x - this.x, 2.0) + Math.pow(v_.y - this.y, 2.0)); }
    this.dist2 = function(v0_, v1_){ return Math.sqrt(Math.pow((v1_.x - v0_.x), 2.0) + Math.pow((v1_.y - v0_.y), 2.0)); }
    this.passed = function(v_){ 
    
        if(this.dist2(new Vector2(0.0, 0.0), this) < this.dist(new Vector2(0.0, 0.0), v_)) { 
          return 0;
        } else { 
          return 1;
        }
    
    }
    
    
}