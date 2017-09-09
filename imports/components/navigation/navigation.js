import angular from 'angular';
import angularMeteor      from 'angular-meteor'; 
import uiRouter from 'angular-ui-router';
import navigationComponent from './navigation.component';

let navigationModule = angular.module('navigation', [
  uiRouter
])

.component('navigation', navigationComponent)

.name;

export default navigationModule;
