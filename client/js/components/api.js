var APIComponent = (function () {
    function APIComponent() {
        console.log('API component initialized');
    }
    APIComponent.prototype.addPrimitive = function (primitiveType) {
        console.log('adding primitive');
    };
    return APIComponent;
})();
;
