var ViewportComponent = (function () {
    function ViewportComponent() {
        console.log('initializing viewport');
    }
    /*
    animate() {
       
       requestAnimationFrame( this.animate );

       this.render();
       this.controls.update();
       stats.update();
    
    }
    */
    ViewportComponent.prototype.initialize = function () {
        /*
        var _radius = 500,
            _height = window.innerHeight,
            _width = window.innerWidth;

        this.scene  = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 60, _width / _height, 1, 10000 );
        
        this.camera.position.x = 500;
        this.camera.position.y = 250;
        this.camera.position.z = 500;

        //camera.lookAt( new THREE.Vector3() );

        this.renderer = new THREE.WebGLRenderer({antialias:true, clearAlpha: 1, clearColor: 0x000000});

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom   = '2px';
        this.stats.domElement.style.left     = '2px';
        this.stats.domElement.style.zIndex   = 100;
        document.body.appendChild( this.stats.domElement );


        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
        directionalLight.position.set(5, 10, 10);

        var ambientLight = new THREE.AmbientLight( 0x202020 ); // soft white light


        this.grid = new THREE.Grid();
        this.scene.add(this.grid);

        this.scene.add(directionalLight);
        this.scene.add(ambientLight);
        
        this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 2.0;
        this.controls.zoomSpeed = 0.1;
        this.controls.panSpeed = 0.2;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = false;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.minDistance = 0;
        this.controls.maxDistance = _radius * 100;
        this.controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]

        this.controls.addEventListener('change', this.render);

        this.animate();
        */
        var _radius = 500, _height = window.innerHeight, _width = window.innerWidth;
        this.scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(60, _width / _height, 0.1, 10000);
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
        animate();
    };
    return ViewportComponent;
})();
