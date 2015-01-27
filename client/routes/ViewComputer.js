React = require('react');
var PubSubService = require('../scripts/index');

// On the following the ControllerComputer

var ControllerComputer = {
  
  	mixins: [PubSubService],

  	getInitialState: function() {
      return {user: "Computer", shape_computer:""};
  	},

  	runView: function(){
    	this.getInitialState();
      ViewComputer_this = this;

      this.subscribe("time_countDown", function(e, msg) {
          if (msg.value == 0) {
            computer_shapes = ['Rock', 'Scissor', 'Paper']; 
            computer_rand_shape = computer_shapes[Math.floor(Math.random() * computer_shapes.length)];
            class_shape_chosen = computer_rand_shape +"_shape_chosen";
            ViewComputer_this.setState({ shape_computer: class_shape_chosen });
            console.log("last computer shape: "+ViewComputer_this.state.shape_computer);
            ViewComputer_this.publish("last_computer_shape", [{event_name : 'shape' , value : ViewComputer_this.state.shape_computer}] );
          }else if (msg.value == 3) {
            ViewComputer_this.setState({ shape_computer: "" });
          }
      });
  	},

    componentDidMount: function() {
      this.runView();
    }

};

// On the following the ViewComputer

var ViewComputer = React.createClass({

	mixins: [ControllerComputer], 
	
	render: function() {
		
		return (
			  <div><div className="computer_title">{this.state.user}</div><div className={this.state.shape_computer}></div></div>
		);
	}
});

module.exports = ViewComputer;