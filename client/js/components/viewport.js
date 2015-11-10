var ViewportComponent = (function () {
    function ViewportComponent() {
        console.log('initializing viewport');
    }
    ViewportComponent.prototype.initialize = function () {
        var _radius = 500, _height = window.innerHeight, _width = window.innerWidth;
        this.scene = new THREE.Scene();
        var camera = this.camera;
        camera = new THREE.PerspectiveCamera(60, _width / _height, 0.1, 10000);
        camera.position.x = 5;
        camera.position.y = 2.5;
        camera.position.z = 5;
        //camera.lookAt( new THREE.Vector3() );
        var renderer = new THREE.WebGLRenderer({ antialias: true, clearAlpha: 1, clearColor: 0x000000 });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '2px';
        stats.domElement.style.left = '2px';
        stats.domElement.style.zIndex = 100;
        document.body.appendChild(stats.domElement);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 10, 10);
        var ambientLight = new THREE.AmbientLight(0x202020); // soft white light 
        var grid = new THREE.GridHelper(10, 1);
        grid.setColors(0x00ffff, 0x00ffff);
        this.scene.add(grid);
        this.scene.add(directionalLight);
        this.scene.add(ambientLight);
        function animate() {
            requestAnimationFrame(animate);
            render();
            controls.update();
            stats.update();
        }
        function render() {
            renderer.render(holomatrix.viewport.scene, camera);
        }
        var controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 2.0;
        controls.zoomSpeed = 0.1;
        controls.panSpeed = 0.2;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = false;
        controls.dynamicDampingFactor = 0.3;
        controls.minDistance = 0;
        controls.maxDistance = _radius * 100;
        controls.keys = [65, 83, 68]; // [ rotateKey, zoomKey, panKey ]
        controls.addEventListener('change', render);
        function onDocumentMouseDown(event) {
            var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            vector = vector.unproject(camera);
            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            console.log(_.values(holomatrix.data.sceneObjects));
            var intersects = raycaster.intersectObjects(_.values(holomatrix.data.sceneObjects));
            console.log(intersects);
            if (intersects.length > 0) {
                console.log(intersects[0].object.name);
                holomatrix.scope.properties.selectObject(intersects[0].object.name, true);
            }
            else {
            }
        }
        document.getElementsByTagName('canvas')[0].addEventListener('mousedown', onDocumentMouseDown, false);
        animate();
    };
    return ViewportComponent;
})();
