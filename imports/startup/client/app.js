import angular            from 'angular';
import angularMeteor      from 'angular-meteor';
import uiRouter           from 'angular-ui-router';
import AppComponent       from './app.component';

import { navigationModule as navigation } from '../../components/navigation/navigation';
import { topbarModule as topbar } from '../../components/topbar/topbar';

import { dashboardModule as dashboard } from '../../pages/dashboard/dashboard';
import { loginModule as login } from '../../pages/login/login';
import { ordersModule as orders } from '../../pages/orders/orders';
//import CreateComponent from './pages/create/create';

import {auth} from '../../services/auth';


angular
    .module('app', [
       angularMeteor,
        uiRouter,
        'auth',
        'navigation',
        'topbar',
        'dashboard',
        'login',
        'orders'
    ]).run(($rootScope, $state, $transitions, $auth) => {

      console.log($auth);
      $auth.awaitUser().then(function(user){
          console.log(user);
          $rootScope.currentUser = user;
          console.log($rootScope.currentUser);
        });

        $transitions.onStart({ to: 'app.**' }, (trans) => {
             if (trans.$to().data.AUTH_REQUIRED === true ) {
                if( $rootScope.currentUser === null ){
                  //event.preventDefault();
                  $state.go('app.login');
                }
                $rootScope.$broadcast('stateChanged', trans.$to().data.name);
             }
        });
    })
    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
        "ngInject";

        // Define our app routing, we will keep our layout inside the app component
        // The layout route will be abstract and it will hold all of our app views
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                template: '<app class="app"></app>'
            })

            // login page
            .state('app.login', {
                url: '/login',
                template: '<login></login>',
                data: {
                  'AUTH_REQUIRED' : false,
                  'name': 'Login'
                }
            })
            // Dashboard page
            .state('app.dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>',
                data: {
                  'AUTH_REQUIRED' : true,
                  'name': 'Dashboard'
                }
            })

            // Orders page
            .state('app.orders', {
                url: '/orders',
                template: '<orders></orders>',
                data: {
                  'AUTH_REQUIRED' : true,
                  'name': 'Orders'
                }
            })
			;

        $urlRouterProvider.otherwise('/app/dashboard');
    })
    .component('app', AppComponent);

function onReady() {
  angular.bootstrap(document, ['app']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
