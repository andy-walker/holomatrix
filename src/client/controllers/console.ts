angular.module('holomatrix').controller('ConsoleController', function ($scope) {
    
    holomatrix.scope.console = $scope;
    $scope.commandHistory    = "";
    
    $scope.addToCommandHistory = function(apiCommand:string, apiParams:any, returnValue:any) {
        
        if (!apiCommand)
            return;
        else if (apiCommand && !apiParams)
            $scope.commandHistory += apiCommand + ";\n";
        else if (apiCommand && apiParams)
            $scope.commandHistory += apiCommand + '(' + JSON.stringify(apiParams, null, 4) + ");\n";
            
        if (returnValue)
            $scope.commandHistory += '// ' + returnValue + "\n";
            
        $scope.commandHistory += "\n";
            
    };
    
    $scope.consoleViewOptions = {
        lineWrapping : true,
        lineNumbers: false,
        readOnly: 'nocursor',
        mode: "javascript",
        theme: "night"
    };
    
    $scope.consoleEditorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        readOnly: false,
        mode: "javascript",
        theme: "night"
    };
});