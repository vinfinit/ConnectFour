import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { tensor4d, conv2d } from '@tensorflow/tfjs';
import Row from './Row';
import config from '../config/connectFour';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      curPlayer: 1,
      board: [],
      terminateState: true,
      winner: 0
    }
  }

  render() {
    return (
      <section>
        <div className={`navbar player_${this.state.winner}`}>
          <button onClick={this.initGame.bind(this)} className="btn btn-light">New game</button>
          {this.state.winner ? <div>Winner!</div> : null}
        </div>
        <Table bordered>
          <thead></thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play.bind(this)}></Row>))}
          </tbody>
        </Table>
      </section>
    )
  }

  componentWillMount() {
    this.initGame();
  }

  initGame() {
    const board = [...Array(this.props.rows).keys()].map(i => Array(this.props.cols).fill(0));
    this.setState({
      board,
      terminateState: false,
      curPlayer: 1,
      winner: 0
     });
  }

  async play(columnIndex) {
    if (this.state.terminateState) return;

    const board = this.state.board,
      curPlayer = this.state.curPlayer;
    for (let i = this.props.rows - 1; i >= 0; i--) {
      if (!board[i][columnIndex]) {
        board[i][columnIndex] = this.state.curPlayer;
        this.setState({ board });
        let isWinner = await this.checkWinner();
        if (isWinner) {
          this.setState({
            winner: curPlayer,
            terminateState: true
          });
          return;
        }
        this.togglePlayer();
        return;
      }
    }
  }

  togglePlayer() {
    if (this.state.curPlayer === this.state.player1) {
      return this.setState({ curPlayer: this.state.player2 });
    }
    this.setState({ curPlayer: this.state.player1 });
  }

  async checkWinner() {
    let board = this.state.board.map(row => row.map(i => i === this.state.curPlayer ? 1 : 0));
    board = tensor4d(board.flat(2), [1, config.rows, config.cols, 1]);

    const checkList = config.rules.map(async rule => {
      const filter = rule.filter;
      let output = conv2d(board, filter, 1, 'valid').flatten();
      output = await output.data();
      return Math.max(...output) === rule.total;
    });
    return await Promise.all(checkList).then(results => Math.max(...results))
  }
}

Board.defaultProps = {
  cols: config.cols,
  rows: config.rows
};

export default Board;
