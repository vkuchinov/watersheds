/*

https://google.github.io/liquidfun/API-Ref/html/structb2_particle_system_def.html#a1fb1cbdcbc28e68e5b6497f08a671189

b2ParticleSystemDef.dampingStrength

                    reduces velocity along the collision normal,
                    smaller value reduces less

                    this.colorMixingStrength = .5;
                    this.dampingStrength = 1;
                    this.destroyByAge = true;
                    this.ejectionStrength = .5;
                    this.elasticStrength = .25;
                    this.lifetimeGranularity = 1 / 60;
                    this.powderStrength = .5;
                    this.pressureStrength = .05;
                    this.radius = 1;
                    this.repulsiveStrength = 1;
                    this.springStrength = .25;
                    this.staticPressureIterations = 8;
                    this.staticPressureRelaxation = .2;
                    this.staticPressureStrength = .2;
                    this.surfaceTensionNormalStrength = .2;
                    this.surfaceTensionPressureStrength = .2;
                    this.viscousStrength = .25

REFERENCES:
http://codepen.io/cx20/pen/uoByL
http://blog.sethladd.com/2011/09/box2d-impulse-and-javascript.html

http://jsdo.it/NaD_Graphics/IAr4

GetPositionBuffer()
Get the position of each particle Array is length GetParticleCount()
returns the pointer to the head of the particle positions array.


GetBufferIndex()


GetDensity() ???
there is no GetDensity() @ liquidfun.js

REPLACE DATA AND COLOR, NOT PHYSICAL NODE
!!!!!!!!!!!!!!!!!!!!!!!!!!!
KD_TREE
MAX OF TWO-THREE NEIGHBOURS
!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/

'use strict';

function saveFile(data_){

  var filename = $("debug.txt").val()
  var blob = new Blob([data_], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename);

}

function Node(id_, parent_){
    
    this.id = id_;
    this.parent = parent_;
    
    this.closest = {x: 0, y: 0};
    
    if (this.parent != null) { 
    this.radius = (3.0 + Math.random() * 6.0) / 100;
    //hue for HSL
    this.hue = Math.floor(Math.random() * 360);
    }
    else {
        
    this.radius = 0.01;
    //hue for HSL
    this.hue = 0;
        
    }
    
    this.getClosestDistance = function(index_, positions_){
        
        var currentPosition = positions_[index_];
        var tmpDistance = Number.POSITIVE_INFINITY;
        
        for(var i = 0; i < positions_.length / 2; i++){
         
            //if(positions_[i].x != undefined || positions_[i].y != undefined) { console.log("shit"); } 
            if(i != index_ && this.distance(currentPosition, positions_[i]) < tmpDistance) { tmpDistance = this.distance(currentPosition, positions_[i]); this.closest = positions_[i]; }
            
        }
        
        return tmpDistance;
        
    }
    
    this.distance = function(a_, b_){
     
        return Math.sqrt(Math.pow(b_.x - a_.x, 2.0) + Math.pow(b_.y - a_.y, 2.0));
        
    }

}

var globalAngle = 0; 
var globalPos;

var boundsBody, boxShape;
var jd;
var inc = 0.02;

//nodes
var nodes = [];

var currentFrame = 0;
var dir = 2.0;
var ang = 0.0;
var ang_inc = 0.0026;

var label = "particles: ";

//KD TREE
var tree;
var distance = function(a, b){ return Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2); }
var sqrtDistance = function(a, b){ return Math.sqrt(Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2)); }

var world;
var boundsNodes = [[-4.5, 0], [4.5, 0], [4.5, 9], [-4.5, 9]]; 
var floaters = [
	//{nodes:[[-0.1, -0.2],[0.1, -0.2],[0.1, 0.2],[-0.1, 0.2]], pos:[0.5, 2]},
	{nodes:[[0.0, 0.0],[0.25, 0.0],[0.25, 0.25]], pos:[0.0, 0.25]}
];
var pgDefs = [		//  particleGroups
	{nodes:[[-2.7, 1.0], [-2.7, 0.2], [2.7, 1.0], [2.7, 0.2]]}
	//{nodes:[[-0.5, 2.0], [-1.9, 0.1], [-1.9, 2], [-0.5, 1.0]]}
];
var timeStep = 1.0 / 60.0, velocityIterations = 8, positionIterations = 3;

var liquidFunWorld = {

	init: function() {
        
		var gravity = new b2Vec2(0, -10);
	
		var psd, particleSystem;

		world = new b2World(gravity);

		boundsBody = world.CreateBody(new b2BodyDef());
		boxShape = new b2ChainShape();
		boxShape.vertices = boundsNodes.map(function(node){
			return new b2Vec2(node[0], node[1]);
		});
		boxShape.CreateLoop();
		boundsBody.CreateFixtureFromShape(boxShape, 0);
        boundsBody.angle = 0;
        
        var bd = new b2BodyDef();
        
        //        bd.type = b2_dynamicBody;
        //        bd.allowSleep = false;
        //        bd.position.Set(0, 1);
        //        var body = world.CreateBody(bd);
        //        
        //        var b1 = new b2PolygonShape();
        //        b1.SetAsBoxXYCenterAngle(0.05, 1, new b2Vec2(5, 0), 0);
        //        body.CreateFixtureFromShape(b1, 5);
        

        var ground = world.CreateBody(bd);
        
        jd = new b2RevoluteJointDef();
        jd.motorSpeed = 0.05 * Math.PI;
        jd.maxMotorTorque = 1e7;
        jd.enableMotor = true;
        jd.joint = jd.InitializeAndCreate(ground, boxShape, new b2Vec2(0, 0));
        jd.time = 0;
        
//		floaters.forEach(function(floaterDef){
//            
//			var dynamicBodyDef = new b2BodyDef(), body, shape;
//			dynamicBodyDef.type = b2_dynamicBody;
//			body = world.CreateBody(dynamicBodyDef);
//			shape = new b2ChainShape();
//			shape.vertices = floaterDef.nodes.map(function(node){
//				return new b2Vec2(node[0], node[1]);
//			});
//			shape.CreateLoop();
//			body.CreateFixtureFromShape(shape, 1);
//			body.SetTransform(new b2Vec2(floaterDef.pos[0], floaterDef.pos[1]), 0);
//		
//			body.SetMassData(new b2MassData(0.1, new b2Vec2(0, 0),0.2));
//            //body.applyForce(new b2Vec2(-0.01, 0), new b2Vec2(floaterDef.pos[0], floaterDef.pos[1]), true );
//		});


        var counter = 0;
        
		psd = new b2ParticleSystemDef();
        //particle size
		psd.radius = 0.05;				 
		psd.dampingStrength = 0.01; 
        psd.colorMixingStrength = 1.0;
        
		particleSystem = world.CreateParticleSystem(psd);

		pgDefs.forEach(function(def){
            
			var shape = new b2PolygonShape(), pd = new b2ParticleGroupDef();
            
            //return x,y vector for d3 renderer
			shape.vertices = def.nodes.map(function(node){
				return new b2Vec2(node[0], node[1]);
			});
			pd.shape = shape;
			particleSystem.CreateParticleGroup(pd);

		});
        
        var data = "";
        var positionBuf = world.particleSystems[0].GetPositionBuffer();
        
        for(var i = 0; i <  world.particleSystems[0].GetParticleCount() / 2; i++){
         
            if(i % 3 == 0.1) { nodes.push(new Node(i, world.particleSystems[0])); }
            else { nodes.push(new Node(i, null)); }
            
            data += "x: " + positionBuf[i * 2] + ", y: " + positionBuf[i * 2 + 1] + "\n";
        }
        
                
        //saveFile(data);

	},
	update: function(){
        
        //if(Math.abs(boundsBody.angle) > 0.5) inc *= -1;
        //boundsBody.angle += inc;
        
		world.Step(timeStep, velocityIterations, positionIterations);
        jd.time += 1 / 60;
        jd.joint.SetMotorSpeed(0.05 * Math.cos(jd.time) * Math.PI);
        

        var body = world.bodies[0];
 
        //var pos =body.GetPosition();
        //if(pos.x > 2.7 || pos.x < -2.7 ) { dir *= -1; body.ApplyForce(new b2Vec2(0, 0), body.GetWorldCenter()); }
        //body.ApplyForce(new b2Vec2(-dir, 0), body.GetWorldCenter());
        body.SetTransform(body.GetWorldCenter(), ang);
        //if(currentFrame % 30 == 0) { dir *= -1; }
        
        //shape.position.Set(0, 0.1);
        //console.log(world.bodies[1]);
       
        if(ang > 0.35 || ang < -0.35) {  ang_inc *= -1; }
        ang += ang_inc;
        
        currentFrame++;
	}
};

var init = function(){
    
	liquidFunWorld.init();


	d3Renderer.init();
	window.onresize = d3Renderer.resize;
	render();

};

var render = function(){
    
    //rotate boxShape
    //console.log(boxShape.vertices[0]);
    //boxShape.vertices[0].x = -5;
    
    //world.Step(timeStep, velocityIterations, positionIterations);


	liquidFunWorld.update();
    d3Renderer.render(world);
    //currentFrame++; 
    window.requestAnimationFrame(render);
    currentFrame++;
};

var d3Renderer = {
	init: function(){
		var viz = d3.select('body').append('svg').attr('id', 'viz').append('g').classed('world', true);
		d3Renderer.resize();
	},
	render: function(world){
		var viz = d3.select('svg#viz g.world');
        //redraws bounds
        
        
		d3Renderer.drawBodies(viz, world.bodies);
        //redraws particles
		d3Renderer.drawParicles(viz, world.particleSystems[0]);
        //redraw debugging stroke
        d3Renderer.drawDebug(viz, label);
        
	},
    
    drawDebug: function(selection, label){
        
        selection.append("text")
        //.attr("x", "-14em")
        //.attr("y", "19em")
        //.attr("transform", "rotate(180)")
        .style("font-family", "Arial")
        .style("font-size", "0.16px")
        .style("text-anchor", "start")
        .attr("fill", "#FFFFFF")
        .attr("transform", "translate(-2.75, 3.65)scale(-1,1)rotate(180)")
        .text("particles:" + world.particleSystems[0].GetParticleCount());

	},
    
	drawBodies: function(selection, bodies){
        
		var bounds = d3.svg.line().x(function(vec){return vec.x;}).y(function(vec){return vec.y;});
		var bodyGroups = selection.selectAll('g.body').data(bodies, function(b){
			return b.ptr;
		});
        
		bodyGroups.enter().append('g').classed('body', true).attr('fill', 'none').attr('stroke', "#FF00FF").attr('stroke-width', 0.01);
		bodyGroups.each(function(b){
			d3.select(this).selectAll('path').data(b.fixtures).enter().append('path').attr('d', function(fixture){
				return bounds(fixture.shape.vertices);
			});
		});
		bodyGroups.attr('transform', function(b){
			globalPos = b.GetPosition(), globalAngle = b.GetAngle() * 180 / Math.PI;
			return 'translate(' + globalPos.x + ', ' + globalPos.y + '), rotate(' + (globalAngle - ang * 180 / Math.PI) + ')';
		});
		bodyGroups.exit().remove();
        
	},
    
    calculatePositions: function(system, offset_){
        
        var output = [];
        
        var length = system.GetParticleCount()/2;
        
        //GetVelocityBuffer
        //SetDensity
        
        var positionBuf = system.GetPositionBuffer();
        //console.log(positionBuf.length);
        for(var i = 0; i < length; i++){
            output.push({x: positionBuf[(i + offset_) * 2], y: positionBuf[(i + offset_) * 2 + 1]});
        }
        
        return output;
        
    },
    
	drawParicles: function(selection, system){ 
        
        var points = d3Renderer.calculatePositions(system, system.particleGroups[0].GetBufferIndex());
        tree = new kdTree(points, distance, ["x", "y"]);
 
        //gets particle groups out of data
        //
		var particleGroup = selection.selectAll('g.particle').data(system.particleGroups)
		var positionBuf = system.GetPositionBuffer();
		particleGroup.enter().append('g').classed('particle', true)
		particleGroup.each(function(pg){
            
            //replace standard particle with node [carrier]
            
			var dataSet = d3.select(this).selectAll('circle').data(new Array(pg.GetParticleCount()));
			var offset = pg.GetBufferIndex();
			dataSet.enter().append('circle').attr('r', function(d, i){ return nodes[i].radius; });
			dataSet
            .attr("fill",  function(d, i){ 
                
                var nearest = tree.nearest({x: points[nodes[i].id].x, y: points[nodes[i].id].y}, 3);
                
                var distances = [];
                

                else { return d3.hsl(nodes[i].hue, 0.8, 0.7); }
            
            
            })
            
            .attr('cx', function(d, i){
				return positionBuf[(i + offset) * 2];
			}).attr('cy', function(d, i){
				return positionBuf[(i + offset) * 2 + 1];
			});

            
			dataSet.exit().remove();
		});
        particleGroup.attr("transform", 'translate(' + globalPos.x + ', ' + globalPos.y + '), rotate(' + (globalAngle - ang * 180 / Math.PI) + ')');
		particleGroup.exit().remove();
        
	},
	resize: function(){
		var w = window.innerWidth, h = window.innerHeight;
		var scale = (w < h ? w : h) * 0.23;
		var viz = d3.select('svg#viz');
		viz.style('width', '100%').style('height', h + 'px');
		var translate = 'translate(' + (w/2) + ', ' + (h/2 + scale*2) + ')';
		var scale = 'scale(' + scale + ', ' + (-scale) + ')';
		viz.select('g').attr('transform', [translate, scale].join());
	}
};

window.onload = init;