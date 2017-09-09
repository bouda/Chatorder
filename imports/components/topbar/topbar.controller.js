import angular from 'angular';
import angularMeteor from 'angular-meteor';


class TopbarController {
  constructor() {
  }

  logout(){
    this.onLogout();
  }
}

export default TopbarController;
