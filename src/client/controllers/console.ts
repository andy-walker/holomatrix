angular.module('holomatrix').controller('ConsoleController', function ($scope) {
    
    holomatrix.scope.console = $scope;
    $scope.script            = "";
    $scope.commandHistory    = "";
    
    $scope.commandHistoryPanelLoaded = function(_editor) {
        console.log(_editor);
        $scope.commandHistoryPanel = _editor;
        _editor.on('change', function() {
            _editor.execCommand('goDocEnd');
        });
    };
    
    $scope.addToCommandHistory = function(apiCommand:string, apiParams:any, returnValue:any) {
        
        if (!apiCommand)
            return;
        else if (apiCommand && !apiParams) {
            apiCommand = apiCommand.trim();
            if (!apiCommand.match(/;$/))
                apiCommand += ";";
        } else if (apiCommand && apiParams) {
            console.log('apiParams = ' + apiParams);
            apiCommand += '(' + JSON.stringify(apiParams, null, 4) + ");";
        }
            
        apiCommand += "\n";
            
        if (returnValue)
            apiCommand += '// ' + returnValue + "\n";
        console.log(apiCommand);
        $scope.commandHistory += apiCommand;
        $scope.safeApply();
          
    };
    
    $scope.consoleViewOptions = {
        lineWrapping : false,
        lineNumbers: false,
        readOnly: false,
        scrollbarStyle: 'native',
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
    
    $scope.logMessage = function(message:string) {
        $scope.commandHistory += "// " + message + "\n";
    };
    
    $scope.runScript = function() {
        
        holomatrix.execute($scope.script, null, {
           selectCreatedObjects: true 
        });
        
        $scope.script = "";
        
    };
    
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
    
           
});