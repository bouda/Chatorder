import angular                       from 'angular';
import angularMeteor                 from 'angular-meteor';
import dashboardComponent            from './dashboard.component';
//import GoatsListingComponent    from '../../containers/goatsListing/goatsListing';

let dashboardModule = angular.module('dashboard', [
    //GoatsListingComponent.name
    angularMeteor
])

.component('dashboard', dashboardComponent);

export default dashboardModule;
