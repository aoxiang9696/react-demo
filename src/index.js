import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
  return (
    //  onClick={props.onClick},括号去掉了
    <button
      className='square'
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true

    }
  }
  renderSquare (i) {
    return (<Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />)
  }
  // ???this.setState哪来的
  handleClick (i) {
    // 创建squares数组的副本，元素组保持不变
    const squares = this.state.squares.slice()
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }
  render () {

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render () {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>
          <div></div>
          <ol></ol>
        </div>
      </div>
    )
  }
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let item of lines) {
    const [a, b, c] = item;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}
ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

