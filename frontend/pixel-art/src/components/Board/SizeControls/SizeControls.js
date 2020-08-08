import React from 'react';
import classes from './SizeControls.module.css';
import expandTopLeft from '../../../assets/expand_top_left_corner.PNG';
import expandTopRight from '../../../assets/expand_top_right_corner.PNG';
import expandBotRight from '../../../assets/expand_bot_right_corner.PNG';
import expandBotLeft from '../../../assets/expand_bot_left_corner.PNG';
import expandAll from '../../../assets/expand_all.PNG';
import shrinkTopLeft from '../../../assets/shrink_top_left_corner.PNG';
import shrinkTopRight from '../../../assets/shrink_top_right_corner.PNG';
import shrinkBotRight from '../../../assets/shrink_bot_right_corner.PNG';
import shrinkBotLeft from '../../../assets/shrink_bot_left_corner.PNG';
import shrinkAll from '../../../assets/shrink_all.PNG';
import SizeControl from './SizeControl/SizeControl';

const controls = [
    { label: 'expandTopLeft', image: expandTopLeft },
    { label: 'expandTopRight', image: expandTopRight },
    { label: 'expandBotRight', image: expandBotRight },
    { label: 'expandBotLeft', image: expandBotLeft },
    { label: 'expandAll', image: expandAll },
    { label: 'shrinkAll', image: shrinkAll },
    { label: 'shrinkTopLeft', image: shrinkTopLeft },
    { label: 'shrinkTopRight', image: shrinkTopRight },
    { label: 'shrinkBotRight', image: shrinkBotRight },
    { label: 'shrinkBotLeft', image: shrinkBotLeft }
];

const sizeControls = (props) => (
    <div className={classes.SizeControls}>
        {controls.map( ctrl=> (
            <SizeControl 
                key={ctrl.label} 
                alt={ctrl.type}
                image={ctrl.image}
                sizeChange={() => props.sizeChange(ctrl.label)}
            />
        ))}
    </div>
);

export default sizeControls;