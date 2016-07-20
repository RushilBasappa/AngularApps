'use strict';

angular
  .module('myApp.tictactoe', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tictactoe', {
      templateUrl: 'tictactoe/tictactoe.html',
      controller: 'TictactoeCtrl'
    });
  }])

  .controller('TictactoeCtrl', function($window, $scope){

    var init = function(){
      $scope.player = $window.localStorage.getItem('player') ? $window.localStorage.getItem('player') : "O";
      $scope.board = $window.localStorage.getItem('board') ? JSON.parse($window.localStorage.getItem('board')) : [
          [null, null, null],
          [null, null, null],
          [null, null, null]
      ];
      checkboard(); 
    }

    var updateLocalStorage = function(){
        $window.localStorage.setItem('board',JSON.stringify($scope.board));
        $window.localStorage.setItem('player',$scope.player);
    }

    var setCell = function(row, column, value){
      if (!$scope.board[row][column] && !$scope.winner){
        $scope.board[row][column] = value;
        $scope.player = $scope.player == "O"? "X" : "O";
        updateLocalStorage();
      }
    }

    var cell = function(row, column){
      return $scope.board[row][column];
    }

    $scope.clearData = function(){
      $window.localStorage.clear();
      init();
      checkboard();
      $scope.winner = "";
    }

    $scope.cellText = function(row, column){
      var value = $scope.board[row][column];
      return value ? value : " ";
    }
  
    $scope.change = function(row,column){
      setCell(row, column, $scope.player);
      checkboard();
    }

    $scope.checked = function(row,column){
      return true;
    }

    var checkboard =  function(){
      var empty = false; 
      //Check if board is empty
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
           if(!cell(i,j))
            empty = true;
         } 
      }

      if(!empty)
        $scope.winner = "Draw";

      for (var i = 0; i < 3; i++) {
        if( cell(i,0) && ((cell(i,0) == cell(i,1)) && (cell(i,1) == cell(i,2)))) {  
          $scope.winner = cell(i,0);
        }
        if( cell(0,i) && ((cell(0,i) == cell(1,i)) && (cell(1,i) == cell(2,i)))) {  
          $scope.winner = cell(0,i);
        }
      }
      if( cell(0,0) && ((cell(0,0) == cell(1,1)) && (cell(1,1) == cell(2,2)))) {  
        $scope.winner = cell(0,0);
      }
      if( cell(2,0) && ((cell(2,0) == cell(1,1)) && (cell(1,1) == cell(0,2)))) {  
        $scope.winner = cell(0,0);
      }
    }
    init();
  });
