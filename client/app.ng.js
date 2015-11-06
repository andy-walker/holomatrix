/* worldbuilder application flie */

// create mongo collection for storing world objects
SceneObjects = new Mongo.Collection("SceneObjects");

if (Meteor.isClient) {

    angular.module('worldbuilder', ['angular-meteor', 'ui.bootstrap-slider']);

    angular.module('worldbuilder').controller('WorldbuilderCtrl', function ($scope, $meteor) {

        $scope.sceneObjects     = {};
        $scope.sceneCollection  = $meteor.collection(SceneObjects);
        $scope.selectedObject   = '';
        
        $scope.objectProperties = {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale:    { x: 1, y: 1, z: 1 },
        };

        $scope.manipulator      = false;
        
        Meteor.subscribe("SceneUpdates");
        
        /**
         * Convert degrees to radians
         */
        $scope.deg2rad = function(degree) { 
            return degree*(Math.PI/180); 
        };

        $scope.addPrimitive = function(primitiveType) {
            
            var material = new THREE.MeshLambertMaterial({ 
                color:   0x999999,
                shading: THREE.SmoothShading,
                side: THREE.DoubleSide
            });

            var geometry   = new THREE[primitiveType + 'Geometry'](100, 100, 100);
            var objectName = $scope.getUniqueName(primitiveType);

            $scope.sceneObjects[objectName] = new THREE.Mesh( geometry, material );

            scene.add($scope.sceneObjects[objectName]);

            if (!$scope.manipulator) {
                $scope.manipulator = new THREE.ManipulatorTool();
                scene.add($scope.manipulator);
            } else {
                $scope.manipulator.position = $scope.sceneObjects[objectName].position;
            }

            $scope.selectedObject = $scope.sceneObjects[objectName];
            $scope.selectedObject.name     = objectName;
            $scope.selectedObject.position = { x: 0, y: 0, z: 0 };
            $scope.selectedObject.rotation = { x: 0, y: 0, z: 0 };
            $scope.selectedObject.scale    = { x: 1, y: 1, z: 1 };

            $scope.objectProperties = {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale:    { x: 1, y: 1, z: 1 },
            };
        
        };

        $scope.getUniqueName = function(objectType) {
            var objectIndex = 1;
            objectType = objectType.toLowerCase();
            while ((objectType + objectIndex) in $scope.sceneObjects)
                objectIndex++;
            return objectType + objectIndex;
        };

        $scope.updatePosition = function() {
            
            var object = $scope.selectedObject;

            object.position.x = $scope.objectProperties.position.x * 100;
            object.position.y = $scope.objectProperties.position.y * 100;
            object.position.z = $scope.objectProperties.position.z * 100;

            $scope.manipulator.position = object.position;
            //render();
        
        };

        $scope.updateRotation = function() {

            var object = $scope.selectedObject;

            object.rotation.x = $scope.deg2rad($scope.objectProperties.rotation.x);
            object.rotation.y = $scope.deg2rad($scope.objectProperties.rotation.y);
            object.rotation.z = $scope.deg2rad($scope.objectProperties.rotation.z);
            //render();
        
        };

        $scope.updateScale = function() {
            var object   = $scope.selectedObject;
            object.scale = $scope.objectProperties.scale;
            //render();
        
        };

        $scope.remove = function(object) {
            $scope.sceneObjects.remove(object);
            $scope.selectedObject = {};
        };

    });

    Meteor.startup(function () {

        var _radius = 500,
            _height = window.innerHeight,
            _width = window.innerWidth;

        scene = new THREE.Scene(); 

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
        stats.domElement.style.bottom   = '2px';
        stats.domElement.style.left     = '2px';
        stats.domElement.style.zIndex   = 100;
        document.body.appendChild( stats.domElement );


        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
        directionalLight.position.set(5, 10, 10); 

        var ambientLight = new THREE.AmbientLight( 0x202020 ); // soft white light 


        var grid = new THREE.Grid();
        scene.add(grid);

        scene.add(directionalLight);
        scene.add(ambientLight);
        
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


