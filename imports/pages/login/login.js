import angular                       from 'angular';
import angularMeteor                 from 'angular-meteor';
import {auth} from '../../services/auth';
import loginComponent                from './login.component';
//import GoatsListingComponent    from '../../containers/goatsListing/goatsListing';

let loginModule = angular.module('login', [
    //GoatsListingComponent.name
    angularMeteor,
    'auth'
])

.component('login', loginComponent);

export default loginModule;
