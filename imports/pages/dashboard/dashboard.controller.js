import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Clients } from '../../api/users/clients';

class DashboardController {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('clients');

    this.helpers({
       clients() {
         const selector = {};
         // Show newest clients at the top
         return Clients.find(selector, {
           sort: {
             createdAt: -1
           },
           limit: 5
         });
       }
     })



    this.name = 'dashboard';
    this.ordersPending  = 20;
    this.ordersOnHold   = 20;
    this.ordersFinished = 20;
    this.toalClients = 8;

    this.newClient = {
      fname : '',
      lname : '',
      phone : '',
      email : '',
      address : '',
      city : 'Tanger',
      country : 'Maroc',
      zipcode : '90000'
    };
  }

  addNewClient(client) {
  // Insert a task into the collection
  Meteor.call('client.insert', client);

  // Clear form
  this.newClient = {
    fname : '',
    lname : '',
    phone : '',
    email : '',
    address : '',
    city : 'Tanger',
    country : 'Maroc',
    zipcode : '90000'
  };
 }
}

export default DashboardController;
