/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import { Component, View, NgFor, EventEmitter } from 'angular2/angular2';

@Component({
  selector: 'board',
  properties: ['board'],
  events: ['select']
})
@View({
  directives: [ NgFor ],
  template:`
    <div class="board">
      <div *ng-for="#row of board; #x=index" class="row">
        <div *ng-for="#tile of row; #y=index">
          <div class="tile"
               [class.x]="tile=='x'"
               [class.o]="tile=='o'"
               (^click)="play(x, y)">
          </div>
        </div>
      </div>
    </div>
  `
})
export class Board {
  select: EventEmitter;

  constructor() {
    this.select = new EventEmitter();
  }

  play(x,y) {
    // emit select event
    this.select.next({x, y});
  }

}
