/// <reference path='_all.ts' />
;
// Main application object
var holomatrix = {
    api: new APIComponent(),
    data: {
        sceneHelpers: {
            manipulator: null,
            selectionWireframe: null
        },
        sceneObjects: {}
    },
    execute: ExecuteFunction,
    scope: {},
    transport: new TransportComponent(),
    ui: {},
    utils: new UtilsComponent(),
    viewport: new ViewportComponent()
};
// Initialize 3D viewport
holomatrix.viewport.initialize();
// Initialize transport
holomatrix.transport.initialize();
// Initialize UI
holomatrix.ui = angular.module('holomatrix', [
    'ui.codemirror'
]);
// holomatrix.execute("addPrimitive('cube')");
