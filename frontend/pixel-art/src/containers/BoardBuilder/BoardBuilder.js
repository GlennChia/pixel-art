import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './BoardBuilder.module.css';
import Board from '../../components/Board/Board';
import BuildControls from '../../components/Board/BuildControls/BuildControls';
import SizeControls from '../../components/Board/SizeControls/SizeControls';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import sizeHelpers from '../../helpers/sizeHelpers';

const DEFAULTCOLOR = '#F6F8FA';
const COLORRANGE = [ '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA' ];
const MINCELLS = 1;
const MAXCELLS = 25;

function constructDefaultBoard (size) {
    let defaultBoard = new Array(size);
    for (var i = 0; i < size; i++) {
        defaultBoard[i] = Array(size).fill(DEFAULTCOLOR);
    }
    return defaultBoard;
}

const DEFAULTBOARD = constructDefaultBoard(3);

class BoardBuilder extends Component {

    state = {
        color: DEFAULTBOARD,
        loading: false
    }
    
    generateRandomNumber(min, max)  {
        return Math.floor(Math.random() * (max - min) + min);
    }

    shufflePatternHandler = () => {
        this.setState({loading: !this.state.loading});
        axios.get('/utility/shuffle/')
            .then(response => {
                this.setState({color: response.data, loading: !this.state.loading})
        }).catch(error => {
            this.setState({loading: false});
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
            randomBoard[i] = randomRow;
        }

        this.setState({color: randomBoard});
    }

    sizeHandler = (type) => {
        let updatedBoard;
        switch (type) {
            case ('expandTopLeft'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.color, DEFAULTCOLOR, 'top');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'left');
                break;
            case ('expandTopRight'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.color, DEFAULTCOLOR, 'top');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'right');
                break;
            case ('expandBotRight'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.color, DEFAULTCOLOR, 'bottom');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'right');
                break;
            case ('expandBotLeft'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.color, DEFAULTCOLOR, 'bottom');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'left');
                break;
            case ('expandAll'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.color, DEFAULTCOLOR, 'top');
                updatedBoard = sizeHelpers.addUniformRow(updatedBoard, DEFAULTCOLOR, 'bottom');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'left');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'right');
                break;
            case ('shrinkTopLeft'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.color, 'top');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'left');
                break;
            case ('shrinkTopRight'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.color, 'top');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'right');
                break;
            case ('shrinkBotRight'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.color, 'bottom');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'right');
                break;
            case ('shrinkBotLeft'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.color, 'bottom');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'left');
                break;
            case ('shrinkAll'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.color, 'top');
                updatedBoard = sizeHelpers.removeUniformRow(updatedBoard, 'bottom');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'left');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'right');
                break;
            default:
                console.log('invalid placement');
        }
        this.setState({color: updatedBoard});
    }

    render () {
        const WIDTH = 600;
        const HEIGHT = 500;
        let disableShrink = false;
        let boxDimensions =  HEIGHT/this.state.color[0].length;

        disableShrink = this.state.color.length === 1;

        let displayBoard = null;

        if (this.state.loading) {
            displayBoard = <Spinner />;
        } else {
            displayBoard = <Board color={this.state.color} boxDimensions={boxDimensions} height={HEIGHT}/>;
        }

        return (
            <Aux>
                <div style={{width: WIDTH, height: HEIGHT}} className={classes.Posts}>
                    <BuildControls
                        shufflePattern={this.shufflePatternHandler}
                        resetPattern={this.resetPatternHandler}
                        randomPattern={this.randomPatternHandler}/>
                    <div>
                        {displayBoard}
                        <SizeControls sizeChange={this.sizeHandler} disableShrink={disableShrink}/>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default withErrorHandler(BoardBuilder, axios);