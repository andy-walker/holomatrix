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