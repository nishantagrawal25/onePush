var app = angular.module('app', [ 'ngRoute', 'controllers', 'services',
  'ui.bootstrap', 'ngTable' , 'directives']);

app.controller('AdminCtrl', [ '$scope', 'AdminSvc', '$location','$http', function($scope, AdminSvc, $location, $http) {

  getData();
  
  function getData() {
    AdminSvc.getData().then(function(data) {
      $scope.websiteData = data.websites;
      console.log($scope.websiteData);
    })
  }
  
  $scope.saveData = function() {
    $scope.title = "Nishant";
    $scope.url = "http://www.google.com";
    $scope.tag = "Trial"
    AdminSvc.saveData($scope.title, $scope.url, $scope.tag).then(function() {
      console.log("success")
    }, function(err) {
      console.log("failure")  
    })
  }

} ]);
