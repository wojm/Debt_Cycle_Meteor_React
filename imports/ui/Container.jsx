import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';


const style = {

};

class Container extends Component {


  moveCard(dragIndex, hoverIndex) {

    Meteor.call('tasks.updateOrder', dragIndex, hoverIndex);
  }

  renderCards() {

    const cards = this.state.cards;
    return cards.map((card, i) => (
      <Card
        key={card.id}
        index={i}
        id={card.id}
        moveCard={this.moveCard}
        >
        <Task
          task = {card}
          showPrivateButton = {true}
          />
      </Card>
    ));
  }

  getFilteredTasks() {
    if (this.props.hideCompleted) {
      return this.props.tasks.filter(task => !task.checked);
    } else {
      return this.props.tasks;
    }
  }

  renderTasks() {
    return this.getFilteredTasks().map((task, i) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Card
          key = { task._id }
          index ={ task.index }
          moveCard ={ this.moveCard.bind(this) }
          >
          <Task
            task ={ task }
            showPrivateButton ={ showPrivateButton }
            />
        </Card>
      );
    });
  }

  render() {

    return (
      <div style={style}>
        { this.renderTasks() }
      </div>
    );
  }
}

Container.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  hideCompleted: PropTypes.bool.isRequired,

}


export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { index: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),

  }
}, DragDropContext(HTML5Backend)(Container));
