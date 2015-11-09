angular.module('holomatrix').controller('HoloUI', function ($scope) {
    
    holomatrix.scope.properties = $scope;
    
    $scope.selectedObject = {
        name:     '',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale:    { x: 1, y: 1, z: 1 },
    };
    
    $scope.addPrimitive = function(primitiveType:string) {
        
        var apiParams = {
            type:   primitiveType,
            width:  1,
            height: 1,
            depth:  1 
        };
        
        var objectName:string = holomatrix.api.polygon.create(apiParams);
        holomatrix.scope.console.addToCommandHistory('polygon.create', apiParams, objectName);
        
        $scope.selectObject(objectName);
           
    };
    
    $scope.getObjectProperties = function(objectName:string) {
        
        $scope.selectedObject.name     = objectName;
        $scope.selectedObject.position = holomatrix.data.sceneObjects[objectName].position;
        $scope.selectedObject.rotation = holomatrix.data.sceneObjects[objectName].rotation;
        $scope.selectedObject.scale    = holomatrix.data.sceneObjects[objectName].scale;
        
    };
    
    $scope.selectObject = function(objectName:string) {
        
        var sceneHelpers = holomatrix.data.sceneHelpers;
        var sceneObjects = holomatrix.data.sceneObjects;
        
        // if manipulator uninitialized, add to object position
        if (!sceneHelpers.manipulator) {
            
            sceneHelpers.manipulator = new THREE.ManipulatorTool();
            sceneHelpers.manipulator.scale.x = 0.01;
            sceneHelpers.manipulator.scale.y = 0.01;
            sceneHelpers.manipulator.scale.z = 0.01;
            holomatrix.viewport.scene.add(sceneHelpers.manipulator);
        
        // otherwise, move manipulator to object position
        } else {
            sceneHelpers.manipulator.position.x = sceneObjects[objectName].position.x;
            sceneHelpers.manipulator.position.y = sceneObjects[objectName].position.y;
            sceneHelpers.manipulator.position.z = sceneObjects[objectName].position.z;
        }
        
        $scope.getObjectProperties(objectName);
             
    };
    
    $scope.updatePosition = function() {
  
        var properties  = $scope.selectedObject;
        var object      = holomatrix.data.sceneObjects[properties.name];
        var manipulator = holomatrix.data.sceneHelpers.manipulator;
        
        object.position.x = properties.position.x;
        object.position.y = properties.position.y;
        object.position.z = properties.position.z;
          
        manipulator.position.x = properties.position.x;
        manipulator.position.y = properties.position.y;
        manipulator.position.z = properties.position.z;
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
    
});