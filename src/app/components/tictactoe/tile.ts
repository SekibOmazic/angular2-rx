/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Rx
import * as Rx from 'rx';

// Angular 2
import {Component, View, ElementRef, NgFor} from 'angular2/angular2';

import {Game} from './game_service';


@Component({
  selector: 'tile',
  properties: {
    x: 'x',
    y: 'y',
    model: 'model'
  }
})
@View({
  template: `
    <div class="tile"
         [class.x]="isX"
         [class.o]="isO">
         <!-- (click)="choose(x,y)">  -->
    </div>
  `
})
export class Tile {
  el: any;
  game: Game;
  model: string;
  x: string;
  y: string;

  constructor(elementRef: ElementRef, game:Game) {
    this.el = elementRef.domElement;

    this.game = game;
    console.log('Tile constructor done');


    Rx.Observable.fromEvent(this.el, 'click')
      .subscribe(()=> {
        this.game.play(this.x, this.y)
      });
  }
/*
  choose(x,y) {
    //console.log('choose, before set model=', this.model);
    this.game.play(x,y);
    //console.log('choose, after set model=', this.model);
  }
*/
  get isX() {
    return this.model == 'x';
  }

  get isO() {
    return this.model=='o';
  }
}
