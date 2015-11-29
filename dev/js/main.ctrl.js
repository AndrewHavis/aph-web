'use strict';

var app = angular.module('aphApp', ['ngtweet']);

app.controller('flickrBgCtrl', ['$scope', '$http', function($scope, $http) {
    
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
    
}]);

app.controller('twitterCtrl',  ['$scope', '$http', function($scope, $http) {
    
    // Get my information from the Twitter API
    $http.get('/api/twitter/me')
    .success(function(response) {
        
        // We have our data, so return it to Angular
        console.log(response);
        $scope.twitterJSON = response;
        
        // Get the relevant details to display on the page
        $scope.profileUrl = 'https://twitter.com/' + response.screen_name;
        $scope.tweetCount = response.statuses_count;
        $scope.followerCount = response.followers_count;
        $scope.followCount = response.friends_count;
        $scope.avatar = response.profile_image_url_https.replace('_normal', ''); // Get original image over HTTPS (in case I want to use HTTPS later)
    
    })
    .error(function(error) {
        
        // We haven't been able to get the data, so return an error
        console.log(error);
        
    });
    $http.get('/api/twitter/tweets')
    .success(function(response) {
        
        // We have our data, so return it to Angular
        console.log(response);
        $scope.tweetsJSON = response;
    
    })
    .error(function(error) {
        
        // We haven't been able to get the data, so return an error
        console.log(error);
        
    });
    
}]);