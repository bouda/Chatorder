import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';


Meteor.publish('messages', function (options, chatid) {
	var where = {};
	
	if(!chatid){
		return;
	}
	
	console.log(chatid);
	where.chatId = chatid;
	
    return Messages.find(where, options);
});
