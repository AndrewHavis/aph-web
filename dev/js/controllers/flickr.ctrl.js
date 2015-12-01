'use strict';

angular.module('aphApp')

/*
 * flickrCtrl
 * @description Gets data from the Flickr API
 * @dev Andrew Havis
 */

.controller('flickrCtrl', flickrCtrl);

flickrCtrl.$inject = ['$scope', '$http'];

function flickrCtrl($scope, $http) {
    
    // Get the photo JSON data from the API
    $http.post('/api/flickr/photos')
    .success(function(response) {
        
        // We have our data, so return it to Angular
        console.log(response);
        $scope.photos = response.photos.photo;
        
        // Pick some random photos for our gallery
        $scope.numPhotos = 6;
        $scope.gallery = [];

        for (var i = 0; i < $scope.numPhotos; i++) {
            var item = {};
            var randNum = Math.floor(Math.random() * $scope.photos.length);
            var photoItem = $scope.photos[randNum];
            item.id = photoItem.id;
            item.title = photoItem.title;
            item.url_t = photoItem.url_t;
            item.url_m = photoItem.url_m;
            item.url_l = photoItem.url_l;
            item.url_o = photoItem.url_o;
            $scope.gallery.push(item);
        }
        
    })
    .error(function(error) {
       
        // We haven't been able to get the data, so return an error
        console.log(error);
        
    });
        
    $http.post('/api/flickr/set/72157627139957661')
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