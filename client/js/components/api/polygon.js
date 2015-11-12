var PolygonAPI = (function () {
    function PolygonAPI() {
    }
    PolygonAPI.prototype.create = function (params) {
        params.type = params.type || 'Cube';
        params.width = params.width || 1;
        params.height = params.height || 1;
        params.depth = params.depth || 1;
        var material = new THREE.MeshLambertMaterial({
            color: 0x999999,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });
        var geometry = new THREE[params.type + 'Geometry'](params.width, params.height, params.depth);
        var objectName = holomatrix.utils.getUniqueName(params.type);
        holomatrix.data.sceneObjects[objectName] = new THREE.Mesh(geometry, material);
        holomatrix.data.sceneObjects[objectName].name = objectName;
        holomatrix.viewport.scene.add(holomatrix.data.sceneObjects[objectName]);
        if ('selectCreatedObjects' in holomatrix.api.options)
            holomatrix.execute('select', objectName);
        return objectName;
    };
    return PolygonAPI;
})();
