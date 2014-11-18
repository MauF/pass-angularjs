'use strict';

describe('passInsuranceShell.version module', function() {
  beforeEach(module('passInsuranceShell.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
