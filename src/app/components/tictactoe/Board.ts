/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import { Component, View, NgFor, Observable, EventEmitter } from 'angular2/angular2';

import { Tile } from './tile';

@Component({
  selector: 'board',
  properties: {
    board: 'board'
  },
  events: ['select']
})
@View({
  directives: [NgFor, Tile],
  template:`
    <div class="board">
      <div *ng-for="#row of board; #x=index" class="row">
        <div *ng-for="#tile of row; #y=index">
          <tile [model]="tile"
                (^click)="play(x, y)">
          </tile>
        </div>
      </div>
    </div>
  `
})
export class Board {
  select: Observable;

  constructor() {
    this.select = new EventEmitter();
  }

  play(x,y) {
    // emit select event
    this.select.next({x, y});
  }

}
