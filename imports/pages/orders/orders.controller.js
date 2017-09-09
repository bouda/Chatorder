import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Orders } from '../../api/orders/orders';
import { Messages } from '../../api/messages/messages';

class OrdersController {
  constructor($scope) {


    $scope.viewModel(this);

    this.name = 'Orders';
    this.hideCompleted = true;
    this.currentChatID = 0;
    this.filterDate = false;
    this.date = '';
    this.imageSrc = '';

    this.subscribe('orders');

    this.helpers({
        orders() {
          const selector = {};

          // If hide completed is checked, filter tasks
          if (this.getReactively('hideCompleted')) {
            selector.checked = {
              $ne: true
            };
          }


          if (this.getReactively('filterDate')) {
            selector.deliveryDate = this.filterDate;
          }

          return Orders.find(selector, {
            sort: {
              deliveryhoure: 1
            }
          });
        },
        incompleteCount() {
          return Orders.find({
            checked: {
              $ne: true
            }
          }).count();
        },
        messages(){

          return Messages.find({chatId: this.getReactively('currentChatID')});
        },
        currentUser() {
          return Meteor.user();
        }
      })
  }
}

export default OrdersController;
