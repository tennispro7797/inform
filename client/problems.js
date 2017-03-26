// import './problems.html';
// import { Template } from 'meteor/templating';
// import { Session } from 'meteor/session';
// import {clientjs} from 'ClientJS';

// Template.problems.onCreated(function(){
// 	Meteor.subscribe("problemInfo");
// });

// Template.Item.events({
// 	'click .likeBtn': function(evt){
// 		var client = new ClientJS();
// 		var fingerprint = client.getFingerprint();
// 		console.log(fingerprint);
// 		var postID = $(evt.target).closest('a').data('id');
// 		Meteor.call('checkUserFP',fingerprint,postID,function(err,res){
// 			var alreadyLiked = res;
// 			if (!alreadyLiked){
// 				var numLikes = problemInfo.findOne({_id: postID},{likes:1});
// 				var actualLikes = numLikes.likes;
// 				actualLikes++;
// 				var likedFPs = problemInfo.findOne({_id: postID},{userLikedFP:1, _id:0});
// 				likedFPs = likedFPs.userLikedFP;
// 				likedFPs.push(fingerprint);
// 				problemInfo.update({_id: postID},{$set: {likes: actualLikes, userLikedFP: likedFPs} });
// 			}else{
// 				$(".alert-warning").css("visibility", "visible");
// 				$(".alert-warning").alert();
// 	            $(".alert-warning").fadeTo(1900, 500).slideUp(500, function(){
// 	            	$(".alert-warning").slideUp(500);
// 	        	});
// 			}
// 		});
// 		// Meteor.call('getUserIP', function(error, result){
// 		// 	if (error){
// 		// 		alert(error);
// 		// 	}else{
// 		// 		var userIP = result;
// 		// 		var postID = $(evt.target).closest('a').data('id');
// 		// 		Meteor.call('checkUserIP',userIP,postID, function(err,res){
// 		// 			var alreadyLiked = res;
// 		// 			if (!alreadyLiked){
// 		// 			var numLikes = problemInfo.findOne({_id: postID},{likes:1});
// 		// 			var actualLikes = numLikes.likes;
// 		// 			actualLikes++;
// 		// 			var likedIPs = problemInfo.findOne({_id: postID},{userLikedIP:1, _id:0});
// 		// 			likedIPs = likedIPs.userLikedIP;
// 		// 			likedIPs.push(userIP);
// 		// 			problemInfo.update({_id: postID},{$set: {likes: actualLikes, userLikedIP: likedIPs} });
// 		// 			}else{
// 		// 				$(".alert-warning").css("visibility", "visible");
// 		// 				$(".alert-warning").alert();
// 		// 	            $(".alert-warning").fadeTo(1900, 500).slideUp(500, function(){
// 		// 	            	$(".alert-warning").slideUp(500);
// 		// 	        	});
// 		// 			}
// 		// 		});
// 		// 	}
// 		// });
// 	}
// });