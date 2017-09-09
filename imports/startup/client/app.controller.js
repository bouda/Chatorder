import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';


class AppController {
  constructor($scope, $state) {
    this.stateName = $state.$current.name;
    //this.stateName = "Dashboard";
  }

  doLogout($state){
    Meteor.logout();
    $state.go('app.login');
  }
}

export default AppController;
