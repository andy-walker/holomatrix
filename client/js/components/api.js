var APIComponent = (function () {
    function APIComponent() {
        this.polygon = new PolygonAPI();
        this.options = {};
        window.polygon = this.polygon;
        window.select = this.select;
    }
    APIComponent.prototype.execute = function (command, params, apiOpts) {
        var api = holomatrix.api;
        if (typeof command == 'string') {
            var originalCommand = command;
            if (params)
                command += '(' + JSON.stringify(params) + ')';
            command = command.replace('console.log', 'holomatrix.scope.console.logMessage');
            if (apiOpts)
                api.setOptions(apiOpts);
            holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
            var returnValue = eval(command);
            //console.log('add to command history - params: ' + params + ', return value: ' + returnValue);
            if (apiOpts)
                api.unsetOptions();
            return returnValue;
        }
        else {
            var apiCommand = command.toString();
            apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
            apiCommand += ';';
            console.log(apiCommand);
            return command(params);
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
