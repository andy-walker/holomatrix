/* worldbuilder application flie */

// create mongo collection for storing world objects
Objects = new Mongo.Collection("objects");

if (Meteor.isClient) {

    angular.module('worldbuilder', ['angular-meteor']);

    angular.module('worldbuilder').controller('WorldbuilderCtrl', function ($scope, $meteor) {

        $scope.objects = $meteor.collection(Objects);

        $scope.remove = function(object) {
            $scope.objects.remove(object);
        };

        $scope.removeAll = function() {
            $scope.objects.remove();
        };

    });

}

