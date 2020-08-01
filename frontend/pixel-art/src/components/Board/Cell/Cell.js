import React, { Component } from 'react';
import classes from './Cell.module.css';

class Cell extends Component {
  render() {
    return (
      <button 
        className={classes.Cell}
        style={{
          backgroundColor: this.props.color,
          width: this.props.boxDimensions,
          height: this.props.boxDimensions}} />
    );
  }
}

export default Cell;