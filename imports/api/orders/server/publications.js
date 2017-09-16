import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Orders } from '../orders.js';
import { Messages } from '../../messages/messages.js';


Meteor.publish('orders', function(options, checked, date, houre, pv) {

  var where = {};

  if( !_.isEmpty(date)){
	  where.deliveryDate = date;
  }

  if( !_.isEmpty(pv) && pv != 'Laboratoire' ){
	  where.deliveryPoint = pv;
  }

  if(checked){
	  where.checked = {$ne: true};
  }

  Counts.publish(this, 'numberOfOrders', Orders.find(where), {
    noReady: true
  });

  return Orders.find(where, options);
});
