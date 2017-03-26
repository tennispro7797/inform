FlowRouter.route('/home',{
	action:function(){
		FlowLayout.render("layout",{content: "home"})
	}
});

FlowRouter.route('/',{
	action:function(){
		FlowLayout.render("layout",{content: "landing"})
	}
});


FlowRouter.route('/problems',{
	action:function(){
		FlowLayout.render("layout",{content: "problems"})
	}
});