/// <reference path='_all.ts' />

interface Holomatrix {
    api:       Object,
    data:      any,
    execute:   Function,
    scope:     Object,
    transport: Object,
    ui:        Object,
    utils:     Object,
    viewport:  Object
};

// Main application object
var holomatrix:Holomatrix = {
        
    api: new APIComponent(),
   
    data: {
        sceneHelpers: {
            manipulator: null,
            selectionWireframe: null
        },
        sceneObjects: {}
    },
    
    execute:   function() {},
    scope:     {},
    transport: new TransportComponent(),
    ui:        {},
    utils:     new UtilsComponent(), 
    viewport:  new ViewportComponent(),

};

// Initialize components
holomatrix.viewport.initialize();
holomatrix.transport.initialize();
holomatrix.execute = holomatrix.api.execute;

// Initialize UI
holomatrix.ui = angular.module('holomatrix', [
    'ui.codemirror'
]);

// holomatrix.execute("addPrimitive('cube')");

