export class Game {

  board: Array<any>;
  player: string;
  winner: string;
  gameover: boolean;

  constructor() {
    this.reset();
  }

  play(x,y) {
    if (!this.gameover && this.board[x][y] ==='') {
      this.board[x][y] = this.player;
      this.player = this.player == 'x' ? 'o': 'x';
      this.check();
    }
  }

  reset() {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.player='x';
    this.winner='';
    this.gameover = false;
  }

  check() {
    var allWinningLists = [
      this.board,                   // rows
      this._zip(this.board),        // columns
      this._diagonals(this.board)   // diagonals
    ];

    this.winner = allWinningLists
      .reduce((allLists, lists) => allLists.concat(lists), [])
      .reduce(this.getWinnerFromList, '');

    if (this._checkDraw(this.board) || this.winner !=='') {
      this.gameover = true;
    }
  }

  get done() {
    return this.gameover;
  }

  getWinnerFromList(winner, list) {
    if (winner) return winner;
    if (list.every(s => s == 'o')) return 'o';
    if (list.every(s => s == 'x')) return 'x';
    return '';
  }

  _zip(arrays) {
    return arrays[0].map(function(_, i) {
      return arrays.map(function(array) { return array[i] } )
    });
  }

  _checkDraw(rows) {
    return rows.every(row => row.every(item => item != ''));
  }

  get draw() {
    return this.gameover && this.winner === ''
  }

  _diagonals(rows) {
    return [
      rows.map((row, index) => row[index]), // left to right diagonal
      rows.map((row, index) => row[row.length - 1 - index]) // right to left diagonal
    ];
  }
}
