var svc = angular.module('services', []);

svc.service('AdminSvc', [ '$http', '$q', function($http, $q) {
  return {
    
    getData : function() {
      return this.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites')
    },
    
    saveData : function(website) {
      return this.put("https://hackerearth.0x10.info/api/one-push?type=json&query=push", {
        title : website.title,
        url : website.url,
        tag : website.tag
      })
    },
    
    //generic services of get and post which can be used again

    get : function(url, params) {
      var deferred = $q.defer();
      $http.get(url, {
        params : params
      }).then(function(response) {
        if (response.status == 200) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise;
    },

    post : function(url, params, data) {
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : url,
        params : params,
        data : data
      }).then(function(response) {
        if (response.status == 200) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise;
    },

  }

} ])