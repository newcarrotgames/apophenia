APOPHENIA.StarField = function() {
    this.makeParticles = function() {
        geometry = new THREE.Geometry();
        sprite = THREE.ImageUtils.loadTexture("textures/sprites/disc.png");
        for ( i = 0; i < 10000; i ++ ) {
            var vertex = new THREE.Vector3();
            vertex.x = 100000 * Math.random() - 50000;
            vertex.y = 100000 * Math.random() - 50000;
            vertex.z = 5000;
            geometry.vertices.push( vertex );
        }
        material = new THREE.PointCloudMaterial( { size: 5, sizeAttenuation: false, map: sprite, transparent: true } );
        material.color.setHSL( 1, 1, 1 );
        particles = new THREE.PointCloud( geometry, material );
        particles.sortParticles = true;
        APOPHENIA.addEntityToScene(particles);
    };
};