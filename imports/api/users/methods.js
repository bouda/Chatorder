import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Meteor.methods({
  'updateName' (user) {
    check(user.name, String);
    console.log(user.name);
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if (user.name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide user name');
    }

    var _return = Meteor.users.update(Meteor.userId(), { $set: {profile: user} });
    return _return;
  },
  'updateRole' (role, userId){
    check(role, String);
    check(userId, String);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId() || Meteor.user().profile.role !== 'admin') {
      throw new Meteor.Error('not-authorized');
    }


    if (role.length === 0) {
      throw Meteor.Error('name-required', 'Must provide user role');
    }

    var _return = Meteor.users.update(userId, { $set: { 'profile.role': role } });
    return _return;
  }
});
