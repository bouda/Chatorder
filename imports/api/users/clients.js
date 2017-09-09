import { Mongo } from 'meteor/mongo';

export const Clients = new Mongo.Collection('clients');
	Meteor.methods({
	  'client.insert' (client) {
		return {
		  clientid:Clients.insert({
			fname:client.fname,
			lname:client.lname,
			email:client.email,
			phone:client.phone,
			address:client.address,
			city:client.city,
			country:client.country,
			zipcode:client.zipcode,
			createdAt:new Date()
		  })
		};
	  }
	});
