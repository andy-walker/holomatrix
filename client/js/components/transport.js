var TransportComponent = (function () {
    function TransportComponent() {
        var _this = this;
        this.broadcast = function (command) {
            _this.socket.emit('command', command);
        };
        this.initialize = function () {
            _this.socket = io.connect();
        };
    }
    return TransportComponent;
})();
