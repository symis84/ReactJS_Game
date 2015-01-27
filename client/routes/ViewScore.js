React = require('react');
var PubSubService = require('../scripts/index');

// On the following the ControllerScore

var ControllerScore = {
  
  	mixins: [PubSubService],

  	getInitialState: function() {
      return {user: "Score", time_countdown:"", result_class:"", count_win_human:0,count_tie:0,count_win_computer:0}
  	},
    
  	runView: function(){
    	this.getInitialState();

      last_human_shape = "";
      last_computer_shape = "";

      this.subscribe("last_human_shape", function(e, msg) {   last_human_shape = msg.value   });
      this.subscribe("last_computer_shape", function(e, msg) {   last_computer_shape = msg.value   });
  	},

    handleClickStart: function(i){
      this.setState({ result_class: "" });
      this.setState({ time_countdown: 3 });
      this.publish("time_countDown", [{event_name : 'count' , value : 3}] );
      ViewScore_this = this;
      
      function setCount(count){
        ViewScore_this.setState({ time_countdown: count });
        ViewScore_this.publish("time_countDown", [{event_name : 'count' , value : count}] );
      }

      function endCountdown() {
        console.log("result human shape: "+last_human_shape);
        console.log("result computer shape: "+last_computer_shape);

        Result = "";
        Result_class = "";

        switch ( last_human_shape ) {
          case "Rock_shape_chosen":
              if ( last_computer_shape == "Rock_shape_chosen" ) {
                Result = "T";
                Result_class = "result_tie";
              }else if ( last_computer_shape == "Paper_shape_chosen") {
                Result = "C";
                Result_class = "result_paper_rock";
              }else if ( last_computer_shape == "Scissor_shape_chosen") {
                Result = "H";
                Result_class = "result_rock_scissor";
              };
              break;
          case "Paper_shape_chosen":
              if ( last_computer_shape == "Rock_shape_chosen" ) {
                Result = "H";
                Result_class = "result_paper_rock";
              }else if ( last_computer_shape == "Paper_shape_chosen") {
                Result = "T";
                Result_class = "result_tie";
              }else if ( last_computer_shape == "Scissor_shape_chosen") {
                Result = "C";
                Result_class = "result_scissor_paper";
              };
              break;
          case "Scissor_shape_chosen":
              if ( last_computer_shape == "Rock_shape_chosen" ) {
                Result = "C";
                Result_class = "result_rock_scissor";
              }else if ( last_computer_shape == "Paper_shape_chosen") {
                Result = "H";
                Result_class = "result_scissor_paper";
              }else if ( last_computer_shape == "Scissor_shape_chosen") {
                Result = "T";
                Result_class = "result_tie";
              };
              break;
        };

        switch ( Result ) {
          case "H":
            ViewScore_this.setState({ time_countdown: "" });
            ViewScore_this.setState({ result_class: Result_class });
            console.log("h "+ViewScore_this.state.count_win_human);
            ViewScore_this.setState({ count_win_human:  ViewScore_this.state.count_win_human + 1  });
            break;
          case "C":
            ViewScore_this.setState({ time_countdown: "" });
            ViewScore_this.setState({ result_class: Result_class });
            console.log("c "+ViewScore_this.state.count_win_computer);
            ViewScore_this.setState({ count_win_computer:  ViewScore_this.state.count_win_computer + 1  });
            break;
          case "T":
            ViewScore_this.setState({ time_countdown: "" });
            ViewScore_this.setState({ result_class: Result_class });
            console.log("t "+ViewScore_this.state.count_tie);
            ViewScore_this.setState({ count_tie:  ViewScore_this.state.count_tie + 1  });
            break;
        }

      };

      function handleTimer() {
        if(count === 0) {
          clearInterval(timer);
          endCountdown();
        } else {
          $('#count_num').html(count);
          count--;
          setCount(count);
        }
      };

      var count = 3;
      var timer = setInterval(function() { handleTimer(count); }, 1000);

    },

    componentDidMount: function() {
      this.runView();
    }

};

// On the following the ViewScore

var ViewScore = React.createClass({

	mixins: [ControllerScore], 
	
	render: function() {
		
		return (
      <div>
			  <div className="score_title">{this.state.user}</div>
          <div className="score_wins col-md-4"> 
            <div className="wins_title">Wins</div>
            <div className="wins_number">{this.state.count_win_human}</div>
          </div>
          <div className="score_ties col-md-4"> 
            <div className="ties_title">Ties</div>
            <div className="ties_number">{this.state.count_tie}</div>
          </div>
          <div className="score_wins col-md-4"> 
            <div className="wins_title">Wins</div>
            <div className="wins_number">{this.state.count_win_computer}</div>
          </div>
          <div className="round col-md-12"> 
            Result
          </div>
          <div className="time col-md-12"> 
            {this.state.time_countdown}
            <div className={this.state.result_class}></div>
          </div>
          <div className="restartButton col-md-12">
            <a className="btn" href='#' onClick={this.handleClickStart.bind(null, 1)}>Start/Restart</a>
          </div>
      </div>
		);
	}
});

module.exports = ViewScore;