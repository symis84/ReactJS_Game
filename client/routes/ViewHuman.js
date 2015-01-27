React = require('react');
var PubSubService = require('../scripts/index');

// On the following the ControllerHuman

var ControllerHuman = {
  
  	mixins: [PubSubService],

  	getInitialState: function() {
      return {list: ["Rock","Scissor","Paper"], user: "Human", shape_human:""};
  	},

  	runView: function(){
    	this.getInitialState();
      ViewHuman_this = this;
    	state_time = 1;

    	this.subscribe("time_countDown", function(e, msg) {
          if (msg.value == 0) {
            state_time = 0;
            console.log("last human shape: "+ViewHuman_this.state.shape_human);
            ViewHuman_this.publish("last_human_shape", [{event_name : 'shape' , value : ViewHuman_this.state.shape_human}] );
          }else if (msg.value == 3) {
            state_time = 1;
            ViewHuman_this.setState({ shape_human: "" });
          }
      });
  	},

    handleClick: function(i) {
      if (state_time == 1) {
        class_shape_chosen = this.state.list[i]+"_shape_chosen";
        this.setState({ shape_human: class_shape_chosen });
      };
      
    },

    componentDidMount: function() {
      this.runView();
    }

};

// On the following the ViewHuman

var ViewHuman = React.createClass({

	mixins: [ControllerHuman], 
	
	render: function() {

    var list = this.state.list.map((function(item,i) {
          return (
              <li key={i} className="col-md-4"><button className={item} onClick={this.handleClick.bind(this, i)}></button></li>
          );
        }).bind(this));
		
		return (
			  <div className="human_container"><div className="human_title">{this.state.user}</div><ul>{list}</ul><div className={this.state.shape_human}></div></div>
		);
	}
});

module.exports = ViewHuman;