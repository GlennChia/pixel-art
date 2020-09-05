import React from 'react';
import classes from './ColorControls.module.css';

const colorControls = (props) => (
    <div className={classes.ColorControls}>
        <p className={classes.Text}>Saved pallete</p>
        <div className={classes.Cells}>
            <button className={classes.Cell}/>
            <button className={classes.Add}>+</button>
        </div>
        <p className={classes.Text}>Pastel pallete</p>
        {
            props.pastelRange.length < 9 ?
            <div className={classes.Cells}>
                {props.pastelRange.map( color=> (
                    <button key={color} className={classes.Cell} style={{backgroundColor: color}}/>
                ))}
                <button className={classes.Add}>+</button>
            </div> : 
            <div className={classes.Cells}>
                {props.pastelRange.map( color=> (
                    <button key={color} className={classes.Cell} style={{backgroundColor: color}}/>
                ))}
            </div>
        }
    </div>
);
export default colorControls;