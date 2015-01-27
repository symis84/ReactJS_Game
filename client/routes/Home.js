React = require('react');
var Model = require('../scripts/index');
ViewHuman = require('./ViewHuman');
ViewComputer = require('./ViewComputer');
ViewScore = require('./ViewScore');


// On the following the ViewHome

var ViewHome = React.createClass({

	componentDidMount: function() {
    	
  	},
	
	render: function() {
	
		return (
      <div class="row">
        <div className="col-md-4 human"><ViewHuman /></div>
        <div className="col-md-4 score"><ViewScore /></div>
        <div className="col-md-4 computer"><ViewComputer /></div>
      </div>
		);
	}
});

module.exports = ViewHome;