/* worldbuilder application flie */

// create mongo collection for storing world objects
Objects = new Mongo.Collection("objects");

if (Meteor.isClient) {

    angular.module('worldbuilder', ['angular-meteor', 'ui.bootstrap-slider']);

    angular.module('worldbuilder').controller('WorldbuilderCtrl', function ($scope, $meteor) {

        $scope.objects = $meteor.collection(Objects);

        $scope.position = {
            x: 0,
            y: 0,
            z: 0
        };

        $scope.rotation = {
            x: 0,
            y: 0,
            z: 0
        };

        $scope.scale = {
            x: 1,
            y: 1,
            z: 1
        };

        /**
         * Convert degrees to radians
         */
        $scope.deg2rad = function(degree) { 
            return degree*(Math.PI/180); 
        };

        $scope.updatePosition = function() {

            cube.position.x = $scope.position.x * 100;
            cube.position.y = $scope.position.y * 100;
            cube.position.z = $scope.position.z * 100;

            manipulator.position = cube.position;
            render();
        
        };

        $scope.updateRotation = function() {

            cube.rotation.x = $scope.deg2rad($scope.rotation.x);
            cube.rotation.y = $scope.deg2rad($scope.rotation.y);
            cube.rotation.z = $scope.deg2rad($scope.rotation.z);
            render();
        
        };

        $scope.updateScale = function() {

            cube.scale = $scope.scale;
            render();
        
        };

        $scope.remove = function(object) {
            $scope.objects.remove(object);
        };

        $scope.removeAll = function() {
            $scope.objects.remove();
        };

    });

    Meteor.startup(function () {

        var _radius = 500,
            _height = window.innerHeight,
            _width = window.innerWidth;

        var scene    = new THREE.Scene(); 
        var camera = new THREE.PerspectiveCamera( 60, _width / _height, 1, 10000 );
        camera.position.x = 500;
        camera.position.y = 250;
        camera.position.z = 500;

        //camera.lookAt( new THREE.Vector3() );

        var renderer = new THREE.WebGLRenderer({antialias:true, clearAlpha: 1, clearColor: 0x000000}); 

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '2px';
        stats.domElement.style.left = '2px';
        stats.domElement.style.zIndex = 100;
        document.body.appendChild( stats.domElement );

        var material = new THREE.MeshLambertMaterial({ 
            color:   0x999999,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });


        var geometry = new THREE.CubeGeometry(100, 100, 100);

        cube = new THREE.Mesh( geometry, material );



        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
        directionalLight.position.set(5, 10, 10); 

        var ambientLight = new THREE.AmbientLight( 0x202020 ); // soft white light 


        var grid = new THREE.Grid();
        scene.add(grid);

        // Axis
        manipulator = new THREE.ManipulatorTool();
        scene.add(manipulator);

        scene.add(directionalLight);
        scene.add(ambientLight);
        scene.add(cube);

        function animate() {

            requestAnimationFrame( animate );

            render();
            controls.update();
            stats.update();

        }

        function render() {
            renderer.render( scene, camera );
        }


        var controls = new THREE.TrackballControls( camera, renderer.domElement );
        controls.rotateSpeed = 2.0;
        controls.zoomSpeed = 0.1;
        controls.panSpeed = 0.2;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = false;
        controls.dynamicDampingFactor = 0.3;
        controls.minDistance = 0;
        controls.maxDistance = _radius * 100;
        controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]

        controls.addEventListener('change', render);

        animate();

    });

}


