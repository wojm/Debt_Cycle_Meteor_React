import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import { Tasks } from '../api/tasks.js';


import FBLogin from './FBLogin.jsx';
import Container from './Container.jsx';
import IOUForm from './IOUForm.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }


  render() {
    return (
      <div className="container">
        <header>
          <div>
            <h1>Todo List ({this.props.incompleteCount})</h1>

            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Tasks
            </label>

            <FBLogin />
          </div>

          { this.props.currentUser ?
            <IOUForm/> : ''
          }
        </header>

        <Container hideCompleted={this.state.hideCompleted}/>

      </div>
    );
  }
}

App.propTypes = {

  currentUser: PropTypes.object,
  hideCompleted: PropTypes.object

};

export default createContainer(() => {
  //Meteor.subscribe('tasks');
  // TODO is this necessary

  return {
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),

  };
}, App);
