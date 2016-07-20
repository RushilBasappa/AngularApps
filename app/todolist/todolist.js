'use strict';

angular
  .module('myApp.todolist', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todolist', {
      templateUrl: 'todolist/todolist.html',
      controller: 'TodolistCtrl'
    });
  }])

  .controller('TodolistCtrl', function($scope,$window) {
      var init = function(){
        if ($window.localStorage.getItem("todoList")===null)
          $scope.todoList = [];
        else
          $scope.todoList = JSON.parse($window.localStorage.getItem('todoList'));
      };

      var updateStorage = function(todoList){
        $window.localStorage.setItem('todoList', JSON.stringify(todoList));
      };

      $scope.updateCheckBox = function(){
        updateStorage($scope.todoList);
      }
      $scope.todoAdd = function(){ 
        if(event.keyCode == 13 && $scope.task){
          $scope.todoList.push({task: $scope.task, check: false});
          $scope.task = undefined;
          updateStorage($scope.todoList);
        }
      }


      $scope.toggleEditMode = function(){
        $(event.target).closest('li').toggleClass('editing');
      };

      $scope.editTodo = function(){
        if(event.keyCode == 13){
          updateStorage($scope.todoList);
          $(event.target).closest('li').toggleClass('editing');
        }
      };

      $scope.clearMarked = function(){
        var data = $.grep($scope.todoList, function(e){ 
          return e.check == false;
        });
        $scope.todoList = data;
        updateStorage($scope.todoList);
      };
      init();
  });
