var flash = angular.module('flash', []);

flash.factory('flash', ['$rootScope', function($rootScope) {
  var flash = function(message, level) {
    if (!level) level = 'success';
    $rootScope.$emit('flash:message', message, level);
  };

  return flash;
}]);

flash.directive('flash', function($timeout) {
  var directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="flash-message"></div>',
    link: function(scope, element, attr) {
      element.html() ? element.removeClass('hide') : '';
      element.bind('click', function() {
        element.addClass('hide');
      });
      $timeout(function(){
             element.hide();
         }, 5000);
    }
  };

  directive.controller = ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
    $rootScope.$on('flash:message', function(ev, message, level) {
      $rootScope.flash(message, level);
    });
    angular.element(document).on('pjax:start', function() {
      $scope.reset_flash();
    })

    $scope.reset_flash = function() {
      $element.removeClass('hide');
      $element.addClass('hide');
      $element.removeClass('success');
      $element.removeClass('error');
      $element.html('');
    }

    $rootScope.flash = function(message, level) {
      $scope.reset_flash();
      $element.addClass(level);
      $element.html(message);
      message ? $element.removeClass('hide') : '';
    };

    $rootScope.flash($element.attr('message'), $element.attr('level'));
  }];

  return directive;
});

flash.directive('flashio', function() {
  var directive = {
    restrict: 'E'
  };

  directive.controller = ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
    if ($element.attr('message')) {
      $rootScope.flash($element.attr('message'), $element.attr('level'));
    }
  }];

  return directive;
});