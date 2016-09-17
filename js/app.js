var app = angular.module('app', [ 'ngRoute', 'controllers', 'services',
  'ui.bootstrap', 'ngTable' , 'directives']);

app.controller('AdminCtrl', [ '$scope', 'AdminSvc', '$location','$http', function($scope, AdminSvc, $location, $http) {

  getData();
  
  function getData() {
    AdminSvc.getData().then(function(data) {
      $scope.websiteData = data.websites;
      angular.forEach($scope.websiteData, function(itm) {
        itm.likes = localStorage.getItem(itm.url_address);
        if (itm.likes == null) {
          itm.likes = 0;
        }
      })
    })
  }
  
  $scope.saveData = function() {
    AdminSvc.saveData($scope.website).then(function() {
      console.log("success")
    }, function(err) {
      console.log("failure")  
    })
  }
  
  $scope.like = function(data) {
    data.likes = 0;
    data.likes = localStorage.getItem(data.url_address);
    if (data.likes == null) {
      data.likes = 0;
    }
    data.likes = parseInt(data.likes) + 1;
    localStorage.setItem(data.url_address, data.likes);
  }

} ]);
