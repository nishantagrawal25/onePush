var svc = angular.module('services', []);

svc.service('AdminSvc', [ '$http', '$q', function($http, $q) {
  return {
    
    getData : function() {
      return this.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites')
    },
    
    saveData : function(title, url, tag) {
      return this.put("https://hackerearth.0x10.info/api/one-push?type=json&query=push", {
        title : title,
        url : url,
        tag : tag
      })
    },

    upload : function(file, buyerId, tmp,fileType) {
      var deferred = $q.defer();
      var fd = new FormData();
      fd.append("file", file);
            
      var url = tmp ? "/upload/" + buyerId + "/tmp" : "/upload/" + buyerId;
          
      $http.post(url, fd, {
        headers : {
            'File-Type' : fileType,
            'Content-Type' : undefined
        },
        transformRequest : angular.identity
      }).success(function(data, status, headers, config) {
        if (status == 200) {
          deferred.resolve(data);
        } else {
          deferred.reject(data);
        }
        
      }).error(function(data, status, headers, config) {
        deferred.reject('Error in uploading file.');
      });

      return deferred.promise;
    },

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

    del : function(url, params, data) {
        var deferred = $q.defer();
        $http({
        	method : 'DELETE',
        	url : url,
        	params : params,
        	data : data
        }).then(function(response) {
          if (response.status == 200) {
           deferred.resolve(response.data)
          } else {
            deferred.reject(response.data)
          }
        });
        return deferred.promise;
      },

    put : function(url, data) {
      var deferred = $q.defer();
      $http({
        method : 'PUT',
        url : url,
        data : data
      }).then(function(response) {
        if (response.status == 200) {
          deferred.resolve(response.data);
        } else {
          deferred.reject(response.data);
        }
      });
      return deferred.promise;
    }
  }

} ])