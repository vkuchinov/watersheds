var _gameEngine = null;
var _mouseJoint = null;

window.onload = (function () {

    // Check that browser supports WebGL
    if (!BABYLON.Engine.isSupported()) {
        document.getElementById("notSupported").className = "";
        document.getElementById("opacityMask").className = "";
    } else {

        // create Babylon Engine

        _gameEngine = new THEGAME.Engine();

        var scene = _gameEngine.createScene();

    }
});

document.addEventListener('mousedown', function (event) {
    if (_gameEngine != null) {
        var p = _gameEngine.getMouseCoords(event);
        var aabb = new b2AABB;
        var d = new b2Vec2;

        d.Set(0.01, 0.01);
        b2Vec2.Sub(aabb.lowerBound, p, d);
        b2Vec2.Add(aabb.upperBound, p, d);

        var queryCallback = new QueryCallback(p);
        world.QueryAABB(queryCallback, aabb);

        if (queryCallback.fixture) {
            var body = queryCallback.fixture.body;
            var md = new b2MouseJointDef;
            md.bodyA = _gameEngine._groundBody;
            md.bodyB = body;
            md.target = p;
            md.maxForce = 1000 * body.GetMass();
            _mouseJoint = world.CreateJoint(md);
            body.SetAwake(true);
        }

    }
});

document.addEventListener('mousemove', function (event) {
    if (_gameEngine != null) {
        var p = _gameEngine.getMouseCoords(event);
        if (_mouseJoint) {
            _mouseJoint.SetTarget(p);
        }
    }
});

document.addEventListener('mouseup', function (event) {
    if (_gameEngine != null) {
        if (_mouseJoint) {
            world.DestroyJoint(_mouseJoint);
            _mouseJoint = null;
        }
    }
});

function QueryCallback(point) {
    this.point = point;
    this.fixture = null;
}

QueryCallback.prototype.ReportFixture = function (fixture) {
    var body = fixture.body;
    if (body.GetType() === b2_dynamicBody) {
        var inside = fixture.TestPoint(this.point);
        if (inside) {
            this.fixture = fixture;
            return true;
        }
    }
    return false;
};



