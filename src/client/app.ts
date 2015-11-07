/// <reference path='_all.ts' />

interface Holomatrix {
    app:     Object,
    api:     Object,
    execute: Function
};

var holomatrix:Holomatrix = {
    
    app: angular.module('holomatrix', [
        'ui.bootstrap-slider'
    ]),
    
    api:     new APIComponent(),
    execute: ExecuteFunction
    
};

holomatrix.execute('test command');
