var ExecuteFunction = function(command:any, params:Object, apiOpts:any):any {
    
    if (typeof command == 'string') {
        
        if (params)
            command += '(' + JSON.stringify(params) + ')';
        
        holomatrix.scope.console.addToCommandHistory(command);
        command = command.replace('console.log', 'holomatrix.scope.console.logMessage');
        
        if (apiOpts)
            holomatrix.api.setOptions(apiOpts);
            
        var returnValue:any = eval(command);
        
        if (apiOpts) 
            holomatrix.api.unsetOptions();
        
        return returnValue;
        
    } else {
        var apiCommand = command.toString();
        apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
        apiCommand += ';';
        console.log(apiCommand);
        return command(params);
    }
};