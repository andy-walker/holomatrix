class ViewportComponent {
     
     public scene;
     public camera;
     public renderer;
     public controls;
     public grid;
     public stats;
     
     constructor() {
         console.log('initializing viewport');
     }

     public initialize = () => {
                     
        var _radius = 500,
            _height = window.innerHeight,
            _width = window.innerWidth;

        this.scene    = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, clearAlpha: 1, clearColor: 0x000000 });
        this.camera   = new THREE.PerspectiveCamera( 60, _width / _height, 0.1, 10000 );
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.position.x = 5;
        this.camera.position.y = 2.5;
        this.camera.position.z = 5;

        document.body.appendChild(this.renderer.domElement);

        var sceneHelpers = holomatrix.data.sceneHelpers;
        sceneHelpers.manipulator = new THREE.TransformControls(this.camera, this.renderer.domElement);
        //sceneHelpers.manipulator.addEventListener('change', this.render);
        
        this.scene.add(sceneHelpers.manipulator);

        window.addEventListener('keydown', function(event) {

            switch (event.keyCode) {

                case 81: // Q
                    sceneHelpers.manipulator.setSpace(sceneHelpers.manipulator.space === "local" ? "world" : "local");
                    break;

                case 17: // Ctrl
                    sceneHelpers.manipulator.setTranslationSnap(100);
                    sceneHelpers.manipulator.setRotationSnap(THREE.Math.degToRad(15));
                    break;

                case 87: // W
                    sceneHelpers.manipulator.setMode("translate");
                    break;

                case 69: // E
                    sceneHelpers.manipulator.setMode("rotate");
                    break;

                case 82: // R
                    sceneHelpers.manipulator.setMode("scale");
                    break;

                case 187:
                case 107: // +, =, num+
                    sceneHelpers.manipulator.setSize(control.size + 0.1);
                    break;

                case 189:
                case 109: // -, _, num-
                    sceneHelpers.manipulator.setSize(Math.max(control.size - 0.1, 0.1));
                    break;

            }

        });
        window.addEventListener('keyup', function(event) {

            switch (event.keyCode) {

                case 17: // Ctrl
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

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
        directionalLight.position.set(5, 10, 10); 

        var ambientLight = new THREE.AmbientLight( 0x202020 ); // soft white light 


        var grid = new THREE.GridHelper(10, 1);
        grid.setColors(0x00ffff, 0x00ffff);
        this.scene.add(grid);

        this.scene.add(directionalLight);
        this.scene.add(ambientLight);
        
        function animate() {

            requestAnimationFrame( animate );

            holomatrix.viewport.render();
            controls.update();
            //stats.update();

        }

        var controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
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

        controls.addEventListener('change', this.render);
        
        function onDocumentMouseDown(event) {

            var camera = holomatrix.viewport.camera;
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
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

            } else {
                //holomatrix.scope.properties.selectNone();
            }
        }
    
        document.getElementsByTagName('canvas')[0].addEventListener('mousedown', onDocumentMouseDown, false);
        animate();
                
     }
     
     public changeSelectMode = (mode:string) => {
         this.setSelectionWireframe(null, mode);
         if (mode == 'object')
             this.setManipulator();
         else
             this.removeManipulator();

     }

     public removeManipulator = () => {
         // rather than removing from the scene, attach to camera so you can't see it
         holomatrix.data.sceneHelpers.manipulator.attach(this.camera);
     }

     public render = () => {
         this.renderer.render(this.scene, this.camera);
     }

     /**
      * Attach THREE.TransformControls to the selected object
      */
     public setManipulator = (objectName:string) => {

         objectName = objectName || getSelected();
         holomatrix.data.sceneHelpers.manipulator.attach(getObject(objectName));

     };

     /**
      * Apply THREE.EdgesHelper to selected object
      */
     public setSelectionWireframe = (objectName:string, mode:string) => {

         mode       = mode || 'object';
         objectName = objectName || getSelected();

         var sceneHelpers = holomatrix.data.sceneHelpers;
         var sceneObjects = holomatrix.data.sceneObjects;

         if (sceneHelpers.selectionWireframe)
             this.scene.remove(sceneHelpers.selectionWireframe);

         sceneHelpers.selectionWireframe = new THREE.EdgesHelper(sceneObjects[objectName], mode == 'object' ? 0x6ff278 : 0x80dfff);
         sceneHelpers.selectionWireframe.material.linewidth = 1.5;
         this.scene.add(sceneHelpers.selectionWireframe);

     };
        
}