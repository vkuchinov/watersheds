/*

WATERSHEDS
fluid-like data visualization based on D3.js and LiquidFun.js libraries.

REFERENCES:
https://codepen.io/hossman/pen/aFBfg

@author Vladimir V. KUCHINOV
@email  helloworld@vkuchinov.co.uk

XML LINK
http://research.tigweb.org/wishes/raw.html?limit=5120

*/

function gup(name) {
    
    url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

inits();

function inits(){
    
    D3Renderer.init();

    //rippling/tidal
    system = (gup("type") == "rippling") ? ripplingSystem:tidalSystem;
    mode = (gup("type") == "automous") ? 0:1;

    system.inits();
    
    window.onresize = D3Renderer.resize;
    render();
    //document.addEventListener( 'mousemove', onMouseMove, false );
    
}

function render(){
    
    system.update();
    
    D3Renderer.render(scene);
    window.requestAnimationFrame(render);

    //    ripples.update(); 

    //    if(currentFrame % 30 == 0) {  ripples.addRipple(); }
    //    //console.log(ripples.getValues());

    //    currentFrame++;
    
}

function onMouseMove( event ) {
        

        
}

function printValue(value_){ console.log("value: " + value_ + " | " + typeof value_); }
