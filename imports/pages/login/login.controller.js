import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

class LoginController {
  constructor($scope, $state, $auth) {
    $scope.viewModel(this);
    this.name = 'Login';

    this.credentials = {};
    this.isError = false;
    this.state = $state;

  }

  doLoginAction(e, credentials){
    e.preventDefault();
    Meteor.loginWithPassword(credentials.username, credentials.password, (err) => {
      if(err){
        console.log(err);
        this.isError = true;
        //return false;
      }

      this.state.go('app.dashboard');
    });
  }

  closeError(){
    this.isError = false;
  }
}

export default LoginController;
