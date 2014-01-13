describe('Initialization flash messages', function() {

  beforeEach(module('flash'));

  it('Should render div tags with flash-message class', inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = angular.element("<flash level='' message=''></flash>");
    element = $compile(element)($rootScope);
    expect(element.hasClass("flash-message")).toBe(true);
    expect(element.hasClass('hide'));
  }));


  it('Should show flash message from server', inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = angular.element("<flash level='success' message='Hello world'></flash>");
    element = $compile(element)($rootScope);
    expect(element.text('Hello world'));
    expect(element.hasClass('success'));
    expect(element.hasClass('hide')).toBe(false);
  }));

  it('Should show flash message from angular', inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = angular.element("<flash level='' message=''></flash>");
    element = $compile(element)($rootScope);
    $rootScope.flash('Hello from angular', 'error');
    expect(element.text('Hello world from angular'));
    expect(element.hasClass('error'));
    expect(element.hasClass('hide')).toBe(false);
  }));

});