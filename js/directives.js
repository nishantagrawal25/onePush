var directives = angular.module('directives',[]);

directives.directive('emsPagination', [function() {
  return {
    scope: {
      totalItems: '=',
      itemsPerPage: '=',
    },
    require: ['emsPagination', '?ngModel'],
    controller : function($scope, $attrs) {
      this.init = function(ngModelCtrl) {

        ngModelCtrl.$render = function() {
          $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
        };

        $scope.$parent.$watch($attrs.itemsPerPage, function(value) {
          this.itemsPerPage = parseInt(value, 10);
          $scope.updatePage();
        });

        $scope.$watch('totalItems', function(newTotal, oldTotal) {
          if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
            $scope.updatePage();
          }
        });

        $scope.next = function() {
          $scope.page = ngModelCtrl.$viewValue;
          if ($scope.page*this.itemsPerPage < $scope.totalItems) {
            $scope.page++;
            ngModelCtrl.$setViewValue($scope.page);
            ngModelCtrl.$render();
          }
        }

        $scope.previous = function() {
          $scope.page = ngModelCtrl.$viewValue;
          if ($scope.page > 1) {
            $scope.page--;
            ngModelCtrl.$setViewValue($scope.page);
            ngModelCtrl.$render();
          }
        }

        $scope.updatePage = function() {
          if (($scope.page)*this.itemsPerPage > $scope.totalItems && $scope.totalItems>0) {
            ngModelCtrl.$setViewValue(Math.ceil($scope.totalItems / this.itemsPerPage))
            $scope.page = Math.ceil($scope.totalItems / this.itemsPerPage);
          } else {
            ngModelCtrl.$render();
          }
        };
      }
    },
    templateUrl : '/resources/partials/pagination-template.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
        return;
      }
      paginationCtrl.init(ngModelCtrl);
    }
  };
}]);

directives.directive('appHeader', function() {
  return {
    restrict : 'E',
    templateUrl : '/resources/partials/app-header.html'
  }
});

directives.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@+[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attrs, ctrl) {
      if (ctrl && ctrl.$validators.email) {
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});

directives.directive('selectAll', function() {
  return {
    replace : true,
    restrice : 'E',
    scope : {
      checkboxes : '=',
      post : '=',
    },
    template: '<input type="checkbox" ng-model="selectedAll" ng-change="selectAll()">',
    controller : function($scope) {
      
      $scope.selectAll = function() {
        if ($scope.selectedAll) {
          angular.forEach($scope.checkboxes, function(item) {
            item.checked = true;
            $scope.post.push(item);
          })
        } else {
          $scope.post = [];
          angular.forEach($scope.checkboxes, function(item) {
            item.checked = false;
          })
        }
      }
    }
  }
});

directives.directive('dateSearch', function() {
  return {
    restrict : 'E',
    templateUrl : 'resources/partials/date-search.html'
  }

})

directives.directive('emsDate', function() {
  return {
    restrict : 'A',
    scope : {
      emsDate : '='
    },
    template : "{{emsDate | date:'mediumDate' | NA}}"
  }
})

directives.directive('emsPrice', function() {
  return {
    restrict : 'A',
    scope : {
      emsPrice : '='
    },
    template : '<span class="icon-inr rupee-icon"></span>  {{emsPrice | number:2}}'
  }
})

directives.directive('searchOptions', function() {
  return {
    restrict : 'E',
    templateUrl : 'resources/partials/search-params.html',
    scope : {
      clone : '=',
      searchfunction : '&',
      search : '='
    },
    link : function(scope){
      scope.clear = function(){
        for (var key in scope.search) {
          if (scope.search.hasOwnProperty(key)) {
            if (scope.search[key].value != "") {
              scope.search[key].value='';
            }
          }
        }
        scope.searchfunction();
      }
    }
  }
})

directives.directive('commonHeader', function() {
  return {
    restrict : 'E',
    templateUrl : '/resources/partials/common-header.html'
  }
})