/*

#1293DC, #DCDCDC, #000000

DOTS
0 - 360, 80%, 95%

TODO:

REFERENCES:
https://codepen.io/hossman/pen/aFBfg

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

XML LINK
http://research.tigweb.org/wishes/raw.html?limit=5120

*/


//var XML_LIMIT = 512;
//var XML_URL = "http://research.tigweb.org/wishes/raw.html?limit=" + XML_LIMIT;

var XML_LIMIT = 512;
var XML_URL = "xml/data.xml";

var MAX_NODES = 2024; //512;
var MAX_RADIUS = 300.0;

var scene;
var nodes = [];
var ripples;

var currentFrame = 0;

inits();

function inits(){
    
    D3Renderer.init();
    ripples = new RippleGenerator();
    
    window.onresize = D3Renderer.resize;
	render();
    
    
    document.addEventListener( 'mousemove', onMouseMove, false );
    
}

function render(){
    
    D3Renderer.render(scene);
	window.requestAnimationFrame(render);
    
    ripples.update(); 
    
    if(currentFrame % 30 == 0) {  ripples.addRipple(); }
    //console.log(ripples.getValues());
    
    currentFrame++;
    
    
}

function onMouseMove( event ) {
        

        
}

function monteCarloDistribution(value_){
    
    while(true){
        
        var v0 = Math.random();
        var v1 = Math.random();
        var probability = v0;

        if(v1 < probability) { return v0 * value_; }
    
    }

}
