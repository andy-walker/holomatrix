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
    return UtilsComponent;
})();
