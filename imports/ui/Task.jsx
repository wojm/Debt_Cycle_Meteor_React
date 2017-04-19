import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

import classnames from 'classnames';



// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
      isRequest: this.props.task.isRequest,
      isProvider: this.props.task.isProvider,
    });

    var text =           (
      <span>
        <strong>
          {this.props.task.isRequest? "Requesting ": ""}
        </strong>
        <span>
          {this.props.task.favor}
        </span>
        <span>
          {this.props.task.isRequest? "":

            <span>
              <strong>
                {this.props.task.isProvider? " for " : " by "}
              </strong>
              {this.props.task.toWhom}
            </span>
          }
        </span>
      </span>);

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <input
        type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          {text}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
