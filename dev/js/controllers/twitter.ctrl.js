'use strict';

angular.module('aphApp')

/*
 * twitterCtrl
 * @description Gets data from the Twitter API
 * @dev Andrew Havis
 */

.controller('twitterCtrl', twitterCtrl);

twitterCtrl.$inject = ['$scope', '$http'];

function twitterCtrl($scope, $http) {
    
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
    
}