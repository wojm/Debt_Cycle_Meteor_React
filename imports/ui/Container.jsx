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
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library',
      }, {
        id: 2,
        text: 'Make it generic enough',
      }, {
        id: 3,
        text: 'Write README',
      }, {
        id: 4,
        text: 'Create some examples',
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      }, {
        id: 6,
        text: '???',
      }, {
        id: 7,
        text: 'PROFIT',
      }],
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    console.log("Hover Index " + hoverIndex);
    console.log("Drag Index " + dragIndex);

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));


    const res = Meteor.call('tasks.getMaxIndex');

    console.log(this.props.tasks);
    Meteor.call('tasks.updateOrder', dragIndex, hoverIndex);


  }

  moveCard_(dragIndex, hoverIndex) {
    const { tasks } = this.props;
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

  renderTasks() {
    let filteredTasks = this.props.tasks;

    if (this.props.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }


    /*return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });*/
    return filteredTasks.map((task, i) => (
      <Card
        key={task._id}
        index={task.index}
        id={task._id}
        moveCard={this.moveCard}
        >
        <Task
          task = {task}
          showPrivateButton = {true}
          />
      </Card>
    ));
  }

  render() {

    return (
      <div style={style}>
        {this.renderTasks()}
      </div>
    );
  }
}

Container.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  hideCompleted: PropTypes.bool.isRequired

}


export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { index: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),

  }
}, DragDropContext(HTML5Backend)(Container));
