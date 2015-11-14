interface API_Interface {
    polygon:Object  
}

class APIComponent implements API_Interface {
    
    public polygon = new PolygonAPI();
    public options:Object = {}; 
    
    constructor() {
        
        window.getSelected = this.getSelected;
        window.move        = this.move;
        window.polygon     = this.polygon;
        window.select      = this.select;    
                
    }
    
    public execute(command:any, params:any, apiOpts:any):any {
        
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
            var returnValue:any = window.eval(command);
            holomatrix.scope.console.addToCommandHistory(originalCommand, params, returnValue);
                    
            if (apiOpts) 
                api.unsetOptions();
                                
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
    
    public move(arg1:any, arg2:any, arg3:any, arg4:any) {
        
        var objectName:string;
        var x:number;
        var y:number;
        var z:number;
        
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
        
        // callspec: move(string, number, number, number)     
        } else if (typeof arg1 == 'string') {
            
            if (arg1 || arg1 === 0)
                objectName = arg1;
                
            if (arg2 || arg2 === 0)
                x = arg2;
                
            if (arg3 || arg3 === 0)
                y = arg3;
               
            if (arg4 || arg4 === 0)
                z = arg4;
        
        // callspec: move(number, number, number) - acts on selected object    
        } else {

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