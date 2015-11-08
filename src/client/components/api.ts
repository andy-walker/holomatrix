interface API_Interface {
    polygon:Object  
}

class APIComponent implements API_Interface {
    
    public polygon = new PolygonAPI();
    
    constructor() {
        console.log('API component initialized');      
    }
    
};