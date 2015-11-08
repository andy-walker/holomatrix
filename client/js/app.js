/// <reference path='_all.ts' />
;
// Main application object
var holomatrix = {
    api: new APIComponent(),
    data: {
        sceneHelpers: {
            manipulator: null
        },
        sceneObjects: {}
    },
    execute: ExecuteFunction,
    scope: {},
    ui: {},
    utils: new UtilsComponent(),
    viewport: new ViewportComponent()
};
// Initialize 3D viewport
holomatrix.viewport.initialize();
// Initialize UI
holomatrix.ui = angular.module('holomatrix', [
    'ui.bootstrap-slider', 'ui.utils.masks'
]);
// holomatrix.execute("addPrimitive('cube')");
