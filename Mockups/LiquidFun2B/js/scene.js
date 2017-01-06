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


https://www.youtube.com/watch?v=oahdiYqEFtY [rest density white particles]

WHAT IS REST DENSITY?
The density of a small portion of a fluid in a Lorentz frame in which that 
portion of the fluid is at rest.

The pressure for each particle is calculated from its density using:

P_i = k(\rho_i - \rho_0)  where \rho_0  is the some non-zero rest density.

The first problem I encountered was with the pressure model; it only acts as a repulsive force if 
the particle density is greater than the rest density. If a particle has only a small number of neighbours, 
the pressure force will attract them to form a cluster of particles all sharing the same space. 
In my experiments, I often found large numbers of clusters of three or four particles all in 
the same position. It took me a while to figure out what was going on because Müller states 
that the value of the rest density “mathematically has no effect on pressure forces”, 
which is only true given a fairly uniform density of particles far from the boundary.


WAVE RIPPLES
http://blog.char95.com/demos/2d-water-ripples-with-perspective/?3
https://www.youtube.com/watch?v=bUSCIkybFUc

TUNNEL ALGORITHM
CAs

https://github.com/xiweiihuang/PbyP/tree/gh-pages/waterRipple
https://uk.pinterest.com/pin/228487381069936652/
https://vimeo.com/59108620
*/

'use strict';

function Node(id_, parent_){
    
    this.id = id_;
    this.parent = parent_;
    
    if (this.parent != null) { 
    this.radius = (3.0 + Math.random() * 5.0) / 100;
    //hue for HSL
    this.hue = Math.floor(Math.random() * 360);
    }
    else {
        
    this.radius = 0.01;
    //hue for HSL
    this.hue = 0;
        
    }

}

var boundsBody, boxShape;
var jd;
var inc = 0.01;

//nodes
var nodes = [];

var currentFrame = 0;
var dir = 2.0;
var ang = 0.0;

var label = "particles: ";

var world;
var boundsNodes = [[-3, 0], [3, 0], [3, 4], [-3   , 4]]; 
var floaters = [
	//{nodes:[[-0.1, -0.2],[0.1, -0.2],[0.1, 0.2],[-0.1, 0.2]], pos:[0.5, 2]},
	{nodes:[[0.0, 0.0],[0.25, 0.0],[0.25, 0.25]], pos:[0.0, 0.25]}
];
var pgDefs = [		//  particleGroups
	{nodes:[[-2.9, 1.5], [-2.9, 0.1], [0.9, 1.5], [2.9, 0.1]]}
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
		psd.radius = 0.04;				 
		psd.dampingStrength = 0.1; 
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
        
        for(var i = 0; i <  world.particleSystems[0].GetParticleCount(); i++){
         
            if(i % 2 == 0) { nodes.push(new Node(i, world.particleSystems[0])); }
            else { nodes.push(new Node(i, null)); }
        }

	},
	update: function(){
        
        //if(Math.abs(boundsBody.angle) > 0.5) inc *= -1;
        //boundsBody.angle += inc;
        
		world.Step(timeStep, velocityIterations, positionIterations);
        jd.time += 1 / 60;
        jd.joint.SetMotorSpeed(0.05 * Math.cos(jd.time) * Math.PI);
        

       var pg =  world.particleSystems[0].particleGroups[0];
       if(currentFrame % 650 > 0 && currentFrame % 650 < 60) pg.ApplyForce(new b2Vec2(-189, 6.2), new b2Vec2(0.0, 0.0));
//      
//            if(pos.x > 2.7 || pos.x < -2.7 ) { dir *= -1; body.ApplyForce(new b2Vec2(0, 0), body.GetWorldCenter()); }
//            body.ApplyForce(new b2Vec2(-dir, 0), body.GetWorldCenter());
            // body.SetTransform(body.GetWorldCenter(), ang);
            //if(currentFrame % 30 == 0) { dir *= -1; }
//        
//        //shape.position.Set(0, 0.1);
//        //console.log(world.bodies[1]);
//        ang += 0.4;
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
    currentFrame++; 
	window.requestAnimationFrame(render);
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
			var pos = b.GetPosition(), angle = b.GetAngle() * 180 / Math.PI;
			return 'translate(' + pos.x + ', ' + pos.y + '), rotate(' + angle + ')';
		});
		bodyGroups.exit().remove();
        
	},
	drawParicles: function(selection, system){ 
        
        //gets particle groups out of data
        //
		var particleGroup = selection.selectAll('g.particle').data(system.particleGroups)
		var positionBuf = system.GetPositionBuffer();
            
		particleGroup.enter().append('g').classed('particle', true);
		particleGroup.each(function(pg){
            
            //replace standard particle with node [carrier]
            
			var dataSet = d3.select(this).selectAll('circle').data(new Array(pg.GetParticleCount()));
			var offset = pg.GetBufferIndex();
			dataSet.enter().append('circle').attr('r', function(d, i){ return nodes[i].radius; });
			dataSet
            .attr("fill",  function(d, i){ return d3.hsl(nodes[i].hue, 0.8, 0.7); })
            
            .attr('cx', function(d, i){
				return positionBuf[(i + offset) * 2];
			}).attr('cy', function(d, i){
				return positionBuf[(i + offset) * 2 + 1];
			});
			dataSet.exit().remove();
		});
        
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