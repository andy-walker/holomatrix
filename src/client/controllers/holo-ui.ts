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
    
    /*
    $scope.copyVector3 = function(srcObject:Object, destObject:Object) {
        
    };
    */
    
    /**
     * Copy object properties to local models
     */
    $scope.getObjectProperties = function(objectName:string) {
        
        console.log('getObjectProperties for ' + objectName);
        
        $scope.selectedObject.name     = objectName;
        
        console.log('selectedObject.name = ' + $scope.selectedObject.name);
        
        $scope.selectedObject.position = holomatrix.data.sceneObjects[objectName].position;
        $scope.selectedObject.rotation.x = holomatrix.data.sceneObjects[objectName].rotation.x;
        $scope.selectedObject.rotation.y = holomatrix.data.sceneObjects[objectName].rotation.y;
        $scope.selectedObject.rotation.z = holomatrix.data.sceneObjects[objectName].rotation.z;
        $scope.selectedObject.scale    = holomatrix.data.sceneObjects[objectName].scale;
        
    };
    
    $scope.selectNone = function() {
        var manipulator = holomatrix.data.sceneHelpers.manipulator;
        holomatrix.viewport.scene.remove(manipulator);
        delete manipulator;
        $scope.selectedObject.name = '';
        $scope.$apply();
    };
    
    $scope.selectObject = function(objectName:string, apply:boolean) {
        
        $scope.setManipulator(objectName);
        $scope.setSelectionWireframe(objectName);
        $scope.getObjectProperties(objectName);
        
        if (apply)
            $scope.$apply();
        
    };
    
    /**
     * Move manipulator to selected object position
     */
    $scope.setManipulator = function(objectName:string) {
        
        var sceneHelpers = holomatrix.data.sceneHelpers;
        var sceneObjects = holomatrix.data.sceneObjects;
        
        // if manipulator uninitialized, create and set to object position
        if (!sceneHelpers.manipulator) {
            
            sceneHelpers.manipulator = new THREE.ManipulatorTool();
            sceneHelpers.manipulator.scale.x = 0.01;
            sceneHelpers.manipulator.scale.y = 0.01;
            sceneHelpers.manipulator.scale.z = 0.01;
            holomatrix.viewport.scene.add(sceneHelpers.manipulator);
            sceneHelpers.manipulator.position = sceneObjects[objectName].position; 
        
        // otherwise, move manipulator to object position
        } else {
            //sceneHelpers.manipulator.position = sceneObjects[objectName].position;
            
            sceneHelpers.manipulator.position.x = sceneObjects[objectName].position.x;
            sceneHelpers.manipulator.position.y = sceneObjects[objectName].position.y;
            sceneHelpers.manipulator.position.z = sceneObjects[objectName].position.z;
            
        }
                 
    };
    
    $scope.setSelectionWireframe = function(objectName:string) {

        var sceneHelpers = holomatrix.data.sceneHelpers;
        var sceneObjects = holomatrix.data.sceneObjects;
        
        if (sceneHelpers.selectionWireframe)
            holomatrix.viewport.scene.remove(sceneHelpers.selectionWireframe);
            
            sceneHelpers.selectionWireframe = new THREE.EdgesHelper(sceneObjects[objectName], 0x6ff278);
            sceneHelpers.selectionWireframe.material.linewidth = 1.5;
            holomatrix.viewport.scene.add(sceneHelpers.selectionWireframe);
       
        
    };
    
    $scope.updatePosition = function() {
  
        var properties  = $scope.selectedObject;
        var object      = holomatrix.data.sceneObjects[properties.name];
        var manipulator = holomatrix.data.sceneHelpers.manipulator;
        
        //object.position.x = properties.position.x;
        //object.position.y = properties.position.y;
        //object.position.z = properties.position.z;
          
        manipulator.position.x = properties.position.x;
        manipulator.position.y = properties.position.y;
        manipulator.position.z = properties.position.z;
    
    };

    $scope.updateRotation = function() {
        
        var properties = $scope.selectedObject;
        var object     = holomatrix.data.sceneObjects[properties.name];

        object.rotation.x = holomatrix.utils.deg2rad(properties.rotation.x);
        object.rotation.y = holomatrix.utils.deg2rad(properties.rotation.y);
        object.rotation.z = holomatrix.utils.deg2rad(properties.rotation.z);
    
    };

    $scope.updateScale = function() {
        var object   = $scope.selectedObject;
        object.scale = $scope.objectProperties.scale;
        //render();
    
    };
    
});