var React = require('react'),
	Router = require('react-router'),
	ViewPageNav = require('../routes/PageNav');

var Header = React.createClass({
	render: function() {
		return (
			<div>
				<h2>Algomi</h2>
				<h5>Scissor Rock and Paper</h5>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />
				<ViewPageNav />
				<Router.RouteHandler/>
			</div>
		);
	}
});

var o = $({});

var PubSubService = {

    subscribe: function(){
	    //console.log("subscribe: "+ arguments[0]);
	    o.on.apply(o, arguments);
  	},

  	unsubscribe: function() {
    	o.off.apply(o, arguments);
  	},

  	publish: function() {
    	//console.log("publish: "+ arguments[0]);
    	o.trigger.apply(o, arguments);
  	}  

};
module.exports = PubSubService;

var routes = {
	ViewHome: require('../routes/Home'),
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.ViewHome}/>
		<Router.DefaultRoute handler={routes.ViewHome}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
