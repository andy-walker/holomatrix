var TransportComponent = (function () {
    function TransportComponent() {
    }
    TransportComponent.prototype.initialize = function () {
        this.socket = io.connect();
    };
    return TransportComponent;
})();
