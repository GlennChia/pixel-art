import React, { Component } from 'react';
import classes from './Board.module.css';
import Cell from './Cell/Cell';

class Board extends Component {
  render() {
    const board = (
      this.props.board.map((pixelRow, index) => {
          return <div key={index} className={classes.BoardRow} style={{width: this.props.height, height: this.props.boxDimensions}}>
            {pixelRow.map((pixelColor, index2) => {
              return <Cell key={index2} color={pixelColor} boxDimensions={this.props.boxDimensions} />
            })}
          </div>
      })
    );

    return (
      <div className={classes.Board}>
        {board}
      </div>
    );
  }
}

export default Board;