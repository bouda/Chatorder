import angular                       from 'angular';
import angularMeteor                 from 'angular-meteor';
import ordersComponent            from './orders.component';
//import GoatsListingComponent    from '../../containers/goatsListing/goatsListing';

let ordersModule = angular.module('orders', [
    //GoatsListingComponent.name
    angularMeteor
])

.component('orders', ordersComponent);

export default ordersModule;
