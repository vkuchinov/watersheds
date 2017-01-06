"use strict";

var THEGAME = THEGAME || {};

var world = null;   // LiquidFun requires global world (weird eh?)

THEGAME.Engine = function (babylonEngine) {

    this._babylonEngine = babylonEngine;
    this._scene = null;
    this._skybox = null;
    this._camera = null;
    this._canvas = null;
    this._engine = null;
    this._particleCount = 0;
    this._timeStep = 1.0 / 60.0;
    this._particleRadius = 0.05;
    this._velocityIterations = 8;
    this._positionIterations = 3;
    this._grassMaterial = null;
    this._circleMaterial = null;
    this._groundBody = null;

    var that = this;

    THEGAME.Engine.prototype.createScene = function () {

        that._canvas = document.getElementById('renderCanvas');
        that._engine = new BABYLON.Engine(that._canvas, true);

        // Resize canvas when browser is resized
        window.addEventListener("resize", function () {
            that._engine.resize();
        });

        // create a Scene object
        that._scene = new BABYLON.Scene(that._engine);

        var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), that._scene);


        // camera
        that._camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), that._scene);
        that._camera.setPosition(new BABYLON.Vector3(0, 0, -10));
        //that._scene.activeCamera.attachControl(that._canvas);

        // skybox
        that._skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, that._scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", that._scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", that._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        that._skybox.material = skyboxMaterial;

        // shared materials 
        that._grassMaterial = new BABYLON.StandardMaterial("boxMat", that._scene);
        that._grassMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.5, 0.2);
        //that._grassMaterial.diffuseTexture = new BABYLON.Texture("images/grass_diffuse.jpg", that._scene);
        that._grassMaterial.alpha = 1.0;

        that._circleMaterial = new BABYLON.StandardMaterial("circleMat", that._scene);
        that._circleMaterial.diffuseTexture = new BABYLON.Texture("images/dragme_diffuse.jpg", that._scene);
        that._circleMaterial.alpha = 1.0;


        // Liquid Fun Physics objects
        var gravity = new b2Vec2(0, -10);
        world = new b2World(gravity);

        var bd = new b2BodyDef();
        var ground = world.CreateBody(bd);

        // ground - bottom
        var shape1 = new b2PolygonShape();
        var vertices = shape1.vertices;
        vertices.push(new b2Vec2(-6, -6));
        vertices.push(new b2Vec2(6, -6));
        vertices.push(new b2Vec2(6, -2));
        vertices.push(new b2Vec2(-6, -2));
        ground.CreateFixtureFromShape(shape1, 0);
        that._groundBody = ground;
        // ground - left side
        var shape2 = new b2PolygonShape();
        var vertices = shape2.vertices;
        vertices.push(new b2Vec2(-6, 2));
        vertices.push(new b2Vec2(-5, 0));
        vertices.push(new b2Vec2(-5, -4));
        vertices.push(new b2Vec2(-6, -4));
        ground.CreateFixtureFromShape(shape2, 0);
        // ground - right side
        var shape3 = new b2PolygonShape();
        var vertices = shape3.vertices;
        vertices.push(new b2Vec2(5, 0));
        vertices.push(new b2Vec2(6, 2));
        vertices.push(new b2Vec2(6, -4));
        vertices.push(new b2Vec2(5, -4));
        ground.CreateFixtureFromShape(shape3, 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = that._particleRadius;
        var particleSystem = world.CreateParticleSystem(psd);

        // red jelly circle
        var circle = new b2CircleShape();
        circle.position.Set(-1, 8);
        circle.radius = 0.5;
        var pgd = new b2ParticleGroupDef();
        pgd.flags = b2_elasticParticle;
        pgd.groupFlags = b2_solidParticleGroup;
        pgd.shape = circle;
        pgd.color.Set(192, 0, 0, 255);
        particleSystem.CreateParticleGroup(pgd);

        // green jelly box
        var box = new b2PolygonShape();
        var pgd = new b2ParticleGroupDef();
        box.SetAsBoxXY(1, 0.5);
        pgd.flags = b2_elasticParticle;
        pgd.groupFlags = b2_solidParticleGroup;
        pgd.position.Set(1, 12);
        pgd.angle = -0.5;
        pgd.angularVelocity = 2;
        pgd.shape = box;
        pgd.color.Set(0, 192, 0, 255);
        particleSystem.CreateParticleGroup(pgd);

        // circle (rigid body)
        var bd = new b2BodyDef();
        var circle = new b2CircleShape();
        bd.type = b2_dynamicBody;
        var body = world.CreateBody(bd);
        circle.position.Set(0, 0);
        circle.radius = 0.5;
        body.CreateFixtureFromShape(circle, 0.5);

        // water 
        var shape = new b2PolygonShape();
        var vertices = shape.vertices;
        vertices.push(new b2Vec2(-5, -1));
        vertices.push(new b2Vec2(5, -1));
        vertices.push(new b2Vec2(5, -2));
        vertices.push(new b2Vec2(-5, -2));
        var pd = new b2ParticleGroupDef();
        pd.shape = shape;
        pd.color.Set(0, 0, 192, 255);
        var group = particleSystem.CreateParticleGroup(pd);

        // create babylon particle systems
        var i = 0;
        var system = world.particleSystems[i];

        var color = { r: 1.0, g: 1.0, b: 1.0 };
        switch (i) {
            case 0:
                color.r = 0.7;
                break;
            case 1:
                color.g = 0.7;
                break;
            case 2:
                color.b = 0.7;
                break;
            default:
                break;

        }

        that._particleCount = world.particleSystems[0].GetPositionBuffer().length;
        world.particleSystems[i].babylonParticles = that.createBabylonParticles(system, color);

        that._engine.runRenderLoop(function () {
            // position the skybox
            that._skybox.rotation.y -= 0.0005;

            world.Step(that._timeStep, that._velocityIterations, that._positionIterations);

            that.draw();

            that._scene.render();
        });

        return that._scene;

    }

    THEGAME.Engine.prototype.createBabylonParticles = function (particleSystem, color) {
        // babylon particles
        var fountain = BABYLON.Mesh.CreateBox("fountain", 0.1, that._scene);
        fountain.position.y = 100;
        var particleSystem = new BABYLON.ParticleSystem("particles", that._particleCount, that._scene);
        particleSystem.particleTexture = new BABYLON.Texture("images/particle.png", that._scene);
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        particleSystem.emitter = fountain;
        particleSystem.emitRate = that._particleCount
        particleSystem.updateFunction = that.particleUpdateFunction;
        particleSystem.startPositionFunction = that.particleStartPositionFunction;
        particleSystem.minSize = that._particleRadius * 4.5;
        particleSystem.maxSize = that._particleRadius * 4.5;
        particleSystem.start();

        return particleSystem;
    }

    THEGAME.Engine.prototype.particleStartPositionFunction = function (worldMatrix, positionToUpdate) {
        // start the particles off the visible screen
        positionToUpdate.x = 0;
        positionToUpdate.y = 100;
        positionToUpdate.z = 0;
    }

    THEGAME.Engine.prototype.particleUpdateFunction = function (particlesBJS) {

        if (particlesBJS.length == 0)
            return;

        // draw particle systems
        for (var i = 0, max = world.particleSystems.length; i < max; i++) {
            var system = world.particleSystems[i];

            var particles = system.GetPositionBuffer();
            var color = system.GetColorBuffer();
            var maxParticles = particles.length;
            var transform = new b2Transform();
            transform.SetIdentity();

            for (var i = 0, c = 0; i < maxParticles && i < particlesBJS.length; i += 2, c += 4) {
                particlesBJS[i].position.x = particles[i];
                particlesBJS[i].position.y = particles[i + 1];
                particlesBJS[i].color.r = color[c];
                particlesBJS[i].color.g = color[c + 1];
                particlesBJS[i].color.b = color[c + 2];
            }
        }
    }

    THEGAME.Engine.prototype.draw = function () {
        for (var i = 0, max = world.bodies.length; i < max; i++) {
            var body = world.bodies[i];
            var maxFixtures = body.fixtures.length;
            var transform = body.GetTransform();
            for (var j = 0; j < maxFixtures; j++) {
                var fixture = body.fixtures[j];

                var linePoints = [];



                switch (fixture.shape.type) {
                    case 0:
                        var pos = fixture.body.GetPosition();
                        // circle
                        if (fixture.babylonShape === undefined) {


                            var shape = BABYLON.Mesh.CreateCylinder("cylinder", 0.1, fixture.shape.radius * 2, fixture.shape.radius * 2, 24, 1, that._scene, false);
                            shape.rotation.x = -90 * (Math.PI / 180);
                            shape.setMaterialByID("circleMat");
                            fixture.babylonShape = shape;
                        }

                        var pos = fixture.body.GetPosition();
                        var angle = fixture.body.GetAngle();
                        fixture.babylonShape.position.x = pos.x;
                        fixture.babylonShape.position.y = pos.y;
                        //fixture.babylonShape.rotation.y = angle;



                        break;
                    default:
                        // polygon - we'll create a ribbon for rigid poly's.
                        if (fixture.babylonShape === undefined) {
                            var arrayOfPaths = [];
                            arrayOfPaths[0] = [];
                            arrayOfPaths[0].push(new BABYLON.Vector3(fixture.shape.vertices[0].x, fixture.shape.vertices[0].y, 0))
                            arrayOfPaths[0].push(new BABYLON.Vector3(fixture.shape.vertices[1].x, fixture.shape.vertices[1].y, 0))

                            arrayOfPaths[1] = [];
                            arrayOfPaths[1].push(new BABYLON.Vector3(fixture.shape.vertices[2].x, fixture.shape.vertices[2].y, 0))
                            arrayOfPaths[1].push(new BABYLON.Vector3(fixture.shape.vertices[3].x, fixture.shape.vertices[3].y, 0))

                            var shape = BABYLON.Mesh.CreateRibbon("ribbon", arrayOfPaths, true, false, 0, that._scene);
                            shape.setMaterialByID("boxMat");
                            fixture.babylonShape = shape;
                        }

                        fixture.babylonShape.position.x = fixture.shape.position.x;
                        fixture.babylonShape.position.y = fixture.shape.position.y;
                        break;
                }



              

            }
        }
    };

   
    THEGAME.Engine.prototype.getMouseCoords = function (event) {

      
        var pMScene = that._scene.getProjectionMatrix();
        var vMScene = that._scene.getViewMatrix();
        var wMCamera = BABYLON.Matrix.Identity(); //scene.activeCamera.getWorldMatrix();
        var globalView = that._scene.activeCamera.viewport.toGlobal(that._engine);
        var ViewportWidth = globalView.width;
        var ViewportHeight = globalView.height;
       
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        var ratioX = ViewportWidth / windowWidth;
        var ratioY = ViewportHeight / windowHeight;

        var x = event.clientX * ratioX;
        var y = event.clientY * ratioY;
        var z = 0;
        var screenVector = new BABYLON.Vector3(x, y, z);

        var worldVector = BABYLON.Vector3.Unproject(screenVector, ViewportWidth, ViewportHeight, wMCamera, vMScene, pMScene);

        var xPos = (-that._scene.activeCamera.position.z) * worldVector.x;
        var yPos = (-that._scene.activeCamera.position.z) * worldVector.y;

        return { x: xPos, y: yPos, z: 0 };

    }

    THEGAME.Engine.prototype.showStatus = function (msg) {
        document.getElementById("divStatus").innerHTML = msg;
    }
}
