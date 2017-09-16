
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Orders } from '../../api/orders/orders.js';
import { Messages } from '../../api/messages/messages.js';

Meteor.startup(function() {
  console.log(Meteor.users.find().count() );
  //if (Meteor.users.find().count() != 0){
     Meteor.users.remove({});

     Accounts.createUser({
       username: 'simosawa',
       email: 'm.kiran@clubcities.com',
       password: '0000aaaa',
       profile: {
         name: 'simosawa',
         role: 'admin',
         pv: 'Laboratoire'
       }
     });
//  }


  if (Orders.find().count() > 0) {
    Messages.remove({});
    Orders.remove({});

    var messages = [
      {
        senderId: null,
        content: 'http://localhost:3000/ufs/pictures/275bMpi9rqtNDJ6qZ/Capture.PNG',
        createdAt: moment().subtract(1, 'hours').toDate(),
        type: 'picture'
      },
      {
        senderId: null,
        content: 'You on your way?',
        createdAt: moment().subtract(1, 'hours').toDate(),
        type: 'text'
      },
      {
        senderId: null,
        content: 'Hey, it\'s me',
        createdAt: moment().subtract(1, 'hours').toDate(),
        type: 'text'
      },
      {
        senderId: null,
        content: 'I should buy a boat',
        createdAt: moment().subtract(1, 'hours').toDate(),
        type: 'text'
      },
      {
        senderId: null,
        content: 'This is wicked good ice cream.',
        createdAt: moment().subtract(1, 'hours').toDate(),
        type: 'text'
      }
    ];

    messages.forEach(m => Messages.insert(m));

    var chats = [
      {
        username: 'Simo Sawa',
        deliveryPoint: 'Iberia',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '17:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Simo Sawa',
        deliveryPoint: 'Iberia',
        deliveryDate: moment().add(1, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'home',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      },
      {
        username: 'Anass Tatari',
        deliveryPoint: 'Corniche',
        deliveryDate: moment().add(2, 'weeks').toDate(),
        deliveryhoure: '16:00',
        deliveryType: 'pickup',
        clientId:'1'
      }
    ];

    chats.forEach(chat => {
      let message = Messages.findOne({ chatId: { $exists: false } });
      chat.lastMessage = message;
      let chatId = Orders.insert(chat);
      Messages.update(message._id, { $set: { order_id: chatId } });
    });

  }
//Meteor.users.remove({});
//Orders.remove({});
//Messages.remove({});
});
