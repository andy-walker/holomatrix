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
        
        //var objectName:string = holomatrix.api.polygon.create(apiParams);
        //holomatrix.scope.console.addToCommandHistory('polygon.create', apiParams, objectName);
        
        //$scope.selectObject(objectName);
        var objectName = holomatrix.execute('polygon.create', apiParams);
        holomatrix.execute('select', objectName);
        
    };
        
    /**
     * Copy object properties to local models
     */
    $scope.getObjectProperties = function(objectName:string) {
           
        $scope.selectedObject.name     = objectName;
        
        $scope.selectedObject.position.x = holomatrix.data.sceneObjects[objectName].position.x;
        $scope.selectedObject.position.y = holomatrix.data.sceneObjects[objectName].position.y;
        $scope.selectedObject.position.z = holomatrix.data.sceneObjects[objectName].position.z;
        
        $scope.selectedObject.rotation.x = holomatrix.data.sceneObjects[objectName].rotation.x;
        $scope.selectedObject.rotation.y = holomatrix.data.sceneObjects[objectName].rotation.y;
        $scope.selectedObject.rotation.z = holomatrix.data.sceneObjects[objectName].rotation.z;
        
        $scope.selectedObject.scale.x = holomatrix.data.sceneObjects[objectName].scale.x;
        $scope.selectedObject.scale.y = holomatrix.data.sceneObjects[objectName].scale.y;
        $scope.selectedObject.scale.z = holomatrix.data.sceneObjects[objectName].scale.z;
        
    };
    
    $scope.selectNone = function() {
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
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    
    $scope.selectObject = function(objectName:string) {
        
        $scope.setManipulator(objectName);
        $scope.setSelectionWireframe(objectName);
        $scope.getObjectProperties(objectName);

        $scope.safeApply();

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
    
        var properties      = $scope.selectedObject;
        properties.position = $scope.vec3EnsureNumeric(properties.position);
            
        var x:any = properties.position.x || properties.position.x === 0 ? properties.position.x : 'null';
        var y:any = properties.position.y || properties.position.y === 0 ? properties.position.y : 'null';
        var z:any = properties.position.z || properties.position.z === 0 ? properties.position.z : 'null';
        
        if (x != '-' && y != '-' && z != '-')
            holomatrix.execute('move("' + properties.name + '", ' + x + ', ' + y + ', ' + z + ');');
        
    };

    $scope.updateRotation = function() {
        
        var properties      = $scope.selectedObject;
        properties.rotation = $scope.vec3EnsureNumeric(properties.rotation);
        
        var x:any = properties.rotation.x || properties.rotation.x === 0 ? properties.rotation.x : 'null';
        var y:any = properties.rotation.y || properties.rotation.y === 0 ? properties.rotation.y : 'null';
        var z:any = properties.rotation.z || properties.rotation.z === 0 ? properties.rotation.z : 'null';
        
        if (x != '-' && y != '-' && z != '-')
            holomatrix.execute('rotate("' + properties.name + '", ' + x + ', ' + y + ', ' + z + ');');
    
    };

    $scope.updateScale = function() {

        var properties   = $scope.selectedObject;
        properties.scale = $scope.vec3EnsureNumeric(properties.scale);
        
        var x:any = properties.scale.x || properties.scale.x === 0 ? properties.scale.x : 'null';
        var y:any = properties.scale.y || properties.scale.y === 0 ? properties.scale.y : 'null';
        var z:any = properties.scale.z || properties.scale.z === 0 ? properties.scale.z : 'null';
        
        if (x != '-' && y != '-' && z != '-')
            holomatrix.execute('scale("' + properties.name + '", ' + x + ', ' + y + ', ' + z + ');');
    
    };
    
    /** 
     * ensure entered values are numeric - if not, remove invalid characters
     * */
    $scope.vec3EnsureNumeric = function(vec3:Object) {     
        ['x', 'y', 'z'].forEach(function(property:string) {
            if (typeof vec3[property] === 'string') {
                // strip non-numeric apart from '-' and '.'
                vec3[property] = vec3[property].replace(/[^\d.-]/g, '');
                // '-' can only be first character
                vec3[property] = vec3[property].replace(/(.)-+/g, '$1');
            }
        });
        return vec3;
    }
});