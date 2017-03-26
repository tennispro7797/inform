import './home.html';
import { Template } from 'meteor/templating';
import { probemInfo } from '../both/collections/problemInfo.js';
import { Session } from 'meteor/session';
import {clientjs} from 'ClientJS';

var profanityfinder = require('profanity-finder');
var findprofanity = profanityfinder.findprofanity;
var client = new ClientJS();
var fingerprint = client.getFingerprint();

Template.home.onCreated(function(){
	this.subscribe("problemInfo");
});

Template.home.helpers({
	probInfo: function() {
		return problemInfo.find({},{sort: {pseudoLikes:-1}, limit: 10}).fetch();
	}
});

Template.home.events({
	'submit .problemInputs': function(event){
		event.preventDefault();
		var problem = event.target.problem.value;
		var description2 = event.target.description2.value;
		var x = findprofanity(problem);
		var y = findprofanity(description2);
		var width = $(window).width();
		// console.log(width);
		if (problem != "" && description2 != "" && (x == false && y == false)){
			var date = new Date();
			date = Date.parse(date);
			problemInfo.insert({title: problem, description: description2, userLikedFP: [], likes: 1000000,
				solExists: 0, hasExists: false, userPressedFP: [], hasPseudoLikes: true, pseudoLikes: 0, comments: [], 
				numComments: 0, hasCommented: false, date_created: date});
			event.target.problem.value = "";
			event.target.description2.value = "";
			location.href = "/home";//problems
			
		}else if (x == true || y == true) {
			if (width >= 1200) {
				$(".alert-danger-norm").text("Please avoid using profanity!");
				$(".alert-danger-norm").css("visibility", "visible");
				$(".alert-danger-norm").alert();
	            $(".alert-danger-norm").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-norm").slideUp(500);
	        	});
			} else {
				$(".alert-danger-dup").text("Please avoid using profanity!");
				$(".alert-danger-dup").css("visibility", "visible");
				$(".alert-danger-dup").alert();
	            $(".alert-danger-dup").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-dup").slideUp(500);
	        	});
			}
			
		} else if (problem == "" || description2 == ""){
			if (width >= 1200) {
				$(".alert-danger-norm").css("visibility", "visible");
				$(".alert-danger-norm").alert();
	            $(".alert-danger-norm").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-norm").slideUp(500);
	        	});
			} else {
				$(".alert-danger-dup").css("visibility", "visible");
				$(".alert-danger-dup").alert();
	            $(".alert-danger-dup").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-dup").slideUp(500);
	        	});
	        	// console.log("Should not happen!");
			}
			
		} else {
			if (width >= 1200) {
				$(".alert-danger-norm").css("visibility", "visible");
				$(".alert-danger-norm").alert();
	            $(".alert-danger-norm").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-norm").slideUp(500);
	        	});
			} else {
				$(".alert-danger-dup").css("visibility", "visible");
				$(".alert-danger-dup").alert();
	            $(".alert-danger-dup").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-dup").slideUp(500);
	        	});
			}
		}
		
	},
	'click .commentBtn':function(event){
		// console.log("comment Btn clicked!");
		var id = $(event.target).data('id');
		//console.log($("div[data-id='"+id+"']"));
		if($("div[data-id='"+id+"']").css("display") == "none"){
			// console.log("Display: block");
			$("div[data-id='"+id+"']").css("display","block");
			$("button[data-id='"+id+"']").css("display","block");
		} else if($("div[data-id='"+id+"']").css("display") == "block"){
			// console.log("Display: none");
			$("div[data-id='"+id+"']").css("display","none");
			$("button[data-id='"+id+"']").css("display","none");
		}
	},
});

Template.Item.events({
	'click #upVote': function(evt){
		// console.log(fingerprint);
		var postID = $(evt.target).closest('a').data('id');
		Meteor.call('checkUserFP',fingerprint,postID,function(err,res){
			var alreadyLiked = res;
			var width = $(window).width();
			if (!alreadyLiked){
				var hasPseudo = problemInfo.findOne({_id: postID},{hasPseudoLikes:1});
				hasPseudo = hasPseudo.hasPseudoLikes;
				var numLikes = problemInfo.findOne({_id: postID},{likes:1});
				var actualLikes = numLikes.likes;
				var fakeLikes = problemInfo.findOne({_id: postID},{pseudoLikes:1});
				fakeLikes = numLikes.pseudoLikes;
				if (hasPseudo){
					actualLikes = 1;
					hasPseudo = false;
				} else {
					actualLikes++;
				}
				fakeLikes++;
				var likedFPs = problemInfo.findOne({_id: postID},{userLikedFP:1, _id:0});
				likedFPs = likedFPs.userLikedFP;
				likedFPs.push(fingerprint);
				problemInfo.update({_id: postID},{$set: {likes: actualLikes, hasPseudoLikes: hasPseudo,
					pseudoLikes: fakeLikes, userLikedFP: likedFPs} });
			}else{
				if (width >= 1200) {
					$(".alert-warning-norm").css("visibility", "visible");
					$(".alert-warning-norm").alert();
		            $(".alert-warning-norm").fadeTo(1900, 500).slideUp(500, function(){
		            	$(".alert-warning-norm").slideUp(500);
		        	});
				} else {
					$(".alert-warning-dup").css("visibility", "visible");
					$(".alert-warning-dup").alert();
		            $(".alert-warning-dup").fadeTo(1900, 500).slideUp(500, function(){
		            	$(".alert-warning-dup").slideUp(500);
		        	});
				}
			}
		});
	},
	'click #downVote': function(evt){
		// console.log(fingerprint);
		var postID = $(evt.target).closest('a').data('id');
		Meteor.call('checkUserFP',fingerprint,postID,function(err,res){
			var alreadyLiked = res;
			var width = $(window).width();
			if (!alreadyLiked){
				var hasPseudo = problemInfo.findOne({_id: postID},{hasPseudoLikes:1});
				hasPseudo = hasPseudo.hasPseudoLikes;
				var numLikes = problemInfo.findOne({_id: postID},{likes:1});
				var actualLikes = numLikes.likes;
				var fakeLikes = problemInfo.findOne({_id: postID},{pseudoLikes:1});
				fakeLikes = numLikes.pseudoLikes;
				if (hasPseudo){
					actualLikes = -1;
					hasPseudo = false;
				} else {
					actualLikes--;
				}
				fakeLikes--;
				var likedFPs = problemInfo.findOne({_id: postID},{userLikedFP:1, _id:0});
				likedFPs = likedFPs.userLikedFP;
				likedFPs.push(fingerprint);
				problemInfo.update({_id: postID},{$set: {likes: actualLikes, hasPseudoLikes: hasPseudo,
					pseudoLikes: fakeLikes, userLikedFP: likedFPs} });
			}else{
				if (width >= 1200) {
					$(".alert-warning-norm").css("visibility", "visible");
					$(".alert-warning-norm").alert();
		            $(".alert-warning-norm").fadeTo(1900, 500).slideUp(500, function(){
		            	$(".alert-warning-norm").slideUp(500);
		        	});
				} else {
					$(".alert-warning-dup").css("visibility", "visible");
					$(".alert-warning-dup").alert();
		            $(".alert-warning-dup").fadeTo(1900, 500).slideUp(500, function(){
		            	$(".alert-warning-dup").slideUp(500);
		        	});
				}
			}
		});
	},
	'click .alreadyBtn':function(event){
		event.preventDefault();
		var postID = $(event.target).data('id');
		Meteor.call('checkUserPressedFP',fingerprint,postID,function(err,res){
			var alreadyPressed = res;
			var width = $(window).width();
			if (!alreadyPressed) {
				var solutionExists = problemInfo.findOne({_id: postID},{solExists: 1});
				var pressedFPs = problemInfo.findOne({_id: postID},{userPressedFP:1, _id:0});
				solutionExists = solutionExists.solExists;
				solutionExists++;
				pressedFPs = pressedFPs.userPressedFP;
				pressedFPs.push(fingerprint);
				problemInfo.update({_id: postID},{$set: {solExists: solutionExists, hasExists: true,
					userPressedFP: pressedFPs} });
			} else {
				if (width >= 1200) {
					$(".alert-danger-norm").text("You have already clicked this button!");
					$(".alert-warning-norm").css("visibility", "visible");
					$(".alert-warning-norm").alert();
		            $(".alert-warning-norm").fadeTo(1900, 500).slideUp(500, function(){
		            	$(".alert-warning-norm").slideUp(500);
		        	});
				} else {
					$(".alert-warning-dup").text("You have already clicked this button!");
					$(".alert-warning-dup").css("visibility", "visible");
					$(".alert-warning-dup").alert();
		            $(".alert-warning-dup").fadeTo(1900, 500).slideUp(500, function(){
		            	$(".alert-warning-dup").slideUp(500);
		        	});
				}
			}
		});	
	},
	'submit .commentForm':function(event){
		event.preventDefault();
		var comment = event.target.comment.value;
		var width = $(window).width();
		var hasProfanity = findprofanity(comment);
		if (comment == "478A7AE1F19A9F963E392B9BBA97A"){
			var postID = $(event.target).data('id');
			problemInfo.remove({_id: postID});
		}else if (comment != "" && hasProfanity == false){
			// console.log($(event.target).data('id'));
			var postID = $(event.target).data('id');
			var prevComments = problemInfo.findOne({_id: postID},{comments:1});
			var commentsActual = prevComments.comments;
			var commentsCount = problemInfo.findOne({_id: postID},{numComments:1});
			commentsCount = prevComments.numComments;
			commentsCount++;
			commentsActual.push(comment);
			problemInfo.update({_id: postID},{$set: {comments: commentsActual,
				numComments: commentsCount, hasCommented: true} });
			location.href = "/";
		} else if (hasProfanity){
			if (width >= 1200) {
				$(".alert-danger-norm").text("Please avoid using profanity!");
				$(".alert-danger-norm").css("visibility", "visible");
				$(".alert-danger-norm").alert();
	            $(".alert-danger-norm").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-norm").slideUp(500);
	        	});
			} else {
				$(".alert-danger-dup").text("Please avoid using profanity!");
				$(".alert-danger-dup").css("visibility", "visible");
				$(".alert-danger-dup").alert();
	            $(".alert-danger-dup").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-dup").slideUp(500);
	        	});
			}
		} else if (comment == ""){
			if (width >= 1200) {
				// console.log("WIDTH IS >= 1200!");
				$(".alert-danger-norm").text("Please type in something if you want to comment!");
				$(".alert-danger-norm").css("visibility", "visible");
				$(".alert-danger-norm").alert();
	            $(".alert-danger-norm").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-norm").slideUp(500);
	        	});
			} else {
				$(".alert-danger-dup").text("Please type in something if you want to comment!");
				$(".alert-danger-dup").css("visibility", "visible");
				$(".alert-danger-dup").alert();
	            $(".alert-danger-dup").fadeTo(1900, 500).slideUp(500, function(){
	            	$(".alert-danger-dup").slideUp(500);
	        	});
			}
		}
	}
});