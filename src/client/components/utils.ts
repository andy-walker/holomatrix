class UtilsComponent {
    
    /**
     * Convert degrees to radians
     */
    public deg2rad(degree:number):number { 
        return degree * (Math.PI / 180); 
    }
        
    /**
     * Generate a unique name for the specified geometry type
     */
    public getUniqueName(objectType:string):string {
        var objectIndex:number = 1;
        objectType = objectType.toLowerCase();
        while ((objectType + objectIndex) in holomatrix.data.sceneObjects)
            objectIndex++;
        return objectType + objectIndex;
    }

    /**
     * Convert radians to degrees
     */
    public rad2deg(radians:number):number {
        return radians * 180 / Math.PI;
    };

}