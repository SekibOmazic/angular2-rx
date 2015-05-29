/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'tile',
  properties: {
    model: 'model'
  }
})
@View({
  template: `<div class="tile" [class.x]="isX" [class.o]="isO"></div>`
})
export class Tile {
  model: string;

  get isX() {
    return this.model == 'x';
  }

  get isO() {
    return this.model=='o';
  }
}
