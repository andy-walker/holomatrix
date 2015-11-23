var UtilsComponent = (function () {
    function UtilsComponent() {
    }
    /**
     * Convert degrees to radians
     */
    UtilsComponent.prototype.deg2rad = function (degree) {
        return degree * (Math.PI / 180);
    };
    /**
     * Generate a unique name for the specified geometry type
     */
    UtilsComponent.prototype.getUniqueName = function (objectType) {
        var objectIndex = 1;
        objectType = objectType.toLowerCase();
        while ((objectType + objectIndex) in holomatrix.data.sceneObjects)
            objectIndex++;
        return objectType + objectIndex;
    };
    UtilsComponent.prototype.isRoughlyEqual = function (value1, value2, threshold) {
        var diff = value1 - value2;
        console.log('diff = ' + diff);
        if (diff <= threshold && diff >= 0 - threshold)
            return true;
        return false;
    };
    /**
     * Convert radians to degrees
     */
    UtilsComponent.prototype.rad2deg = function (radians) {
        return radians * 180 / Math.PI;
    };
    ;
    return UtilsComponent;
})();
