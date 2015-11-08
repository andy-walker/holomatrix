angular.module('holomatrix').controller('HoloUI', function ($scope) {
    holomatrix.scope = $scope;
    $scope.selectedObject = {
        name: '',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
    };
    $scope.addPrimitive = function (primitiveType) {
        var objectName = holomatrix.api.polygon.create({
            type: primitiveType,
            width: 1,
            height: 1,
            depth: 1
        });
        $scope.selectObject(objectName);
        /*
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
        */
    };
    $scope.getObjectProperties = function (objectName) {
        $scope.selectedObject.name = objectName;
        $scope.selectedObject.position = holomatrix.data.sceneObjects[objectName].position;
        $scope.selectedObject.rotation = holomatrix.data.sceneObjects[objectName].rotation;
        $scope.selectedObject.scale = holomatrix.data.sceneObjects[objectName].scale;
    };
    $scope.selectObject = function (objectName) {
        var sceneHelpers = holomatrix.data.sceneHelpers;
        var sceneObjects = holomatrix.data.sceneObjects;
        // if manipulator uninitialized, add to object position
        if (!sceneHelpers.manipulator) {
            sceneHelpers.manipulator = new THREE.ManipulatorTool();
            sceneHelpers.manipulator.scale.x = 0.01;
            sceneHelpers.manipulator.scale.y = 0.01;
            sceneHelpers.manipulator.scale.z = 0.01;
            holomatrix.viewport.scene.add(sceneHelpers.manipulator);
        }
        else {
            sceneHelpers.manipulator.position.x = sceneObjects[objectName].position.x;
            sceneHelpers.manipulator.position.y = sceneObjects[objectName].position.y;
            sceneHelpers.manipulator.position.z = sceneObjects[objectName].position.z;
        }
        $scope.getObjectProperties(objectName);
    };
    $scope.updatePosition = function () {
        var properties = $scope.selectedObject;
        var object = holomatrix.data.sceneObjects[properties.name];
        var manipulator = holomatrix.data.sceneHelpers.manipulator;
        object.position.x = properties.position.x;
        object.position.y = properties.position.y;
        object.position.z = properties.position.z;
        manipulator.position.x = properties.position.x;
        manipulator.position.y = properties.position.y;
        manipulator.position.z = properties.position.z;
        //render();
    };
    $scope.updateRotation = function () {
        var object = $scope.selectedObject;
        object.rotation.x = $scope.deg2rad($scope.objectProperties.rotation.x);
        object.rotation.y = $scope.deg2rad($scope.objectProperties.rotation.y);
        object.rotation.z = $scope.deg2rad($scope.objectProperties.rotation.z);
        //render();
    };
    $scope.updateScale = function () {
        var object = $scope.selectedObject;
        object.scale = $scope.objectProperties.scale;
        //render();
    };
});
