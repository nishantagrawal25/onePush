var app = angular.module('app', [ 'services', 'ui.bootstrap']);

app.controller('AppCtrl', [ '$scope', 'AdminSvc', function($scope, AdminSvc) {

  getData();
  
  //Function to get data of websites
  
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
  
  //Function to Save form data
  
  $scope.saveData = function() {
    AdminSvc.saveData($scope.website).then(function() {
      console.log("success")
    }, function(err) {
      console.log("failure")  
    })
  }
  
  //Function to like respective urls
  
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
