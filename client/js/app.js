/// <reference path='_all.ts' />
;
var holomatrix = {
    app: angular.module('holomatrix', [
        'ui.bootstrap-slider'
    ]),
    api: new APIComponent(),
    execute: ExecuteFunction
};
holomatrix.execute('test command');
