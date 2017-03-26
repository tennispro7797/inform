Meteor.methods({
	checkUserFP: function(currentFingerPrint, postID){
		var alreadyLiked = problemInfo.findOne({_id: postID, userLikedFP: currentFingerPrint});
		if (typeof(alreadyLiked) == "undefined") {
			return false;
		}else{
			return true;
		}
	}
});