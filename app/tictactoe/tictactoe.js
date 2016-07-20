'use strict';

angular
  .module('myApp.tictactoe', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tictactoe', {
      templateUrl: 'tictactoe/tictactoe.html',
      controller: 'TictactoeCtrl'
    });
  }])

  .controller('TictactoeCtrl', function(){

  });