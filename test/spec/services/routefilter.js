'use strict';

describe('Service: Routefilter', function () {

  // load the service's module
  beforeEach(module('authApp'));

  // instantiate service
  var Routefilter;
  beforeEach(inject(function (_Routefilter_) {
    Routefilter = _Routefilter_;
  }));

  it('should do something', function () {
    expect(!!Routefilter).toBe(true);
  });

});
