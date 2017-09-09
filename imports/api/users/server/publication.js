import { Meteor } from 'meteor/meteor';
import { Clients } from '../clients.js';

Meteor.publish('users', function () {
  return Meteor.users;
});

Meteor.publish('currentUser', function () {
  if (this.userId) {
    return Meteor.users.findOne({ _id: this.userId });
  } else {
    this.ready();
  }
});

Meteor.publish('clients', function () {
  return Clients.find();
});