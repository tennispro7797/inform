import { Mongo } from 'meteor/mongo';

users = new Mongo.Collection("users");
users.schema = new SimpleSchema({
	userIP: {type: String}
});
export default users;