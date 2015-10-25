/* worldbuilder application flie */

// create mongo collection for storing world objects
Objects = new Mongo.Collection("objects");

if (Meteor.isClient) {

    angular.module('worldbuilder', ['angular-meteor']);

    angular.module('worldbuilder').controller('WorldbuilderCtrl', function ($scope, $meteor) {

        $scope.objects = $meteor.collection(Objects);

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

var renderer = new THREE.WebGLRenderer({antialias:true, clearAlpha: 1, clearColor: 0x7c7c7c}); 

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.MeshLambertMaterial({ 
    color:   0x999999,
    shading: THREE.SmoothShading,
    side: THREE.DoubleSide
});


var geometry = new THREE.CubeGeometry(100, 100, 100);

var cube     = new THREE.Mesh( geometry, material );

/*
var geometry = new THREE.PlaneGeometry(5, 5, 5); 
var plane = new THREE.Mesh(geometry, material);
*/

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
directionalLight.position.set(5, 10, 10); 

var ambientLight = new THREE.AmbientLight( 0x202020 ); // soft white light 


var grid = new THREE.Grid();
scene.add(grid);

// Axis
var manipulator = new THREE.ManipulatorTool();
scene.add(manipulator);

scene.add(directionalLight);
scene.add(ambientLight);
scene.add(cube);

var render = function() {
    requestAnimationFrame(render);
    //plane.rotation.x += 0.01;
    //plane.rotation.y += 0.01;
    renderer.render(scene, camera); 
};

var animate = function() {

    requestAnimationFrame(animate);
    controls.update();

};

//controls = new THREE.OrbitControls(camera);
//controls.damping = 0.2;
//controls.addEventListener('change', render);

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
render();
    });

}


