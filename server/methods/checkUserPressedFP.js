Meteor.methods({
	checkUserPressedFP: function(currentFingerPrint, postID){
		var alreadyLiked = problemInfo.findOne({_id: postID, userPressedFP: currentFingerPrint});
		if (typeof(alreadyLiked) == "undefined") {
			return false;
		}else{
			return true;
		}
	}
});