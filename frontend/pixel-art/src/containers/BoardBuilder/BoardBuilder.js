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
import SketchPickerCustom from '../../components/Board/SketchPickerCustom/SketchPickerCustom';

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
        board: DEFAULTBOARD,
        loading: false,
        selectedColor: '#FFFFFF',
    }
    
    generateRandomNumber(min, max)  {
        return Math.floor(Math.random() * (max - min) + min);
    }

    shufflePatternHandler = () => {
        this.setState({loading: !this.state.loading});
        axios.get('/utility/shuffle/')
            .then(response => {
                this.setState({board: response.data, loading: !this.state.loading})
        }).catch(error => {
            this.setState({loading: false});
        });
    }

    resetPatternHandler = () => {
        this.setState({board: DEFAULTBOARD});
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

        this.setState({board: randomBoard});
    }

    sizeHandler = (type) => {
        let updatedBoard;
        switch (type) {
            case ('expandTopLeft'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.board, DEFAULTCOLOR, 'top');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'left');
                break;
            case ('expandTopRight'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.board, DEFAULTCOLOR, 'top');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'right');
                break;
            case ('expandBotRight'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.board, DEFAULTCOLOR, 'bottom');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'right');
                break;
            case ('expandBotLeft'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.board, DEFAULTCOLOR, 'bottom');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'left');
                break;
            case ('expandAll'):
                updatedBoard = sizeHelpers.addUniformRow(this.state.board, DEFAULTCOLOR, 'top');
                updatedBoard = sizeHelpers.addUniformRow(updatedBoard, DEFAULTCOLOR, 'bottom');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'left');
                updatedBoard = sizeHelpers.addUniformColumn(updatedBoard, DEFAULTCOLOR, 'right');
                break;
            case ('shrinkTopLeft'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.board, 'top');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'left');
                break;
            case ('shrinkTopRight'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.board, 'top');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'right');
                break;
            case ('shrinkBotRight'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.board, 'bottom');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'right');
                break;
            case ('shrinkBotLeft'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.board, 'bottom');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'left');
                break;
            case ('shrinkAll'):
                updatedBoard = sizeHelpers.removeUniformRow(this.state.board, 'top');
                updatedBoard = sizeHelpers.removeUniformRow(updatedBoard, 'bottom');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'left');
                updatedBoard = sizeHelpers.removeUniformColumn(updatedBoard, 'right');
                break;
            default:
                console.log('invalid placement');
        }
        this.setState({board: updatedBoard});
    }

    handleChangeComplete = (color) => {
        this.setState({ selectedColor: color.hex });
      };

    render () {
        const WIDTH = 800;
        const HEIGHT = 500;
        let disableShrink = false;
        let boxDimensions =  HEIGHT/this.state.board[0].length;

        disableShrink = this.state.board.length === 1;

        let displayBoard = null;

        if (this.state.loading) {
            displayBoard = <Spinner />;
        } else {
            displayBoard = <Board board={this.state.board} boxDimensions={boxDimensions} height={HEIGHT}/>;
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
                    <div style={{width: '200px'}}>
                        <SketchPickerCustom handleChangeComplete={this.handleChangeComplete} selectedColor={this.state.selectedColor}/>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default withErrorHandler(BoardBuilder, axios);