import React, { Component } from 'react';
import classes from './Board.module.css';
import Cell from './Cell/Cell';

class Board extends Component {
  render() {
    const board = (
      this.props.color.map((value, index) => {
          return <div key={index} className={classes.BoardRow} style={{width: this.props.height, height: this.props.boxDimensions}}>
            {value.map((value2, index2) => {
              return <Cell key={index2} color={value2} boxDimensions={this.props.boxDimensions} />
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