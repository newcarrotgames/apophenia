/**
 * Created by David on 12/14/14.
 */

APOPHENIA.primitiveTypes = {
    cube: 'cube',
    sphere: 'sphere',
    cylinder: 'cylinder'
};

APOPHENIA.PrimitiveFactory = function() {
    var types = APOPHENIA.primitiveTypes;
    this.makePrimitive = function(specs, material) {
        if (type == types.cube) {
            var geom = new THREE.BoxGeometry(specs.height, specs.depth, specs.width);
        } else if (type == types.sphere) {
            var geom = new THREE.DodecahedronGeometry(specs.radius, 0);
        } else if (type == types.cylinder) {
            var geom = new THREE.CylinderGeometry(specs.topRadius, specs.bottomRadius, specs.height, specs.detail);
        }
        return new THREE.Mesh(geom, material);
    };
};

APOPHENIA.MaterialFactory = function() {
    var hullTexture = THREE.ImageUtils.loadTexture("textures/hull1.jpg");
    var circuitTexture = THREE.ImageUtils.loadTexture("textures/microscheme.png");
    var asteroidTexture = THREE.ImageUtils.loadTexture("textures/asteroid.jpg");
    var textures = [ hullTexture, circuitTexture ];
    textures.forEach(function (texture) {
        texture.anisotropy = APOPHENIA.maxAnisotropy;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });
    this.makeMaterial = function(type) {
        if (type == 'hull') {
            return new THREE.MeshPhongMaterial({ color: 0xffffff, map: hullTexture });
        } else if (type == 'circuit') {
            return new THREE.MeshPhongMaterial({ color: 0xffffff, map: circuitTexture });
        } else if (type == 'asteroid') {
            return new THREE.MeshPhongMaterial({ color: 0xffffff, map: asteroidTexture });
        } else if (type == 'paneling') {
            var map = THREE.ImageUtils.loadTexture('textures/francesiloside2.jpg');
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 16;
            return new THREE.MeshLambertMaterial({ map: map, side: THREE.DoubleSide });
        } else {
            console.error('Unknown material name')
        }
    };
};