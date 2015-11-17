class TransportComponent {
    
    private socket;
    
    public broadcast = (command:string) => {
        this.socket.emit('command', command);
    }
    
    public initialize = () => {
        this.socket = io.connect();        
    }
    
}