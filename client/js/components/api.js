var APIComponent = (function () {
    function APIComponent() {
        this.polygon = new PolygonAPI();
        this.options = {};
        window.getSelected = this.getSelected;
        window.move = this.move;
        window.polygon = this.polygon;
        window.select = this.select;
    }
    APIComponent.prototype.execute = function (command, params, apiOpts) {
        var api = holomatrix.api;
        if (typeof command == 'string') {
            var originalCommand = command;
            if (params)
                command += '(' + JSON.stringify(params) + ')';
            command = command.replace('console.log', 'holomatrix.api.log');
            if (apiOpts)
                api.setOptions(apiOpts);
            // using window.eval (rather than eval) ensures variables assigned from the 
            // console using 'var' are persistently accessible    
            var returnValue = window.eval(command);
            holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
            if (apiOpts)
                api.unsetOptions();
            return returnValue;
        }
        else {
            var apiCommand = command.toString();
            apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
            apiCommand += ';';
            return command(params);
        }
    };
    APIComponent.prototype.getObject = function (objectName) {
        if (objectName in holomatrix.data.sceneObjects)
            return holomatrix.data.sceneObjects[objectName];
        return null;
    };
    APIComponent.prototype.getSelected = function () {
        var selectedObject = holomatrix.scope.properties.selectedObject.name;
        if (selectedObject)
            return selectedObject;
        return null;
    };
    APIComponent.prototype.log = function (message) {
        holomatrix.scope.console.logMessage(message);
    };
    APIComponent.prototype.move = function (arg1, arg2, arg3, arg4) {
        var objectName;
        var x;
        var y;
        var z;
        // callspec: move(Object)
        if (typeof arg1 == 'Object') {
            if ('object' in arg1)
                objectName = arg1.object;
            if ('x' in arg1)
                x = arg1.x;
            if ('y' in arg1)
                y = arg1.y;
            if ('z' in arg1)
                z = arg1.z;
        }
        else if (typeof arg1 == 'string') {
            if (arg1 || arg1 === 0)
                objectName = arg1;
            if (arg2 || arg2 === 0)
                x = arg2;
            if (arg3 || arg3 === 0)
                y = arg3;
            if (arg4 || arg4 === 0)
                z = arg4;
        }
        else {
            if (arg1 || arg1 === 0)
                x = arg1;
            if (arg2 || arg2 === 0)
                y = arg2;
            if (arg3 || arg3 === 0)
                z = arg3;
        }
        if (!objectName)
            objectName = holomatrix.api.getSelected();
        if (!objectName) {
            holomatrix.api.log('no selection / no object specified');
            return;
        }
        var object = holomatrix.api.getObject(objectName);
        if (!object) {
            holomatrix.api.log("object not found");
            return;
        }
        if (x || x === 0)
            object.position.x = x;
        if (y || y === 0)
            object.position.y = y;
        if (z || z === 0)
            object.position.z = z;
        if (objectName == holomatrix.api.getSelected()) {
            var manipulator = holomatrix.data.sceneHelpers.manipulator;
            manipulator.position.x = object.position.x;
            manipulator.position.y = object.position.y;
            manipulator.position.z = object.position.z;
        }
    };
    APIComponent.prototype.select = function (objectName) {
        // do this for now to get working, the logic for creating the manipulator should be moved
        // outside the angular controller though (todo)
        holomatrix.scope.properties.selectObject(objectName);
    };
    APIComponent.prototype.setOptions = function (options) {
        this.options = options;
    };
    APIComponent.prototype.unsetOptions = function () {
        this.options = {};
    };
    return APIComponent;
})();
;
