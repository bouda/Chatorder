import angular                       from 'angular';
import angularMeteor                 from 'angular-meteor';
import topbarComponent               from './topbar.component';


let topbarModule = angular.module('topbar', [
    angularMeteor
])

.component('topbar', topbarComponent);

export default topbarModule;
