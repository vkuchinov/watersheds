/**
 *
 * @BREAKING [TIDAL] SYSTEM
 * based on LiquidFun.js & KD-Tree libraries
 * 
 * LiquidFun.js has been used as core physics library and wave machine model 
 * to simulate tidal waves movement. Foam [bluish bubbles] is created by 
 * comparing each particle density with "rest density" or, in this case, 
 * simple algorithm of defining closest neighbours and checking distances. 
 *
 * While there are lots of particles, I have been implemented KD-Tree — 
 * a space-partitioning data structure for organizing points in a k-dimensional 
 * space and making neighbours search more efficient. 
 *
 * The library was made by Ubilabs and coud be found via this a link on GitHub. 
 *
 * Each node would have its own lifetime value and by its death would be replaced by 
 * a new one from XML feed. Virtually it would be the same object, but with 
 * different data, colour and radius.
 *
 * @author Vladimir V. KUCHINOV
 * @email  helloworld@vkuchinov.co.uk
 *
 */

"use strict"

var SCALE_RATIO = 150;
var TIME_RATE = 0.0165; // 1/60

///phase: 0: displaying, 1: pausing
var timing = {
    interval: 30000,
    overal: 0,
    passed: 0,
    phase: 0
};

var TRANSITIONS = 64;
var INTERVALS = {
    A: 5000,
    B: 5000
};
var EXPONENTIAL_COEFFICIENTS = {
    A: 0.5,
    B: 5E3,
    ORDER: 3
};

var NUM_OF_NEIGHBOURS = 8;
var REST_DISTANCE = 0.132;
var PARTICLE_SIZE = 0.05; //for simulatio

var GROUND_OFFSET = 32;
var SCRREN_MARGINS = 32;
var zero;

//wave machine parameters
var MAX_ANGLE = 0.6;
var ANG_INC = 0.0038;

var machine;
var ang = 0.0;
var timeStep = TIME_RATE,
    velocityIterations = 8,
    positionIterations = 3;
var globalPos, globalAngle;

var world = null; //LiquidFun.js requires world as global
var worldBody, worldShape;

var worldEnds = [
    [-4.5, 0],
    [4.5, 0],
    [4.5, -9],
    [-4.5, -9]
];

var mass = [{
    nodes: [
        [-4.4, -0.8],
        [-4.4, -0.1],
        [4.4, -0.8],
        [4.4, -0.1]
    ]
}];

var kdtree;

var tidalSystem = {

    inits: function (dataset_, pause_) {

        INTERVALS.A = pause_;
        INTERVALS.B = pause_ * 1.1;

        zero = window.innerHeight;

        //translate group
        particles.attr("transform", "translate(" + width / 2 + ", " + (height + GROUND_OFFSET) + ")");

        var gravity = new b2Vec2(0, 9.8);
        var psd, particleSystem;

        world = new b2World(gravity);

        worldBody = world.CreateBody(new b2BodyDef());
        worldShape = new b2ChainShape();
        worldShape.vertices = worldEnds.map(function (node) {
            return new b2Vec2(node[0], node[1]);
        });
        worldShape.CreateLoop();
        worldBody.CreateFixtureFromShape(worldShape, 0);
        worldBody.angle = 0;

        //ground
        var bd = new b2BodyDef();
        var ground = world.CreateBody(bd);

        machine = new b2RevoluteJointDef();
        machine.motorSpeed = 0.05 * Math.PI;
        machine.maxMotorTorque = 1e7;
        machine.enableMotor = true;
        machine.joint = machine.InitializeAndCreate(ground, worldShape, new b2Vec2(0, 0));
        machine.time = 0;

        psd = new b2ParticleSystemDef();
        psd.radius = PARTICLE_SIZE;
        psd.dampingStrength = 0.1;
        psd.colorMixingStrength = 1.0;

        particleSystem = world.CreateParticleSystem(psd);

        mass.forEach(function (def) {

            var shape = new b2PolygonShape(),
                pd = new b2ParticleGroupDef();

            shape.vertices = def.nodes.map(function (node) {
                return new b2Vec2(node[0], node[1]);
            });
            pd.shape = shape;
            particleSystem.CreateParticleGroup(pd);

        });

        this.feed(particleSystem, dataset_);

        D3Renderer.filterAll();

    },

    update: function () {

        for (var i = 0; i < nodes.length; i++) {
            this.resetTransition(nodes[i].transition, TRANSITIONS + 1);
        }

        globalPos = worldBody.GetPosition();
        globalAngle = worldBody.GetAngle() * 180 / Math.PI;

        var system = world.particleSystems[0];

        var points = [];
        var buffer = system.GetPositionBuffer();

        for (var i = 0; i < system.GetParticleCount(); i += 2) {
            points.push({
                x: buffer[i],
                y: buffer[i + 1]
            });
        }

        var distance = function (a, b) {
            return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
        }
        var sqrtDistance = function (a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        }

        var kd = new kdTree(points, distance, ["x", "y"]);

        var offset = 0;
        var positionBuf = system.GetPositionBuffer();

        for (var i = 0; i < nodes.length; i++) {

            nodes[i].cx = positionBuf[(i + offset) * 2] * SCALE_RATIO;
            nodes[i].cy = positionBuf[(i + offset) * 2 + 1] * SCALE_RATIO;

            var nearest = kd.nearest({
                x: positionBuf[(i + offset) * 2],
                y: positionBuf[(i + offset) * 2 + 1]
            }, NUM_OF_NEIGHBOURS);

            var distances = [];

            for (var j = 0; j < nearest.length; j++) {

                distances.push(sqrtDistance({
                    x: Number(positionBuf[(i + offset) * 2]),
                    y: Number(positionBuf[(i + offset) * 2 + 1])
                }, {
                    x: Number(nearest[j][0].x),
                    y: Number(nearest[j][0].y)
                }));

            }

            //state: -1: off-screen, 0: foam, 1: normal
            if (Math.max.apply(null, distances) < REST_DISTANCE) {

                nodes[i].state = 1;

            } else {

                //d3.select(this).moveToFront();
                nodes[i].state = 0;

            }

            nodes[i].global = {
                x: globalPos.x,
                y: globalPos.y,
                angle: globalAngle
            };

            //feed transition
            nodes[i].transition.cx.data[0] = Number(nodes[i].cx);
            nodes[i].transition.cx.intervals[0] = 0.0;
            nodes[i].transition.cy.data[0] = Number(nodes[i].cy);
            nodes[i].transition.cy.intervals[0] = 0.0;
            nodes[i].transition.color.data[0] = Number(nodes[i].state);
            nodes[i].transition.color.intervals[0] = 0.0;
            nodes[i].transition.global.data[0] = Number(globalAngle);
            nodes[i].transition.global.intervals[0] = 0.0;

        }

    },

    updateWithPolynomial: function (timing_, steps_) {

        //var t0 = performance.now();

        for (var s = 0; s < steps_; s++) {

            world.Step(timeStep, velocityIterations, positionIterations);
            machine.time += TIME_RATE;
            machine.joint.SetMotorSpeed(0.05 * Math.cos(machine.time) * Math.PI);

            var body = world.bodies[0];
            body.SetTransform(body.GetWorldCenter(), ang);

            if (ang > 0.35 || ang < -0.35) {
                ANG_INC *= -1;
            }
            ang += ANG_INC;

            globalPos = worldBody.GetPosition();
            globalAngle = worldBody.GetAngle() * 180 / Math.PI;

            var system = world.particleSystems[0];

            var points = [];
            var buffer = system.GetPositionBuffer();

            for (var i = 0; i < system.GetParticleCount(); i += 2) {
                points.push({
                    x: buffer[i],
                    y: buffer[i + 1]
                });
            }

            var distance = function (a, b) {
                return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
            }
            var sqrtDistance = function (a, b) {
                return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
            }

            var kd = new kdTree(points, distance, ["x", "y"]);

            var offset = 0;
            var positionBuf = system.GetPositionBuffer();

            for (var i = 0; i < nodes.length; i++) {

                nodes[i].cx = positionBuf[(i + offset) * 2] * SCALE_RATIO;
                nodes[i].cy = positionBuf[(i + offset) * 2 + 1] * SCALE_RATIO;

                var nearest = kd.nearest({
                    x: positionBuf[(i + offset) * 2],
                    y: positionBuf[(i + offset) * 2 + 1]
                }, NUM_OF_NEIGHBOURS);

                var distances = [];

                for (var j = 0; j < nearest.length; j++) {

                    distances.push(sqrtDistance({
                        x: Number(positionBuf[(i + offset) * 2]),
                        y: Number(positionBuf[(i + offset) * 2 + 1])
                    }, {
                        x: Number(nearest[j][0].x),
                        y: Number(nearest[j][0].y)
                    }));

                }

                //state: -1: off-screen, 0: foam, 1: normal
                if (Math.max.apply(null, distances) < REST_DISTANCE) {

                    nodes[i].state = 1;

                } else {

                    //d3.select(this).moveToFront();
                    nodes[i].state = 0;

                }

                nodes[i].global = {
                    x: globalPos.x,
                    y: globalPos.y,
                    angle: globalAngle
                };

                //feed transition
                nodes[i].transition.cx.data[s + 1] = Number(nodes[i].cx);
                nodes[i].transition.cx.intervals[s + 1] = timing_ / steps_ * (s + 1);
                nodes[i].transition.cy.data[s + 1] = Number(nodes[i].cy);
                nodes[i].transition.cy.intervals[s + 1] = timing_ / steps_ * (s + 1);
                nodes[i].transition.color.data[s + 1] = Number(nodes[i].state);
                nodes[i].transition.color.intervals[s + 1] = timing_ / steps_ * (s + 1);
                nodes[i].transition.global.data[s + 1] = Number(globalAngle);
                nodes[i].transition.global.intervals[s + 1] = timing_ / steps_ * (s + 1);

            }

        }

        for (var k = 0; k < nodes.length; k++) {

            nodes[k].transition.cx.intervals.reverse();
            nodes[k].transition.cx.polynomial = new Polynomial(nodes[k].transition.cx.intervals, nodes[k].transition.cx.data, EXPONENTIAL_COEFFICIENTS.ORDER);

            nodes[k].transition.cy.intervals.reverse();
            nodes[k].transition.cy.polynomial = new Polynomial(nodes[k].transition.cy.intervals, nodes[k].transition.cy.data, EXPONENTIAL_COEFFICIENTS.ORDER);

            nodes[k].transition.color.intervals.reverse();
            nodes[k].transition.color.polynomial = new Polynomial(nodes[k].transition.color.intervals, nodes[k].transition.color.data, EXPONENTIAL_COEFFICIENTS.ORDER);

        }

        nodes[0].transition.global.intervals.reverse();
        nodes[0].transition.global.polynomial = new Polynomial(nodes[0].transition.global.intervals, nodes[0].transition.global.data, EXPONENTIAL_COEFFICIENTS.ORDER);

        //var t1 = performance.now();
        //console.log("Doing " + TRANSITIONS + "-steps polynomials in " + Number(t1 - t0).toFixed(2) + " ms");

    },

    staticRender: function () {

        ////d3.selectAll(".particle").remove();

        for (var i = 0; i < nodes.length; i++) {

            var c = nodes[i].calculateColor(nodes[i].state);

            D3Renderer.redrawParticle(i, nodes[i].cx, nodes[i].cy, nodes[i].radius.static, c);

            var bbox = d3.select("#particle_" + i).node().getBBox(),
                middleX = bbox.x + (bbox.width / 2),
                middleY = bbox.y + (bbox.height / 2);

            var absoluteXY = getScreenXY(scene, d3.select("#particle_" + i), middleX, middleY);

            if (absoluteXY.x > SCRREN_MARGINS && absoluteXY.x < (window.innerWidth - SCRREN_MARGINS) && absoluteXY.y < (window.innerHeight - SCRREN_MARGINS * 0.7)) {
                nodes[i].offscreen = 0;
            } else {
                nodes[i].offscreen = 1;
            }

        }

        //tilt back
        global.angle = nodes[0].global.angle;
        var ps = d3.select("#particles").attr("transform", "translate(" + width / 2 + ", " + (height + GROUND_OFFSET) + "),rotate(" + (-nodes[0].global.angle) + ")");

    },

    render: function (timer_) {

        D3Renderer.filterAll();

        var global1;
        var debug = "";

        //d3.selectAll(".particle").remove();

        var interval = timer_.passed;
        var minInterval = this.exponentialMap(0.0, 5E3);
        var maxInterval = this.exponentialMap(1.0, 5E3);
        var smooth = Number(this.map(this.exponentialMap(this.map(interval, 0, INTERVALS.A, 1.0, 0.0), 5E3), minInterval, maxInterval, 0, INTERVALS.B));

        global1 = Number(nodes[0].transition.global.polynomial.get(smooth));

        for (var i = 0; i < nodes.length; i++) {

            if (nodes[i].transition.cx.polynomial != null) {

                var minInterval = this.exponentialMap(0.0, nodes[i].exp);
                var maxInterval = this.exponentialMap(1.0, nodes[i].exp);
                var smooth = Number(this.map(this.exponentialMap(this.map(interval, 0, INTERVALS.A, 1.0, 0.0), nodes[i].exp), minInterval, maxInterval, 0, INTERVALS.B));

                var cx1 = Number(nodes[i].transition.cx.polynomial.get(smooth));
                var cy1 = Number(nodes[i].transition.cy.polynomial.get(smooth));
                var color1 = this.limit(Number(nodes[i].transition.color.polynomial.get(smooth)), 0.0, 1.0).toFixed(4);
                debug += color1 + ", ";

                //console.log(smooth + " " + cx1 + " " + cy1 + " " + color1);
                //upgrade it to 0.0 - 1.0
                //var c = nodes[i].calculateColor(nodes[i].state);

                var c = nodes[i].blendColors(color1);

                D3Renderer.redrawParticle(i, cx1, cy1, nodes[i].radius.static, c);

            }
        }

        //tilt back
        global.angle = global1;
        var ps = d3.select("#particles").attr("transform", "translate(" + width / 2 + ", " + (height + GROUND_OFFSET) + "),rotate(" + (-global1) + ")");

        //console.log(debug);
        //prerendered = false;
        //if(mode == 1 && interval > INTERVALS.A) { prerendered = false; }
    },

    feed: function (system_, dataset_) {

        for (var i = 0; i < system_.GetParticleCount() / 2; i++) {

            //there are messages up to 240 words, that"s why
            //I use "constrain" to limit length to 48 words
            //feel free  to play with these parameters

            var words = dataset_[i].message.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim().split(" ").length;
            var r = this.map(Math.min(Math.max(parseInt(words), 1), 48), 1, 48, 8, 18);

            //var c = colors[this.findByKey(categories, "id", dataset_[i].category, 0)];
            //var f = foams[this.findByKey(categories, "id", dataset_[i].category, 0)];

            nodes.push(new Node(i, i, 0.0, 0.0));
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

        var index = this.findLowestIDByKey(nodes, "offscreen", 0);

        D3Renderer.highlight(particles, index, 2500);

        ////////////////////////////////////////////////
        //TODO TODO TODO TODO TODO
        //while next doesn't belong to selected do {...}
        ////////////////////////////////////////////////

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
        D3Renderer.removeHUD(2500);

    },

    interactive: function (timing_) {

        prerendered = false;

        this.update(timing_);
        this.staticRender();

        var index = this.findLowestIDByKey(nodes, "offscreen", 0);

        D3Renderer.highlight(particles, index, 2500);
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

        D3Renderer.removeHUD(2500);

        this.update(INTERVALS.A);
        this.staticRender();

        var index = {
            nodeID: id_,
            xmlID: nodes[id_].xml
        };

        D3Renderer.highlight(particles, index, 2500);
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

        transition_.cx.data = this.clear(n_);
        transition_.cx.intervals = this.clear(n_);

        transition_.cy.data = this.clear(n_);
        transition_.cy.intervals = this.clear(n_);

        transition_.color.data = this.clear(n_);
        transition_.color.intervals = this.clear(n_);

        transition_.global.data = this.clear(n_);
        transition_.global.intervals = this.clear(n_);

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

        for (var i = 0; i < array_.length; i++) {
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