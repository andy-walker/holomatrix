interface API_Interface {
    polygon:Object  
}

class APIComponent implements API_Interface {
    
    public polygon = new PolygonAPI();
    public options:Object = {}; 
    
    constructor() {
        
        window.polygon = this.polygon;
        window.select  = this.select;    
                
    }
    
    public execute(command:any, params:any, apiOpts:any):any {
        
        var api = holomatrix.api;
        
        if (typeof command == 'string') {
            
            var originalCommand = command;
            
            if (params)
                command += '(' + JSON.stringify(params) + ')';
            
            command = command.replace('console.log', 'holomatrix.scope.console.logMessage');
            
            if (apiOpts)
                api.setOptions(apiOpts);
                
            var returnValue:any = eval(command);
            console.log('add to command history - params: ' + params);
            holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
                    
            if (apiOpts) 
                api.unsetOptions();
                                
            return returnValue;
            
        } else {
            var apiCommand = command.toString();
            apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
            apiCommand += ';';
            console.log(apiCommand);
            return command(params);
        }    
           
    }
    
    public select(objectName:string) {
        // do this for now to get working, the logic for creating the manipulator should be moved
        // outside the angular controller though (todo)
        holomatrix.scope.properties.selectObject(objectName);
    }
       
    public setOptions(options:Object) {
        this.options = options;
    }
    
    public unsetOptions() {
        this.options = {};
    }
    
    
};