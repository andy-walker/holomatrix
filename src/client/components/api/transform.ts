class TransformAPI {

    private transform(property:string, arg1:any, arg2:any, arg3:any, arg4:any):void {
        
        var objectName:string;
        var x:number;
        var y:number;
        var z:number;
        
        // callspec: move(Object)
        if (typeof arg1 == 'object') {
            
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
        
        // callspec: move(number, number, number) - operates on selected object    
        } else {

            if (arg1 || arg1 === 0)
                x = arg1;
                
            if (arg2 || arg2 === 0)
                y = arg2;
               
            if (arg3 || arg3 === 0)
                z = arg3;
           
        }
        
        if (!objectName)
            objectName = getSelected();
 
        if (!objectName) {
            holomatrix.api.log('no selection / no object specified');
            return;
        }
            
        var object = holomatrix.api.getObject(objectName);
        
        if (!object) {
            holomatrix.api.log("object not found");
            return;
        }
        
        if (!('updateViewport' in holomatrix.api.options) || holomatrix.api.options.updateViewport !== false) {

            if (x || x === 0) {
                switch (property) {
                    case 'position':
                    case 'scale':
                        object[property].x = x;
                        break;
                    case 'rotation':
                        object.rotation.x = holomatrix.utils.deg2rad(x);
                        break;
                }
            }

            if (y || y === 0) {
                switch (property) {
                    case 'position':
                    case 'scale':
                        object[property].y = y;
                        break;
                    case 'rotation':
                        object.rotation.y = holomatrix.utils.deg2rad(y);
                        break;
                }
            }

            if (z || z === 0) {
                switch (property) {
                    case 'position':
                    case 'scale':
                        object[property].z = z;
                        break;
                    case 'rotation':
                        object.rotation.z = holomatrix.utils.deg2rad(z);
                        break;
                }
            }
        }
        
        if (objectName == holomatrix.api.getSelected()) {
        
            if (property == 'position') {          
                var manipulator = holomatrix.data.sceneHelpers.manipulator;    
                manipulator.position.x = object.position.x;
                manipulator.position.y = object.position.y;
                manipulator.position.z = object.position.z;
            }            
            
            if (!('updateUI' in holomatrix.api.options) || holomatrix.api.options.updateUI !== false)
                holomatrix.scope.properties.getObjectProperties(objectName);
                 
        }
    
    }
   
    public move = (arg1:any, arg2:any, arg3:any, arg4:any) => {
        this.transform('position', arg1, arg2, arg3, arg4);
    }

    public rotate = (arg1:any, arg2:any, arg3:any, arg4:any) => {
        this.transform('rotation', arg1, arg2, arg3, arg4);
    }

    public scale = (arg1:any, arg2:any, arg3:any, arg4:any) => {
        this.transform('scale', arg1, arg2, arg3, arg4);
    }

}