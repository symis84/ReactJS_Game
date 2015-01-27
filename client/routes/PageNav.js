React = require('react'),
Router = require('react-router');

var PageNav = React.createClass({

	handleClick: function(i) {},

	render: function() {
		return (
	
			<nav id="navBar" className="nav">
				<ul>
					<li id="home" ref="home" onClick={this.handleClick("1")} className="current"><Router.Link to="home">Home</Router.Link></li>
				</ul>
			</nav>
		);
	}
});

module.exports = PageNav;