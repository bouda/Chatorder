import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Orders } from './orders.js';
import { Clients } from '../users/clients.js';
import { Push } from 'meteor/raix:push'


Meteor.methods({
  'order.insert' (order) {
    var _id;
    var currentId;
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.call('order.client', order.client, function (err, result) {
      if (err) {
          throw new Meteor.Error(err);
      }

      _id = result.clientid;
    });

   if (Orders.find({}).count() === 0) {
     currentId = 0;
   }else{
     currentId = Orders.findOne({},{sort:{order_id:-1}}).order_id || 1;
   }

    return {
      chatsid:Orders.insert({
          order_id:currentId + 1,
          createdAt: moment( new Date()).format("yyyy-MM-dd"),
          owner: Meteor.userId(),
          username: Meteor.user().profile.name,
          deliveryPoint: order.deliveryPoint,
          deliveryDate: order.deliveryDate,
          deliveryhoure: order.deliveryhoure,
          deliveryType: order.deliveryType,
          deliveryAdvance: parseInt(order.deliveryAdvance),
          status:'en-coure',
          checked:false,
          clientId:_id
      })
    };
  },
  'order.remove' (order_id) {
    check(order_id, String);

    Orders.remove(order_id);
  },
  'order.onholde' (order_id) {
    check(order_id, String);

    Orders.update(order_id, {
      $set: {
        status: 'en-attente',
        checked:false
      }
    });
  },
  'order.finish' (order_id) {
    check(order_id, String);

    Orders.update(order_id, {
      $set: {
        status: 'terminer',
        checked:true
      }
    });
  },
  'order.setChecked' (order_id, setChecked) {
    check(order_id, String);
    check(setChecked, Boolean);

    Orders.update(order_id, {
      $set: {
        checked: setChecked
      }
    });
  },
  'order.notify-NewOrder' (order_id, role){
	var user = Meteor.users.find({'profile.role': role}).fetch();
	console.log(user);
	return;
    Push.send({
        from: 'Clubcities ChatOrder',
        title: 'Nouvelle Commande',
        text: 'Vous avez recue une nouvelle commande',
        badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
		query: {}
        //query: {
            // Ex. send to a specific user if using accounts:
           // userId: 'xxxxxxxxx'
        //} // Query the appCollection
        // token: appId or token eg. "{ apn: token }"
        // tokens: array of appId's or tokens
        // payload: user data
        // delayUntil: Date
    });	  
  },
  'order.notify-EditedOrder' (order_id){
    Push.send({
        from: 'Clubcities ChatOrder',
        title: 'Nouvelle Commande',
        text: 'Vous avez recue une nouvelle commande',
        badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
		query: {}
        //query: {
            // Ex. send to a specific user if using accounts:
           // userId: 'xxxxxxxxx'
        //} // Query the appCollection
        // token: appId or token eg. "{ apn: token }"
        // tokens: array of appId's or tokens
        // payload: user data
        // delayUntil: Date
    });	  
  },
  'order.notify-RedyOrder' (order_id){
    Push.send({
        from: 'Clubcities ChatOrder',
        title: 'Nouvelle Commande',
        text: 'Vous avez recue une nouvelle commande',
        badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
		query: {}
        //query: {
            // Ex. send to a specific user if using accounts:
           // userId: 'xxxxxxxxx'
        //} // Query the appCollection
        // token: appId or token eg. "{ apn: token }"
        // tokens: array of appId's or tokens
        // payload: user data
        // delayUntil: Date
    });	  
  }
});
