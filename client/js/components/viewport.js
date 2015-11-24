var ViewportComponent = (function () {
    function ViewportComponent() {
        var _this = this;
        this.initialize = function () {
            var _radius = 500, _height = window.innerHeight, _width = window.innerWidth;
            _this.scene = new THREE.Scene();
            _this.renderer = new THREE.WebGLRenderer({ antialias: true, clearAlpha: 1, clearColor: 0x000000 });
            _this.camera = new THREE.PerspectiveCamera(60, _width / _height, 0.1, 10000);
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
            _this.camera.position.x = 5;
            _this.camera.position.y = 2.5;
            _this.camera.position.z = 5;
            document.body.appendChild(_this.renderer.domElement);
            var sceneHelpers = holomatrix.data.sceneHelpers;
            sceneHelpers.manipulator = new THREE.TransformControls(_this.camera, _this.renderer.domElement);
            //sceneHelpers.manipulator.addEventListener('change', this.render);
            _this.scene.add(sceneHelpers.manipulator);
            window.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                    case 81:
                        sceneHelpers.manipulator.setSpace(sceneHelpers.manipulator.space === "local" ? "world" : "local");
                        break;
                    case 17:
                        sceneHelpers.manipulator.setTranslationSnap(100);
                        sceneHelpers.manipulator.setRotationSnap(THREE.Math.degToRad(15));
                        break;
                    case 87:
                        sceneHelpers.manipulator.setMode("translate");
                        break;
                    case 69:
                        sceneHelpers.manipulator.setMode("rotate");
                        break;
                    case 82:
                        sceneHelpers.manipulator.setMode("scale");
                        break;
                    case 187:
                    case 107:
                        sceneHelpers.manipulator.setSize(control.size + 0.1);
                        break;
                    case 189:
                    case 109:
                        sceneHelpers.manipulator.setSize(Math.max(control.size - 0.1, 0.1));
                        break;
                }
            });
            window.addEventListener('keyup', function (event) {
                switch (event.keyCode) {
                    case 17:
                        sceneHelpers.manipulator.setTranslationSnap(null);
                        sceneHelpers.manipulator.setRotationSnap(null);
                        break;
                }
            });
            /*
            var stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.bottom   = '2px';
            stats.domElement.style.left     = '2px';
            stats.domElement.style.zIndex   = 100;
            document.body.appendChild( stats.domElement );
            */
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(5, 10, 10);
            var ambientLight = new THREE.AmbientLight(0x202020); // soft white light 
            var grid = new THREE.GridHelper(10, 1);
            grid.setColors(0x00ffff, 0x00ffff);
            _this.scene.add(grid);
            _this.scene.add(directionalLight);
            _this.scene.add(ambientLight);
            function animate() {
                requestAnimationFrame(animate);
                holomatrix.viewport.render();
                controls.update();
                //stats.update();
            }
            var controls = new THREE.TrackballControls(_this.camera, _this.renderer.domElement);
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
            controls.addEventListener('change', _this.render);
            function onDocumentMouseDown(event) {
                var camera = holomatrix.viewport.camera;
                var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
                vector = vector.unproject(camera);
                var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                console.log(_.values(holomatrix.data.sceneObjects));
                var intersects = raycaster.intersectObjects(_.values(holomatrix.data.sceneObjects));
                console.log(intersects);
                if (intersects.length > 0) {
                    console.log(intersects[0].object.name);
                    var selectedObject = intersects[0].object.name;
                    if (holomatrix.scope.properties.selectedObject.name != selectedObject) {
                        console.log('select ' + selectedObject);
                        holomatrix.execute('select', selectedObject);
                    }
                }
                else {
                }
            }
            document.getElementsByTagName('canvas')[0].addEventListener('mousedown', onDocumentMouseDown, false);
            animate();
        };
        this.changeSelectMode = function (mode) {
            _this.setSelectionWireframe(null, mode);
            if (mode == 'object')
                _this.setManipulator();
            else
                _this.removeManipulator();
            if (mode == 'vertex') {
                var editGeometry = getObject(getSelected()).geometry;
                var geometry = new THREE.Geometry();
                sprite = THREE.ImageUtils.loadTexture("/images/textures/disc.png");
                for (i = 0; i < editGeometry.vertices.length; i++) {
                    geometry.vertices.push(editGeometry.vertices[i]);
                }
                var material = new THREE.PointCloudMaterial({ size: 35, sizeAttenuation: false, map: sprite, transparent: true });
                material.color.setHSL(1.0, 0.3, 0.7);
                var particles = new THREE.PointCloud(geometry, material);
                particles.sortParticles = true;
                _this.scene.add(particles);
            }
        };
        this.removeManipulator = function () {
            // rather than removing from the scene, attach to camera so you can't see it
            holomatrix.data.sceneHelpers.manipulator.attach(_this.camera);
        };
        this.render = function () {
            _this.renderer.render(_this.scene, _this.camera);
        };
        /**
         * Attach THREE.TransformControls to the selected object
         */
        this.setManipulator = function (objectName) {
            objectName = objectName || getSelected();
            holomatrix.data.sceneHelpers.manipulator.attach(getObject(objectName));
        };
        /**
         * Apply THREE.EdgesHelper to selected object
         */
        this.setSelectionWireframe = function (objectName, mode) {
            mode = mode || 'object';
            objectName = objectName || getSelected();
            var sceneHelpers = holomatrix.data.sceneHelpers;
            var sceneObjects = holomatrix.data.sceneObjects;
            if (sceneHelpers.selectionWireframe)
                _this.scene.remove(sceneHelpers.selectionWireframe);
            sceneHelpers.selectionWireframe = new THREE.EdgesHelper(sceneObjects[objectName], mode == 'object' ? 0x6ff278 : 0x80dfff);
            sceneHelpers.selectionWireframe.material.linewidth = 1.5;
            _this.scene.add(sceneHelpers.selectionWireframe);
        };
        console.log('initializing viewport');
    }
    return ViewportComponent;
})();
