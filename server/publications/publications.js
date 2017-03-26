Meteor.publish("problemInfo", function(){
	return problemInfo.find({},{sort: {pseudoLikes: -1}, limit: 10});
});