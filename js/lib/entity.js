/**
 * Created by David Harris on 12/1/2014.
 */

/* -- ENTITY (base class for all game objects) -- */

// TODO: name needs to be int not string for faster comparisons
APOPHENIA.entity = function(name, mesh) {
    this.name = name;
    this.mesh = mesh;
    this.velocity = new THREE.Vector3();
};

APOPHENIA.entity.prototype.moveTo = function(pos) {
//    this.destination = pos;
//    this.velocity = new THREE.Vector3().subVectors(pos.x, pos.y);
};

APOPHENIA.entity.prototype.update = function(delta) {
    this.mesh.position.x += ( - this.velocity.x ) * delta;
    this.mesh.position.y += ( - this.velocity.y ) * delta;
    this.mesh.position.z += ( - this.velocity.z ) * delta;
//    this.mesh.translateX( this.velocity.x );
//    this.mesh.translateY( this.velocity.y );
//    this.mesh.translateZ( this.velocity.z );
};

/* -- asteroid  -- */

APOPHENIA.Asteroid = function() {
    var material = new APOPHENIA.MaterialFactory().makeMaterial('asteroid');
    mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(Math.random() * 50 + 10, 0), material);
    APOPHENIA.entity.call(this, 'asteroid', mesh);
    this.velocity.x = 50 - Math.random();
    this.velocity.y = 50 - Math.random();
    this.rotationVelocity = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    this.mesh.position.set(Math.random() * 10000, Math.random() * 10000, 0);
    this.mesh.rotation.y = Math.random() * Math.PI;
    //this.mesh.position.set(200, 200, 0);
};

APOPHENIA.Asteroid.prototype = Object.create(APOPHENIA.entity.prototype);

APOPHENIA.Asteroid.prototype.update = function(delta) {
    // TODO: get out of gimble lock
    //this.mesh.rotation.x += toRads(1);
    //this.mesh.rotation.y += toRads(1);
    //this.mesh.rotation.z += toRads(this.rotationVelocity.z);
    this.mesh.rotation.y += toRads(this.rotationVelocity.y);
    //this.mesh.rotation.x += toRads(this.rotationVelocity.x);
    APOPHENIA.entity.prototype.update.call(this, delta);
};

APOPHENIA.AsteroidField = function() {
    var asteroids = [];

    for (var i = 0; i != 100; i++) {
        asteroids.push(new APOPHENIA.Asteroid());
    }

    this.getAsteroids = function() {
        return asteroids;
    };
};

/* -- PLAYER -- */

APOPHENIA.player = function() {
    var parts = [];

    var engine1 = new THREE.Mesh(new THREE.CylinderGeometry(140, 60, 200, 32), undefined);
    engine1.position.x = 300;
    engine1.position.y = 280;
    engine1.position.z = 200;
    engine1.updateMatrix();
    parts.push(engine1);

    var engine2 = new THREE.Mesh(new THREE.CylinderGeometry(140, 60, 200, 32), undefined);
    engine2.position.x = -300;
    engine2.position.y = 280;
    engine2.position.z = 200;
    engine2.updateMatrix();
    parts.push(engine2);

    var cockpit = new THREE.Mesh(new THREE.DodecahedronGeometry(150, 0), undefined) ;
    cockpit.position.y = -20;
    cockpit.updateMatrix();
    parts.push(cockpit);

    var gun1 = new THREE.Mesh(new THREE.BoxGeometry(25, 100, 25, 4), undefined);
    gun1.position.x = 125;
    gun1.position.y = -150;
    gun1.updateMatrix();
    parts.push(gun1);

    var gun2 = new THREE.Mesh(new THREE.BoxGeometry(25, 100, 25, 4), undefined);
    gun2.position.x = -125;
    gun2.position.y = -150;
    gun2.updateMatrix();
    parts.push(gun2);

    var engineSupport1 = new THREE.Mesh(new THREE.BoxGeometry(50, 300, 40, 4), undefined);
    engineSupport1.position.x = 195;
    engineSupport1.position.y = 155;
    engineSupport1.position.z = 100;
    engineSupport1.rotation.y = toRads(-45);
    engineSupport1.rotation.z = toRads(-60);
    engineSupport1.updateMatrix();
    parts.push(engineSupport1);

    var engineSupport2 = new THREE.Mesh(new THREE.BoxGeometry(50, 300, 40, 4), undefined);
    engineSupport2.position.x = -195;
    engineSupport2.position.y = 155;
    engineSupport2.position.z = 100;
    engineSupport2.rotation.y = toRads(45);
    engineSupport2.rotation.z = toRads(60);
    engineSupport2.updateMatrix();
    parts.push(engineSupport2);

    var material = new APOPHENIA.MaterialFactory().makeMaterial('hull');
    var finalHull = new THREE.Mesh(new THREE.BoxGeometry(300, 250, 80), material);
    finalHull.rotation.z = toRads(-180);
    finalHull.updateMatrix();
    parts.forEach(function(part) {
        finalHull.geometry.merge(part.geometry, part.matrix);
    });
    finalHull.scale.set(0.1, 0.1, 0.1);
    finalHull.updateMatrix();
    finalHull.rotation.set( 0, 0, 0 );

    APOPHENIA.entity.call(this, 'player', finalHull);
};

APOPHENIA.player.prototype = Object.create(APOPHENIA.entity.prototype);

APOPHENIA.player.prototype.update = function(delta) {
    APOPHENIA.entity.prototype.update.call(this, delta);
};
