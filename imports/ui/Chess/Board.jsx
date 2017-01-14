import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
  renderSquare(x, y) {
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <Square black={black}>
        {piece}
      </Square>
    );
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        {this.renderSquare(0, 0)}
        {this.renderSquare(1, 0)}
        {this.renderSquare(2, 0)}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};
