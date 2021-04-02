import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstplayer: 1,
      secondplayer: 2,
      presentplayer: null,
      board: [],
      gameOver: false,
      displaymessage: ''
    };
    
    // Bind play function to App component
    this.play = this.play.bind(this);
  }
  
  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { row.push(null) }
      board.push(row);
    }
    
    this.setState({
      board,
      presentplayer: this.state.firstplayer,
      gameOver: false,
      displaymessage: ''
    });
  }
  
  togglePlayer() {
    return (this.state.presentplayer === this.state.firstplayer) ? this.state.secondplayer : this.state.firstplayer;
  }
  
  play(c) {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.presentplayer;
          break;
        }
      }

      // Check status of board
      let result = this.checkAll(board);
      if (result === this.state.firstplayer) {
        this.setState({ board, gameOver: true, displaymessage: 'Player 1 won the match!' });
      } else if (result === this.state.secondplayer) {
        this.setState({ board, gameOver: true, displaymessage: 'Player 2 won the match!' });
      } else if (result === 'draw') {
        this.setState({ board, gameOver: true, displaymessage: 'Draw game.' });
      } else {
        this.setState({ board, presentplayer: this.togglePlayer() });
      }
    } 
  }
  
  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
            return board[r][c];    
          }
        }
      }
    }
  }
  
  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDraw(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  checkAll(board) {
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }
  
  componentWillMount() {
    this.initBoard();
  }
  
  render() {
    return (
      <div>
        <div className="button" onClick={() => {this.initBoard()}}>New Game</div>
        <h3>Player 1 : <span class ="dot"></span> Player 2 : <span class ="dot1"></span></h3>
        <p className="message">{this.state.displaymessage}</p>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>
        
        
      </div>
    );
  }
}

// Row component
const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
    </tr>
  );
};

const Cell = ({ value, columnIndex, play }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }
    
  return (
    <td>
      <div className="cell" onClick={() => {play(columnIndex)}}>
        <div className={color}></div>
      </div>
    </td>
  );
};

//ReactDOM.render(<App />, document.getElementById('main'));

 
export default App;