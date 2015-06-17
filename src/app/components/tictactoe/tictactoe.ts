/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View, NgIf } from 'angular2/angular2';

import { Board } from './board';
import { Game }  from './game_service';

let styles = require('./tictactoe.css');


@Component({
  selector: 'tictactoe',
  appInjector: [ Game ]
})
@View({
  directives: [NgIf, Board],
  template:`
    <style>${styles}</style>
    <h1>Tic Tac Toe</h1>
    <h2 *ng-if="winner">{{winner}} won!</h2>
    <h2 *ng-if="draw">draw</h2>
    <button (click)="reset()">reset</button>
    <board [board]="game.board" (select)="selected($event)"></board>
  `
})
export class Tictactoe {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  get winner() {
    return this.game.winner;
  }

  get draw() {
    return this.game.draw;
  }

  reset() {
    this.game = new this.game.constructor();
  }

  // select event listener (see markup above)
  selected(coord) {
    this.game.play(coord.x, coord.y);
  }
}
