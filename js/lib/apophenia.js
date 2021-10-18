/**
 * Created by David Harris on 12/4/2014.
 */

// string.format()
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/* -- HELPER FUNCTIONS -- */

var RADPI = Math.PI / 180;
function toRads(ang) {
    return ang * RADPI;
}
var NINETY = toRads(90);

/* -- END HELPER FUNCTIONS -- */

var APOPHENIA = { version: '0.0.1'};

APOPHENIA.init = function(entityManager, gameState) {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    var container;
    var stats;
    var scene;
    var camera;
    var renderer;
    var controls;
    var clock = new THREE.Clock();

    this.addEntityToScene = function(entity) {
        if (entity.mesh != undefined)
            scene.add(entity.mesh);
        else
            scene.add(entity);
    };

    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = -1000;
    scene = new THREE.Scene();
    //var light;
    //scene.add(new THREE.AmbientLight(0x303030));
    //light = new THREE.DirectionalLight(0xffffff);
    //light.position.set(0, 1, 0);
    //scene.add(light);
    renderer = new THREE.WebGLRenderer( { precision: 'lowp' } );
    this.maxAnisotropy = renderer.getMaxAnisotropy();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    camera.lookAt( scene.position );

    var hud = document.createElement('div');
    hud.id = 'hud';
    var bolt = document.createElement('i');
    bolt.className = 'fa fa-bolt';
    hud.appendChild(bolt);
    document.body.appendChild(hud);

//    var headlights = new THREE.SpotLight(0xffffff,4,40);
//    headlights.position.set( 0, 1, 0 );
//    headlights.target = camera;
//
//    APOPHENIA.addEntityToScene(this.headlights);

//    var spotLight = new THREE.SpotLight(0xffffff);
//    spotLight.position.set(0, -500, 0);
//    spotLight.target.position.x = 0;
//    spotLight.target.position.y = 0;
//
//    spotLight.update = function() {
////        spotLight.target.rotation.z += toRads(1);
////        var xOffset = Math.cos(spotLight.target.rotation.z) * 100;
////        var yOffset = Math.sin(spotLight.target.rotation.z) * 100;
////        var spotLightTargetPosition = new THREE.Vector3(xOffset, yOffset, 0);
////        spotLight.target.position.x = spotLightTargetPosition.x;
////        spotLight.target.position.y = spotLightTargetPosition.y;
//        //console.log(spotLight.target.rotation.z, spotLightTargetPosition);
//        spotLight.rotation.z += toRads(1);
//    };

    //entityManager.add(spotLight);

    var light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set( 0, 0, -250);
    scene.add(light);

    animate();

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
        requestAnimationFrame(animate);
        var delta =  clock.getDelta();

        // force camera to follow player
        if (gameState.getState() == APOPHENIA.gameStates.SPACE) {
            gameState.getControls().update(delta);
            entityManager.updateEntities(delta);
            var player = entityManager.getPlayer();
            camera.position.x = player.mesh.position.x;
            camera.position.y = player.mesh.position.y;
            light.position.set(player.mesh.position.x, player.mesh.position.y, -250);
        }

        renderer.render(scene, camera);
        stats.update();
    }

    this.getRenderer = function() {
        return renderer;
    };
};