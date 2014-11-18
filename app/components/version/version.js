'use strict';

angular.module('passInsuranceShell.version', [
  'passInsuranceShell.version.interpolate-filter',
  'passInsuranceShell.version.version-directive'
])

.value('version', '0.1');
