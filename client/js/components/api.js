var APIComponent = (function () {
    function APIComponent() {
        this.polygon = new PolygonAPI();
        console.log('API component initialized');
    }
    return APIComponent;
})();
;
