var APIComponent = (function () {
    function APIComponent() {
        this.polygon = new PolygonAPI();
        this.options = {};
        window.polygon = this.polygon;
        window.select = this.select;
    }
    APIComponent.prototype.select = function (objectName) {
        // do this for now to get working, the logic for creating the manipulator should be moved
        // outside the angular controller though (todo)
        holomatrix.scope.properties.selectObject(objectName);
    };
    APIComponent.prototype.setOptions = function (options) {
        this.options = options;
    };
    APIComponent.prototype.unsetOptions = function () {
        this.options = {};
    };
    return APIComponent;
})();
;
