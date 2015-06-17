type Triple = [string, string, string];
type Rows = [Triple, Triple, Triple];

export class Game {

  board: Rows = [['', '', ''], ['', '', ''], ['', '', '']];
  player = 'x';
  winner = '';
  gameover = false;

  play(x: number, y: number) {
    if (!this.gameover && this.board[x][y] ==='') {
      this.board[x][y] = this.player;
      this.player = this.player == 'x' ? 'o': 'x';
      this.check();
    }
  }

  check() {
    const allWinningLists = [].concat(
      this.board,             // rows
      zip(this.board),        // columns
      diagonals(this.board)   // diagonals
    );

    this.winner = allWinningLists.reduce(getWinnerFromList, '');

    if (checkDraw(this.board) || this.winner !=='') {
      this.gameover = true;
    }
  }

  get draw() {
    return this.gameover && this.winner === ''
  }

}

function getWinnerFromList(winner, list: Triple) {
  if (winner) return winner;
  if (list.every(s => s == 'o')) return 'o';
  if (list.every(s => s == 'x')) return 'x';
  return '';
}

function zip(arrays: Rows) {
  return arrays[0].map(function(_, i) {
    return arrays.map(function(array) { return array[i] } )
  });
}

function checkDraw(rows: Rows) {
  return rows.every(row => row.every(item => item != ''));
}

function diagonals(rows: Rows) {
  return [
    rows.map((row, index) => row[index]), // left to right diagonal
    rows.map((row, index) => row[row.length - 1 - index]) // right to left diagonal
  ];
}

