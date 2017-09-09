import angular from 'angular';
import angularMeteor from 'angular-meteor';


class TopbarController {
  constructor($rootScope) {
    $rootScope.$on('stateChanged', (e, data)=>{
      this.name = data;
    })
  }

  logout(){
    this.onLogout();
  }
}

export default TopbarController;
