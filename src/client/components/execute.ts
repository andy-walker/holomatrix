var ExecuteFunction = function(command:string):void {
    eval('holomatrix.api.' + command);
};