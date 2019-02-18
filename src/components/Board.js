import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Row from './Row';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      curPlayer: 1,
      board: []
    }
  }

  render() {
    return (
      <Table bordered>
        <thead></thead>
        <tbody>
          {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play.bind(this)}></Row>))}
        </tbody>
      </Table>
    )
  }

  componentWillMount() {
    const board = [...Array(this.props.rows).keys()].map(i => Array(this.props.cols).fill(0));
    this.setState({ board });
  }

  play(columnIndex) {
    const board = this.state.board;
    for (let i = this.props.rows - 1; i >= 0; i--) {
      if (!board[i][columnIndex]) {
        board[i][columnIndex] = this.state.curPlayer;
        this.togglePlayer();
        break;
      }
    }
    this.setState({ board });
  }

  togglePlayer() {
    if (this.state.curPlayer === this.state.player1) {
      return this.setState({ curPlayer: this.state.player2 });
    }
    this.setState({ curPlayer: this.state.player1 });
  }
}

Board.defaultProps = {
  cols: 7,
  rows: 6
};

export default Board;
