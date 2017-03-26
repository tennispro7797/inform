import { Mongo } from 'meteor/mongo';

problemInfo = new Mongo.Collection("problemInfo");
problemInfo.schema = new SimpleSchema({
	title: {type: String},
	description: {type: String},
	userLikedFP: {type: [Number]},
	likes: {type: Number},
	solExists: {type: Number},
	hasExists: {type: Boolean},
	userPressedFP: {type: [Number]},
	hasPseudoLikes: {type: Boolean},
	pseudoLikes: {type: Number},
	comments: {type: [String]},
	numComments: {type: Number},
	hasCommented: {type: Boolean},
	date_created: {type: Number}
});
export default problemInfo;