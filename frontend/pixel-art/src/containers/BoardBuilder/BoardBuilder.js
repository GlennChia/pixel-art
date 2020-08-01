import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './BoardBuilder.module.css';
import Board from '../../components/Board/Board';
import BuildControls from '../../components/Board/BuildControls/BuildControls';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';


const DEFAULTCOLOR = '#F6F8FA';
const COLORRANGE = [ '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA' ];
const DEFAULTBOARD = Array(3).fill(Array(3).fill(DEFAULTCOLOR));
const MINCELLS = 1;
const MAXCELLS = 25;

class BoardBuilder extends Component {

    state = {
        color: DEFAULTBOARD,
        loading: false
    }
    
    generateRandomNumber(min, max)  {
        return Math.floor(Math.random() * (max - min) + min);
    }

    shufflePatternHandler = () => {
        this.setState({loading: !this.state.loading})
        axios.get('/utility/shuffle/')
            .then(response => {
                this.setState({color: response.data, loading: !this.state.loading})
        });
    }

    resetPatternHandler = () => {
        this.setState({color: DEFAULTBOARD});
    }

    randomPatternHandler = () => {
        const BOARDSIZE = this.generateRandomNumber(MINCELLS, MAXCELLS);
        let randomBoard = new Array(BOARDSIZE);
        var i;
        var j;
        for (i = 0; i < BOARDSIZE; i++) {
            let randomRow = new Array(BOARDSIZE);
            for (j = 0; j < BOARDSIZE; j++) {
                const RANDOMSEED = this.generateRandomNumber(0, COLORRANGE.length);
                const RANDOMCOLOR = COLORRANGE[RANDOMSEED];
                randomRow[j] = RANDOMCOLOR;
            }
            randomBoard[i] = randomRow
        } 

        this.setState({color: randomBoard});
    }

    render () {
        const WIDTH = 600
        const HEIGHT = 500
        let boxDimensions =  HEIGHT/this.state.color[0].length;

        let displayBoard = null;

        if (this.state.loading) {
            displayBoard = <Spinner />;
        } else {
            displayBoard = <Board color={this.state.color} boxDimensions={boxDimensions} height={HEIGHT}/>
        }

        return (
            <Aux>
                <div style={{width: WIDTH, height: HEIGHT}} className={classes.Posts}>
                    <BuildControls
                        shufflePattern={this.shufflePatternHandler}
                        resetPattern={this.resetPatternHandler}
                        randomPattern={this.randomPatternHandler}/>
                    {displayBoard}
                </div>
            </Aux>
        );
    }
}

export default BoardBuilder;