var APIComponent = (function () {
    function APIComponent() {
        var _this = this;
        this.polygon = new PolygonAPI();
        this.transform = new TransformAPI();
        this.options = {};
        this.execute = function (command, params, apiOpts) {
            if (typeof command == 'string') {
                var originalCommand = command;
                if (params)
                    command += '(' + JSON.stringify(params) + ')';
                command = command.replace('console.log', 'holomatrix.api.log');
                if (apiOpts)
                    _this.setOptions(apiOpts);
                // using window.eval (rather than eval) ensures variables assigned from the 
                // console using 'var' are persistently accessible    
                var returnValue = window.eval(command);
                // broadcast command
                holomatrix.transport.broadcast(command);
                // add command to history
                holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
                if (apiOpts)
                    _this.unsetOptions();
                return returnValue;
            }
            else {
                var apiCommand = command.toString();
                apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
                apiCommand += ';';
                return command(params);
            }
        };
        window.getSelected = this.getSelected;
        window.move = this.transform.move;
        window.rotate = this.transform.rotate;
        window.scale = this.transform.scale;
        window.polygon = this.polygon;
        window.select = this.select;
    }
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
