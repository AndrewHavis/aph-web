'use strict';

angular.module('aphApp')

/*
 * carouselCtrl
 * @description A controller for the image carousel that shows a collection of my photographs
 * @dev Andrew Havis
 */

.controller('carouselCtrl', carouselCtrl);

carouselCtrl.$inject = ['$scope'];

function carouselCtrl($scope) {
    
    // How long each picture should show for. in milliseconds
    $scope.interval = 5000;
    
    // Should the carousel go back to the beginning when we reach the end?
    $scope.wrap = true;
    
    // Declare our slide object
    var slides = $scope.slides = [];
    
    // Now do the business of gathering our images
    for (var i = 0; i < $scope.numPhotos; i++) {
        slides.push({
            image: $scope.gallery[i].url_m,
            text: $scope.gallery[i].title
        });
    }
    
}