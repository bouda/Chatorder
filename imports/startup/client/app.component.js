import template from './app.html';
import controller from './app.controller';
//import './app.scss';

let appComponent = {
  template,
  controller,
  controllerAs: 'vm',
  restrict: 'E'
};

export default appComponent;