class PolygonAPI {
    
    public create(params):string {
        
        params.type   = params.type   || 'Cube';
        params.width  = params.width  || 1;
        params.height = params.height || 1;
        params.depth  = params.depth  || 1;
        
        var material = new THREE.MeshLambertMaterial({ 
            color:   0x999999,
            shading: THREE.SmoothShading,
            side:    THREE.DoubleSide
        });

        var geometry          = new THREE[params.type + 'Geometry'](params.width, params.height, params.depth);
        var objectName:string = holomatrix.utils.getUniqueName(params.type);
    
        holomatrix.data.sceneObjects[objectName]      = new THREE.Mesh(geometry, material);
        holomatrix.data.sceneObjects[objectName].name = objectName; 
        holomatrix.viewport.scene.add(holomatrix.data.sceneObjects[objectName]);
    
        return objectName;
    
    }
     
}