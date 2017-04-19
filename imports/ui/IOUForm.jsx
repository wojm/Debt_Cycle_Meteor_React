
// React
import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

// NPM Package
import DatePicker from "react-datepicker";


const styleHorizontalBar = {
  height : 30,
  margin : "20px 10px",
};


class IOUForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isRequest : false,
      isProvider : true,
    }
  }


  handleSubmit(event) {
    event.preventDefault();


    // Find the text field via the React ref
    const favor = ReactDOM.findDOMNode(this.refs.description).value.trim();
    const toWhom = ReactDOM.findDOMNode(this.refs.whom).value.trim();

    if (favor == "" || (toWhom == "" & !this.state.isRequest)) {
      return;
    }

    Meteor.call('tasks.insert', favor, toWhom, this.state.isProvider, this.state.isRequest);


    // Clear form
    ReactDOM.findDOMNode(this.refs.description).value = '';
    ReactDOM.findDOMNode(this.refs.whom).value = '';

  }

  toggleIsRequest(event) {
    event.preventDefault();

    this.setState({
      isRequest : !this.state.isRequest
    });
  }
  toggleIsProvider(event) {
    event.preventDefault();

    this.setState({
      isProvider : !this.state.isProvider
    });
  }

  render() {
    return (
      <div>
        { /* Form */
          this.props.currentUser ?

            <form onSubmit={this.handleSubmit.bind(this)} >
              <div style={styleHorizontalBar}>

                { /* Debt or Credit */}
                <button
                  onClick={this.toggleIsProvider.bind(this)}
                  style={{
                    height : "100%",
                    float : "right",
                    margin: "0px 0px 0px 10px",
                  } } >
                  {this.state.isProvider? "Provided" : "Received"}
                </button>

                { /* Description */ }
                <div style={{
                  overflow: "hidden",
                  height:"100%",
                  }}>
                  <input

                    type="text"
                    ref="description"
                    placeholder="Description"
                    style={{
                      height: "100%",
                      width:"100%"
                    }}
                    />
                </div>
              </div>


              <div style={styleHorizontalBar} >
                { /* Request or Completion */ }
                <button
                  onClick={this.toggleIsRequest.bind(this)}
                  style={ {
                    float:"left",
                    height:"100%",
                    width: this.state.isRequest? "100%" : "auto",
                  } }
                  >
                  {this.state.isRequest ? "Request" : "Completed" }
                </button>

                <div style={{
                  overflow: "hidden",
                  height:"100%",
                  padding:"0px 5px",
                  visibility: this.state.isRequest? "hidden" : "visible",
                  }}>
                  <input

                    type="text"
                    ref="whom"
                    placeholder="By Whom"
                    style={{
                      height: "100%",
                      width:"100%",
                      verticalAlign: "middle",

                    }}
                    />
                </div>
              </div>
              <button type="submit">Submit</button>

            </form>
          : ''
        }
      </div>
    );
  }

};

export default createContainer(() => {
  //Meteor.subscribe('tasks');
  // TODO is this necessary

  return {
    currentUser: Meteor.user(),

  };
}, IOUForm);
