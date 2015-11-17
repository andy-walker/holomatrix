interface API_Interface {
    polygon:Object  
}

class APIComponent implements API_Interface {
    
    public polygon   = new PolygonAPI();
    public transform = new TransformAPI();
    public options:Object = {};
    
    
    constructor() {
        
        window.getSelected = this.getSelected;
        window.move        = this.transform.move;
        window.rotate      = this.transform.rotate;
        window.scale       = this.transform.scale;
        window.polygon     = this.polygon;
        window.select      = this.select;    
                
    }
    
    public execute = (command:any, params:any, apiOpts:any):any => {
        
        if (typeof command == 'string') {
            
            var originalCommand = command;
            
            if (params)
                command += '(' + JSON.stringify(params) + ')';
            
            command = command.replace('console.log', 'holomatrix.api.log');
            
            if (apiOpts)
                this.setOptions(apiOpts);
            
            // using window.eval (rather than eval) ensures variables assigned from the 
            // console using 'var' are persistently accessible    
            var returnValue:any = window.eval(command);
            
            // broadcast command
            holomatrix.transport.broadcast(command);
            
            // add command to history
            holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
                    
            if (apiOpts) 
                this.unsetOptions();
                                
            return returnValue;
            
        } else {
            var apiCommand = command.toString();
            apiCommand += params ? '(' + JSON.stringify(params) + ')' : '()';
            apiCommand += ';';
            return command(params);
        }    
           
    }
   
    public getObject(objectName:string) {
        
        if (objectName in holomatrix.data.sceneObjects)
            return holomatrix.data.sceneObjects[objectName];
        return null;
        
    }
   
    public getSelected() {
        
        var selectedObject = holomatrix.scope.properties.selectedObject.name;
        
        if (selectedObject)
            return selectedObject;
        
        return null;
        
    }
    
    public log(message:any) {
        holomatrix.scope.console.logMessage(message);
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