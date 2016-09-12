/*
*
*
* Author : Mary Hurley
* Assignment : WE4.1 Mobile Web Application, Digital Skills Academy
* Tite : Angular ToDo App
* Student ID: D15128601
* Date: 2016/09/01
*
* This is the main code set for the Todo app. The controllers and routing are set up here.
* Using a http.get to read some sample data from a JSON file, for display purposes only ( highlighting a link to 
* another page using ngRoute.)
*
* There are 2 controllers here the TodoController and the sortController.
*
* Code Reuse
* Ref: website link to code referenced or the book, authors name and page number
* http://www.w3schools.com/angular/tryit.asp?filename=try_ng_todo_app 
* https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
* http://www.bogotobogo.com/AngularJS/AngularJS_multiviews_ng-app_ngRoute_config_routeProvider-templateUrl_ng-view.php
*
*/

var app = angular.module("Todo", ['ngRoute']).
    config(function($routeProvider) {
        
            $routeProvider
            .when('/Todo', {
                templateUrl: 'partials/Todo.html',
                controller: 'TodoController'
            })
            .when('/sort', {
                templateUrl: 'partials/sort.html',
                controller: 'sortController'
            })
            .otherwise({
                redirectTo: '/Todo'
            });
});

app.factory('TodoFactory', function($http){
    return{       
        getTodosAsync: function(callback) {
            $http.get('Todos.json')
                .success(callback)
                .error(function(callback){console.log('Error on $http.get')});
        }  
    };
});


app.controller("TodoController", function($scope) {   
    $scope.title = "What's To Do..." ;
    
 
    $scope.todoList = [
        {todoName:'Mary', todoJob:'Build to do list', done:false},
        ];
    
    $scope.todoAdd = function() {
        $scope.todoList.push(
            {
                todoName:$scope.inputName, 
                todoJob:$scope.inputJob, 
                done:false}
        );
        
    };
    
    // this will prevent items from being displayed if the done box is checked .
    // not using $index here
    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(todo) {
            if (!todo.done) $scope.todoList.push(todo);
        });
    }; 
});
            
app.controller('sortController', function($scope, TodoFactory) {
    $scope.title = "Who's Doing What..." ;
    
    TodoFactory.getTodosAsync(function(results) {
        console.log('sortController async returned value');
            
        $scope.Todos = results.Todos;
        $scope.sort = "name";
        $scope.setSort= function(type){$scope.sort = type};
     
    });    
});
