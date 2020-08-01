import React from 'react';
import classes from './BuildControls.module.css';

const buildControls = (props) => (
    
    <div className={classes.BuildControls}>
        <button 
            className={classes.resetButton}
            onClick={props.resetPattern}>Reset</button>
        <button 
            className={classes.shuffleButton}
            onClick={props.shufflePattern}>Shuffle</button>
        <button 
            className={classes.randomButton}
            onClick={props.randomPattern}>Random</button>
    </div>
);

export default buildControls;