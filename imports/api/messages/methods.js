import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Orders } from '../orders/orders.js';
import { Messages } from './messages.js';


Meteor.methods({
  'message.insert' (type, orderId, text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const orderExists = !!Orders.find(orderId).count();

    if (!orderExists) {
      throw new Meteor.Error('order-not-exists',
        'Chat doesn\'t exist');
    }
    return {
      messageId: Messages.insert({
        chatId: chatId,
        senderId: Meteor.userId(),
        content: text,
        createdAt: new Date(),
        type: type
      })
    };
  },
  'message.remove' (message_id) {
    check(message_id, String);

    Messages.remove(message_id);
  }
});
