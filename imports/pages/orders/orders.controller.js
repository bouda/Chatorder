import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Orders } from '../../api/orders/orders';
import { Messages } from '../../api/messages/messages';

import { Counts } from 'meteor/tmeasday:publish-counts';

class OrdersController {
  constructor($scope, $filter) {


    $scope.viewModel(this);

    this.$filter = $filter;
    this.name = 'Orders';
 	  this.currentPage = 1;
 	  this.perPage = 5;
 	  this.sort = { deliveryhoure: 1 };
    this.hideCompleted = true;
    this.deliverydate = '';
 	  this.deliveryhoure = false;
    this.currentChatID = '';
    this.filterDate = false;
    this.date = '';
    this.imageSrc = '';

    this.OrderDetailClass = 'col-md-12';
    this.OrderDetailStyle = 'hidden';
    this.isOpned = false;


    this.subscribe('orders', function(){
		 return [{
		     sort: this.getReactively('sort'),
		     limit: parseInt(this.getReactively('perPage')),
			   skip: parseInt( (this.getReactively('currentPage') - 1) * this.perPage )

			 },
			 this.getReactively('hideCompleted'),
			 this.getReactively('deliverydate'),
			 this.getReactively('deliveryhoure') ];
	 });
    this.subscribe('messages', function(){
		return [{},
			this.getReactively('currentChatID')];
	});


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
            sort : this.getReactively('sort')
          });
        },
        ordersCount() {
          return Counts.get('numberOfOrders');
        },
        incompleteCount() {
          return Orders.find({
            checked: {
              $ne: true
            }
          }).count();
        },
        messages(){

          return Messages.find({});
        },
        currentUser() {
          return Meteor.user();
        }
      })

      console.log(this.ordersCount)

  }

  Showetails(id){
    this.currentChatID = id;
    console.log(this.currentChatID);
    if(this.isOpned){
      this.OrderDetailClass = 'col-md-12';
      this.OrderDetailStyle = 'hidden';
      this.isOpned = !this.isOpned;
    }else{
      this.OrderDetailClass = 'col-md-6';
      this.OrderDetailStyle = '';
      this.isOpned = !this.isOpned;
    }

  }

  pageChanged(newPage) {
    this.currentPage = newPage;
  }
}


export default OrdersController;
