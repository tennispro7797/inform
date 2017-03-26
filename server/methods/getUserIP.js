Meteor.methods({
	getUserIP: function(){
		var IP = this.connection.clientAddress;
		return IP;
	}
});	