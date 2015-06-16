/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import { Directive, View, ElementRef, NgFor, EventEmitter } from 'angular2/angular2';

// RxJs
import * as Rx from 'rx';

import { Github } from './github';

@Directive({
  selector: 'input[type=text][autosuggest]',
  events: [ 'term' ],
  hostInjector: [ Github ]
})
export class Autosuggest {

  github: Github;
  term: EventEmitter;
  //keyups: Rx.Observable;

  constructor(elementRef: ElementRef, github: Github) {

    this.github = github;
    this.term = new EventEmitter();

    Rx.Observable.fromEvent(elementRef.domElement, 'keyup')
      .map(function (e) {
        return e.target.value; // Project the text from the input
      })
      .filter(function (text) {
        return text.length > 2; // Only if the text is longer than 2 characters
      })
      .debounce(250) // Pause for 250ms
      .distinctUntilChanged() // Only if the value has changed

      .flatMapLatest(term => this.github.repos(term)) // search github

      // get items property from response object
      .map(result => result.items)

      // here is the real action
      .subscribe(repos => {
        // extract repo names only
        var repositories = repos.map(repo => repo.name);
        console.log(repositories);

        // fire "term" event
        // the Search component is the listener
        this.term.next(repositories);
      })
  }

}
