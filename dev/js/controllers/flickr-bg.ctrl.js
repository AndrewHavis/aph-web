'use strict';

angular.module('aphApp')

/*
 * flickrBgCtrl
 * @description Selects random Flickr backgrounds
 * @dev Andrew Havis
 */

.controller('flickrBgCtrl', flickrBgCtrl);

flickrBgCtrl.$inject = ['$scope', '$http'];

function flickrBgCtrl($scope, $http) {
    
    // Get the photo JSON data from the API
    $http.get('/api/flickr')
    .success(function(response) {
        
        // We have our data, so return it to Angular
        console.log(response);
        $scope.photos = response.photoset.photo;
        
        // Now pick a random picture to use as the home page background
        var randomId = Math.floor(Math.random() * $scope.photos.length);
        $scope.photo = $scope.photos[randomId];
        $scope.photoUrl = $scope.photo.url_l;
        
    })
    .error(function(error) {
        
        // We haven't been able to get the data, so return an error and use a default image
        console.log(error);
        $scope.photoUrl = 'img/intro-bg.jpg';
        
    });
    
}