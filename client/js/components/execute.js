var ExecuteVars = {
    busy: false,
    tasks: []
};
var ExecuteFunction = function (command, params, apiOpts) {
    if (typeof command == 'string') {
        var originalCommand = command;
        if (params)
            command += '(' + JSON.stringify(params) + ')';
        command = command.replace('console.log', 'holomatrix.scope.console.logMessage');
        if (apiOpts)
            holomatrix.api.setOptions(apiOpts);
        var returnValue = eval(command);
        holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
        if (apiOpts)
            holomatrix.api.unsetOptions();
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
