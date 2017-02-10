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

//DAT.GUI VARIABLES
var gui, controls, g0, s0, s1;
var t;

var Interface = function() {

    this.wpm = 150;
    this.average = 24;
    this.interval = 8; //Math.floor(60.0 / this.wpm * this.average);
    this.pause = 2; //by default 6 Math.floor(60.0 / this.wpm * this.average);
    this.start = false;
    this.fps = "";
    //this.dynamic = false;

    this.generator = 56;
    this.transition = 240;

    this.rest = 0.132;
    this.angle = 0.6;
    this.increment = 0.0038;
    this.scale = 150;

};

window.onload = function() {

    controls = new Interface();
    gui = new dat.GUI();
    g0 = gui.addFolder("GENERAL PARAMETERS");
    g0.add(controls, "wpm", 100, 180);
    g0.add(controls, "average", 16, 32);
    g0.add(controls, "interval");
    g0.add(controls, "pause");
    //g0.add(controls, "dynamic");
    g0.add(controls, "start").onChange(function(value) {
        this.initialValue = value;
        toggleFullScreen(value);
    });

    s0 = gui.addFolder("RIPPLING SYSTEM");
    s0.add(controls, "generator", 2.0, 999.0).onChange(function(value) {
        system.theta = parseInt(value * 1000);
    });
    s0.add(controls, "transition", 5.0, 999.0).onChange(function(value) {
        TRANSITION_INTERVAL = parseInt(value * 1000);
    });

    s1 = gui.addFolder("TIDAL SYSTEM");
    s1.add(controls, "rest", 0.025, 0.25).onChange(function(value) {
        REST_DISTANCE = value;
    });
    s1.add(controls, "angle", 0.1, 0.9).onChange(function(value) {
        MAX_ANGLE = value;
    });
    s1.add(controls, "increment", 0.001, 0.005).onChange(function(value) {
        ang_inc = value;
    });
    s1.add(controls, "scale", 64, 256).onChange(function(value) {
        SCALE_RATIO = value;
    });
    
    gui.add(controls, "fps").listen();

    if (system == ripplingSystem) {
        s1.domElement.style.pointerEvents = "none";
        s1.domElement.style.opacity = .5;
    } else if (system == tidalSystem) {
        s0.domElement.style.pointerEvents = "none";
        s0.domElement.style.opacity = .5;
    }

};

function gup(name) {

    url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

inits();

function inits() {

    //var a1 = new Polynomial([0, 1, 2], [3.3, 7.7, 2.2], 3);
    //console.log(a1.get(2.5));
    //var a2 = new Polynomial([0, 1, 2], [0.3, 0.5, 1.2], 3);
    //console.log(a2.get(2.5));
    
    D3Renderer.init();

    //rippling/tidal
    //by default [not defined] is tidal
    system = (gup("type") == "rippling") ? ripplingSystem : tidalSystem;

    //autonomous/interactive
    //by default [not defined] is autonomous
    mode = (gup("mode") == "interactive") ? 1 : 0;

    t = new Timer();

    waitForDataset();

    window.onresize = D3Renderer.resize;

}

function render() {

    t.update();
    if(prerendered == true) { system.render(t); }
    
    //not active for a while

    //    if(g0.__controllers[4].initialValue) {
    //        t.setLimit(parseInt(g0.__controllers[2].initialValue * 1000)); 
    //        if(currentFrame % 60 == 0) { system.update(t); } 
    //    }
    //    else { t.setLimit(50); system.update(t); }

    D3Renderer.render(scene);
    window.requestAnimationFrame(render);

    controls.fps = t.getFPS();
    //g0.__controllers[5].updateDisplay();
    
    currentFrame++;
}
    
function waitForDataset() {

    if (typeof dataset !== "undefined") {

        system.inits(dataset, parseInt(g0.__controllers[3].initialValue * 1000));
        render();

    } else {
        setTimeout(waitForDataset, 50);
    }

}

function Timer() {

    this.current = performance.now();
    this.last = 0;
    this.passed = 0;
    this.shift = 0;
    this.limit = 1000;
    this.state = -1; //-1: displaying, 1: pause

    this.update = function() {

        this.last = this.current;
        this.current = performance.now();

        if (this.passed > this.limit) {

            this.limit = (this.state == -1) ? parseInt(g0.__controllers[2].initialValue * 1000) : parseInt(g0.__controllers[3].initialValue * 1000);
            this.passed = 0;
            this.state *= -1;

            if (mode == 0) {
                (this.state == -1) ? system.pause(parseInt(g0.__controllers[3].initialValue * 1000)): system.display(parseInt(g0.__controllers[3].initialValue * 1000));
                
            }

        } else {

            this.passed += this.getInterval();
            this.shift = performance.now();
        }

    }

    this.shifted = function(){
        
        return performance.now() - this.shift;
        
    }
    
    this.getFPS = function(){
        
        var smooth = 0.9;
        return (1.0 / (performance.now() - this.last) * 1000).toFixed(2);
        
    };
    
    this.setLimit = function(value_) {
        this.limit = value_;
    };
    this.getInterval = function() {
        return performance.now() - this.last;
    }

}

function toggleFullScreen(bool_) {

    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            if (bool_) {
                document.documentElement.requestFullScreen();
            }
        } else if (document.documentElement.mozRequestFullScreen) {
            if (bool_) {
                document.documentElement.mozRequestFullScreen();
            }
        } else if (document.documentElement.webkitRequestFullScreen) {
            if (bool_) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
            g0.__controllers[4].initialValue = false;
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            g0.__controllers[4].initialValue = false;
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            g0.__controllers[4].initialValue = false;
        }
    }

}

Array.prototype.min = function() { return Math.min.apply(null, this); };
Array.prototype.contains = function(element_) {
    var i = this.length;
    while (i--) {
        if (this[i] == element_) {
            return true;
        }
    }
    return false;
}
Array.prototype.getIndex = function(element_) {
    var i = this.length;
    while (i--) {
        if (this[i] == element_) {
            return i;
        }
    }
    return null;
}

function getScreenXY(scene_, object_, x_ ,y_) {

  var offset = scene_.node().getBoundingClientRect();

  var matrix = object_.node().getScreenCTM();

  return {
    x: (matrix.a * x_) + (matrix.c * y_) + matrix.e - offset.left,
    y: (matrix.b * x_) + (matrix.d * y_) + matrix.f - offset.top
  };
}