import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';


class AppController {
  constructor($scope, $state) {
    this.stateName = $state.$current.name;
    this.state = $state;
    //this.stateName = "Dashboard";
  }

  doLogout(){
    Meteor.logout();
    this.state.go('app.login');
  }
}

export default AppController;
