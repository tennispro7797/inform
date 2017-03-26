import { probemInfo } from '../both/collections/problemInfo.js';

Pages = new Meteor.Pagination(problemInfo, {
	itemTemplate: "Item",
	// route: "/page/",
	// router: "flow-router",
	routerTemplate: "home",
	routerLayout: "layout",
	perPage: 8,
	sort: {
	  likes: -1,
	},
	templateName: "home"
});