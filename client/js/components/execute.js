var ExecuteFunction = function (command, params) {
    if (typeof command == 'string') {
        if (params)
            command += '(' + JSON.stringify(params) + ')';
        console.log(command);
        return eval('holomatrix.api.' + command);
    }
    else {
        var apiCommand = command.toString();
        apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
        apiCommand += ';';
        console.log(apiCommand);
        return command(params);
    }
};
