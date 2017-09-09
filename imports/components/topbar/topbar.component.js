import template from './topbar.html';
import controller from './topbar.controller';

let topbarComponent = {
  //restrict: 'E',
  bindings: {
    name: '<',
    onLogout: '&'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default topbarComponent;
