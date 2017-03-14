/* 
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

var GENERATOR_INTERVAL = 92; //# of updates
var GENERATOR_SPEED = 0.46;
var TRANSITIONS = 32;
var INTERVALS = {
    A: 5000,
    B: 5000
};
var EXPONENTIAL_COEFFICIENTS = {
    A: 0.5,
    B: 1E6,
    ORDER: 16
};

var nodes = [];
var calculated = false;

var SCALE_RATIO = 150;
var TIME_RATE = 0.0165; // 1/60

///phase: 0: displaying, 1: pausing
var timing = {
    interval: 30000,
    overal: 0,
    passed: 0,
    phase: 0
};

var TRANSITIONS = 32;
var INTERVALS = {
    A: 5000,
    B: 5000
};
var EXPONENTIAL_COEFFICIENTS = {
    A: 0.5,
    B: 5E3,
    ORDER: 3
};

var ripplingSystem = {

    inits: function (dataset_, pause_) {

        INTERVALS.A = pause_;
        INTERVALS.B = pause_ * 1.1;

        //translate group
        particles.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

        this.feed(dataset_);

        this.generator = new Generator(GENERATOR_INTERVAL, GENERATOR_SPEED);
        this.generator.generate(particles);

        D3Renderer.filterAll();

    },

    update: function () {

        //this.generator.update();

        for (var i = 0, l = nodes.length; i < l; i++) {
            this.resetTransition(nodes[i].transition, TRANSITIONS + 1);
        }

        for (var i = 0, l = nodes.length; i < l; i++) {

            var fill = nodes[i].color;
            var rad = 0.0;

            var vX = nodes[i].cx;
            var vY = nodes[i].cy;

            if (vX == undefined || vY == undefined) {
                console.log("Ooops, something wrong!");
            }
            var magV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));

            for (var j = 0; j < this.generator.children.length; j++) {

                var aX = vX / magV * this.generator.children[j].r;
                var aY = vY / magV * this.generator.children[j].r;

                var dist = Math.sqrt(Math.pow((aX - vX), 2) + Math.pow((aY - vY), 2));

                if (dist < 8) {
                    rad = ripplingSystem.map(dist, 0, 8, nodes[i].radius.static, 4);
                    nodes[i].state = 1;
                    break;
                } else {
                    nodes[i].state = 0;
                }
            }

            nodes[i].radius.dynamic0 = rad;

            //feed transition
            nodes[i].transition.radius.data[0] = rad;
            nodes[i].transition.radius.intervals[0] = 0.0;

        }

    },

    updateWithPolynomial: function (timing_, steps_) {

        for (var s = 0; s < steps_; s++) {

            this.generator.update();

            for (var i = 0, l = nodes.length; i < l; i++) {

                //nodes[i].cx_last = nodes[i].cx;
                //nodes[i].cy_last = nodes[i].cy;
                nodes[i].radius.dynamic0 = nodes[i].radius.dynamic1;

                var fill = nodes[i].color;
                var rad = 0.0;

                var vX = nodes[i].cx;
                var vY = nodes[i].cy;

                if (vX == undefined || vY == undefined) {
                    console.log("Ooops, something wrong!");
                }
                var magV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));

                for (var j = 0; j < this.generator.children.length; j++) {

                    var aX = vX / magV * this.generator.children[j].r;
                    var aY = vY / magV * this.generator.children[j].r;

                    var dist = Math.sqrt(Math.pow((aX - vX), 2) + Math.pow((aY - vY), 2));

                    if (dist < 8) {
                        rad = ripplingSystem.map(dist, 0, 8, nodes[i].radius.static, 4);
                        nodes[i].state = 1;
                        break;
                    } else {
                        nodes[i].state = 0;
                    }
                }

                nodes[i].radius.dynamic1 = rad;
                //D3Renderer.drawParticle(d3.select("#particles"), i, nodes[i].cx, nodes[i].cy, nodes[i].radius.dynamic1, nodes[i].color);
                nodes[i].transition.radius.data[s + 1] = rad;
                nodes[i].transition.radius.intervals[s + 1] = timing_ / steps_ * (s + 1);

            }

        }

        for (var k = 0, l = nodes.length; k < l; k++) {

            //if(k < 3) { console.log(nodes[k].transition.radius.intervals); }
            //calculate polynomial
            nodes[k].transition.radius.intervals.reverse();
            nodes[k].transition.radius.polynomial = new Polynomial(nodes[k].transition.radius.intervals, nodes[k].transition.radius.data, EXPONENTIAL_COEFFICIENTS.ORDER);

        }

    },

    staticRender: function () {

        ////d3.selectAll(".particle").remove();

        for (var i = 0, l = nodes.length; i < l; i++) {

            var c = nodes[i].color;

            if (nodes[i].state == 1) {
                D3Renderer.redrawParticle(i, nodes[i].cx, nodes[i].cy, nodes[i].radius.dynamic0, c);
            } else {
                D3Renderer.redrawParticle(i, nodes[i].cx, nodes[i].cy, 0, c);
            }

        }

    },

    render: function (timer_) {

        D3Renderer.filterAll();

        var interval = timer_.passed;
        var minInterval = this.exponentialMap(0.0, 5E3);
        var maxInterval = this.exponentialMap(1.0, 5E3);
        var smooth = Number(this.map(this.exponentialMap(this.map(interval, 0, INTERVALS.A, 1.0, 0.0), 5E3), minInterval, maxInterval, 0, INTERVALS.B));

        for (var i = 0, l = nodes.length; i < l; i++) {

            if (nodes[i].transition.radius.polynomial != null) {

                //var smooth = Number(this.map(this.exponentialMap(this.map(interval, 0, INTERVALS.A, 1.0, 0.0), nodes[i].exp), minInterval, maxInterval, 0, INTERVALS.B));

                var rad1 = Number(this.limit(Number(nodes[i].transition.radius.polynomial.get(smooth)), 0, nodes[i].radius.static));

                if (rad1 < 4.0) {
                    rad1 = 0;
                }

                D3Renderer.redrawParticle(i, nodes[i].cx, nodes[i].cy, rad1, nodes[i].color);

            }
        }

    },

    feed: function (dataset_) {

        for (var i = 0; i < MAX_NODES; i++) {

            var a = Math.random() * 360.0;
            var r = Math.random() * MAX_RADIUS;

            var xy = ripplingSystem.uniform();
            var x = xy.x * MAX_RADIUS;
            var y = xy.y * MAX_RADIUS;

            var words = dataset_[i].message.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim().split(" ").length;
            var r = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 2, 20);

            var c = colors[this.findByKey(categories, "id", dataset_[i].category, 0)];

            nodes.push(new Node(i, i, x, y));
            D3Renderer.drawParticle(d3.select("#particles"), i, 0, 0, 0, "none");

        }

        console.log("# of particels in this setup: " + nodes.length);
        next = nodes.length;

    },

    takeover: function (index_, data_) {

        var words = data_.message.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim().split(" ").length;
        var r = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 6, 20);

        var cat = this.findByKey(categories, "id", data_.category, 0);
        var c = colors[cat];
        var f = foams[cat];

        var t = nodes[index_.nodeID].transition;
        nodes[index_.nodeID] = new Node(index_.nodeID, next, nodes[index_.nodeID].cx, nodes[index_.nodeID].cy);
        this.resetTransition(nodes[index_.nodeID].transition);

        nodes[index_.nodeID].transition = t;

    },

    display: function (timing_) {

        prerendered = false;

        this.update(timing_);
        this.staticRender();

        var index = this.findLowestIDByKey(nodes, "state", 1);

        D3Renderer.highlight(particles, index, 500);

        next = this.checkNext(next);
        this.takeover(index, dataset[next]);
        if (next < dataset.length) {
            next++;
        } else {
            next = 0;
        }

        this.updateWithPolynomial(timing_, TRANSITIONS);

    },

    pause: function (timing_) {

        prerendered = true;
        D3Renderer.removeHUD(500);

    },

    interactive: function (timing_) {

        prerendered = false;

        this.update(timing_);
        this.staticRender();

        var index = this.findLowestIDByKey(nodes, "offscreen", 0);

        D3Renderer.highlight(particles, index, 500);
        this.takeover(index, dataset[this.checkNext(next)]);
        if (next < dataset.length) {
            next++;
        } else {
            next = 0;
        }

        this.updateWithPolynomial(timing_, TRANSITIONS);

        console.log("node: " + index.nodeID + " xml: " + index.xmlID + " " + next);

    },

    interactiveClicked: function (d_) {

        //var t0 = performance.now();

        D3Renderer.removeMouseEventsToAll();

        var id_ = parseInt(d_.attr("id").replace("particle_", ""));
        prerendered = false;

        D3Renderer.removeHUD(500);

        this.update(INTERVALS.A);
        this.staticRender();

        var index = {
            nodeID: id_,
            xmlID: nodes[id_].xml
        };

        D3Renderer.highlight(particles, index, 500);
        this.takeover(index, dataset[this.checkNext(next)]);
        if (next < dataset.length) {
            next++;
        } else {
            next = 0;
        }

        this.updateWithPolynomial(INTERVALS.A, TRANSITIONS);

        t.limit = INTERVALS.A;
        t.passed = 0;

        prerendered = true;

        //var t1 = performance.now();
        //console.log("Doing " + TRANSITIONS + "-steps polynomials in " + Number(t1 - t0).toFixed(2) + " ms");

    },

    interactivePause: function (timing_) {
        prerendered = true;
    },
    stopPrerender: function () {
        prerendered = false;
        D3Renderer.setMouseEventsToAll();
    },

    clear: function (size_) {

        var array = [];
        for (var i = 0; i < size_; i++) {
            array.push(1E-4);
        }
        return array;
    },

    resetTransition: function (transition_, n_) {

        transition_.radius.data = this.clear(n_);
        transition_.radius.intervals = this.clear(n_);

        transition_.cx.data = this.clear(n_);
        transition_.cx.intervals = this.clear(n_);

        transition_.cy.data = this.clear(n_);
        transition_.cy.intervals = this.clear(n_);

        transition_.color.data = this.clear(n_);
        transition_.color.intervals = this.clear(n_);

    },

    map: function (value_, min1_, max1_, min2_, max2_) {

        return min2_ + (value_ - min1_) / (max1_ - min1_) * (max2_ - min2_);

    },

    exponentialMap: function (value_, exp_) {

        //value_ should be from 0.0 to 1.0
        var a = EXPONENTIAL_COEFFICIENTS.A; //coefficient a
        var b = exp_; //EXPONENTIAL_COEFFICIENTS.B; //coefficient b

        return a * Math.pow(b, value_);

    },

    limit: function (value_, min_, max_) {

        //if(value_ == NaN || value_ == "NaN") { console.log("shit happens"); return 0.0; }
        if (Number(value_) < min_) {
            return min_;
        } else if (Number(value_) > max_) {
            return max_;
        }
        return Number(value_);

    },

    uniform: function () {

        var n = 1E4;
        var rho = Math.sqrt(Math.random(n));
        var theta = Math.random() * 2.0 * Math.PI;
        var x = rho * Math.cos(theta);
        var y = rho * Math.sin(theta);

        return {
            "x": x,
            "y": y
        };

    },

    checkNext: function (next_) {

        var checked = false;

        while (checked == false) {

            if (selected.contains(dataset[next_].category)) {
                return next_;
            } else {
                if (next_ < dataset.length) {
                    next_++;
                } else {
                    next_ = 0;
                }
            }

        }

    },

    findByKey: function (array_, key_, value_, default_) {

        for (var i = 0, l = array_.length; i < l; i++) {
            if (array_[i][key_] === value_) {
                return i;
            }
        }
        return default_;
    },

    findLowestIDByKey: function (array_, key_, value_) {


        var available = [];
        var keys = [];

        //glitchy after tweaking selected categories
        for (var i = array_.length - 1; i >= 0; i--) {
            if (array_[i][key_] === value_ && selected.contains(dataset[nodes[i].xml].category)) {
                available.push({
                    nodeID: i,
                    xmlID: array_[i]["xml"]
                });
                keys.push(array_[i]["xml"]);
            }
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

    this.update = function () {

        var candidates = [];
        this.counter++;
        if (this.counter > this.theta) {
            this.counter = 0;
            this.generate(particles)
        }

        var ripples = d3.selectAll("#ripple");
        ripples.remove();

        for (var i = 0; i < this.children.length; i++) {

            if (this.children[i].r < MAX_RADIUS) {
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

    this.reverse = function () {


        for (var i = 0; i < this.children.length; i++) {

            this.children[i].speed /= 1.005;
            this.children[i].r -= this.children[i].speed;

        }

    }

    this.generate = function (scene_) {

        this.children.push({
            r: 32,
            speed: GENERATOR_SPEED
        });

    }

    this.delete = function (array_, indices_) {

        for (var j = 0; j < indices_.length; j++) {

            for (var i = 0; i < array_.length; i++) {
                if (i === indices_[j]) {
                    array_.splice(i, 1);
                }
            }

        }

        return array_;

    }

}