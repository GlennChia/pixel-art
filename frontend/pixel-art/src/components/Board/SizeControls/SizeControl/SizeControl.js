import React from 'react';
import classes from './SizeControl.module.css';

const sizeControl = (props) => (
    <button className={classes.Button} onClick={props.sizeChange}>
        <img className={classes.Image} src={props.image} alt={props.alt}/>
    </button>
);

export default sizeControl;