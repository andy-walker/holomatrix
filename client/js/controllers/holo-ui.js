angular.module('holomatrix').controller('HoloUI', function ($scope) {
    holomatrix.scope.properties = $scope;
    holomatrix.data.sceneHelpers.manipulator.addEventListener('change', function () {
        console.log('updating ui');
        $scope.getObjectProperties();
        $scope.safeApply();
    });
    $scope.selectedObject = {
        name: '',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
    };
    $scope.selectionMode = 'object';
    $scope.addPrimitive = function (primitiveType) {
        var apiParams = {
            type: primitiveType,
            width: 1,
            height: 1,
            depth: 1
        };
        var objectName = holomatrix.execute('polygon.create', apiParams);
        holomatrix.execute('select', objectName);
        //holomatrix.data.sceneHelpers.manipulator.setMode("translate");
    };
    /**
     * Copy object properties to local models
     */
    $scope.getObjectProperties = function (objectName) {
        objectName = objectName || getSelected();
        var selectedObject = $scope.selectedObject;
        var object = getObject(objectName);
        var rad2deg = holomatrix.utils.rad2deg;
        $scope.selectedObject.name = objectName;
        selectedObject.position.x = object.position.x;
        selectedObject.position.y = object.position.y;
        selectedObject.position.z = object.position.z;
        selectedObject.rotation.x = Math.round(rad2deg(object.rotation.x) * 1000) / 1000;
        selectedObject.rotation.y = Math.round(rad2deg(object.rotation.y) * 1000) / 1000;
        selectedObject.rotation.z = Math.round(rad2deg(object.rotation.z) * 1000) / 1000;
        selectedObject.scale.x = object.scale.x;
        selectedObject.scale.y = object.scale.y;
        selectedObject.scale.z = object.scale.z;
    };
    $scope.selectNone = function () {
        var manipulator = holomatrix.data.sceneHelpers.manipulator;
        holomatrix.viewport.scene.remove(manipulator);
        delete manipulator;
        $scope.selectedObject.name = '';
        $scope.$apply();
    };
    /**
     * Prevent '$apply already in progress' error with this for now, although there's prb a better way round this
     * https://coderwall.com/p/ngisma/safe-apply-in-angular-js
     */
    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        }
        else {
            this.$apply(fn);
        }
    };
    $scope.selectObject = function (objectName) {
        var viewport = holomatrix.viewport;
        viewport.setManipulator(objectName);
        viewport.setSelectionWireframe(objectName);
        $scope.getObjectProperties(objectName);
        $scope.safeApply();
    };
    $scope.updatePosition = function () {
        var properties = $scope.selectedObject;
        properties.position = $scope.vec3EnsureNumeric(properties.position);
        var x = properties.position.x || properties.position.x === 0 ? properties.position.x : 'null';
        var y = properties.position.y || properties.position.y === 0 ? properties.position.y : 'null';
        var z = properties.position.z || properties.position.z === 0 ? properties.position.z : 'null';
        if (x != '-' && y != '-' && z != '-')
            holomatrix.execute('move("' + properties.name + '", ' + x + ', ' + y + ', ' + z + ');', null, { updateUI: false });
    };
    $scope.updateRotation = function () {
        var properties = $scope.selectedObject;
        properties.rotation = $scope.vec3EnsureNumeric(properties.rotation);
        var x = properties.rotation.x || properties.rotation.x === 0 ? properties.rotation.x : 'null';
        var y = properties.rotation.y || properties.rotation.y === 0 ? properties.rotation.y : 'null';
        var z = properties.rotation.z || properties.rotation.z === 0 ? properties.rotation.z : 'null';
        if (x != '-' && y != '-' && z != '-')
            holomatrix.execute('rotate("' + properties.name + '", ' + x + ', ' + y + ', ' + z + ');', null, { updateUI: false });
    };
    $scope.updateScale = function () {
        var properties = $scope.selectedObject;
        properties.scale = $scope.vec3EnsureNumeric(properties.scale);
        var x = properties.scale.x || properties.scale.x === 0 ? properties.scale.x : 'null';
        var y = properties.scale.y || properties.scale.y === 0 ? properties.scale.y : 'null';
        var z = properties.scale.z || properties.scale.z === 0 ? properties.scale.z : 'null';
        if (x != '-' && y != '-' && z != '-')
            holomatrix.execute('scale("' + properties.name + '", ' + x + ', ' + y + ', ' + z + ');', null, { updateUI: false });
    };
    $scope.updateSelectionMode = function (mode) {
        // ng-model doesn't seem to update for some reason (?) - so update that here for now
        $scope.selectionMode = mode;
        // reflect new mode in viewport
        holomatrix.viewport.changeSelectMode(mode);
    };
    /**
     * ensure entered values are numeric - if not, remove invalid characters
     */
    $scope.vec3EnsureNumeric = function (vec3) {
        ['x', 'y', 'z'].forEach(function (property) {
            if (typeof vec3[property] === 'string') {
                // strip non-numeric apart from '-' and '.'
                vec3[property] = vec3[property].replace(/[^\d.-]/g, '');
                // '-' can only be first character
                vec3[property] = vec3[property].replace(/(.)-+/g, '$1');
            }
        });
        return vec3;
    };
});
