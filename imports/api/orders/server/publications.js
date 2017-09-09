import { Meteor } from 'meteor/meteor';
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
  
    
  return Orders.find(where, options);
});
