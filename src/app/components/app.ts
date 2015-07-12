/// <reference path="../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/annotations';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
import {formDirectives} from 'angular2/forms';
// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

/*
 * Components
 */
import {Home} from './home/home';
import {Timeflies} from './timeflies/timeflies';
import {Tictactoe} from './tictactoe/tictactoe';
import {Search} from './autosuggest/search_github';


/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [
    // Angular's core directives
    coreDirectives,

    // Angular's form directives
    formDirectives,

    // Angular's router
    routerDirectives,

    // Our collection of directives from /directives
    appDirectives
  ],
  template: `
    <md-toolbar layout="row" class="md-default-theme">
      <img src="angular-shield.png" alt="Angular2" height="60" width="60">
      <h1 class="md-toolbar-tools" layout-align-gt-sm="center">RxJs and Angular2</h1>
    </md-toolbar>
    <div layout="row" flex>
        <md-sidenav layout="column" class="md-sidenav-left md-whiteframe-z2 md-locked-open" md-component-id="left">
          <ul class="rxjs-menu">
            <li><a [router-link]=" ['/home'] "      class="md-button md-default-theme"><span>Home</span></a></li>
            <li><a [router-link]=" ['/timeflies'] " class="md-button md-default-theme">Timeflies</a></li>
            <li><a [router-link]=" ['/tictactoe'] " class="md-button md-default-theme">Tic Tac Toe</a></li>
            <li><a [router-link]=" ['/search'] "    class="md-button md-default-theme">Search Github</a></li>
          </ul>
        </md-sidenav>
        <div layout="column" flex id="content">
            <md-content layout="column" flex class="md-padding">
              <router-outlet></router-outlet>
            </md-content>
        </div>
    </div>
  `
})
@RouteConfig([
  { path: '/',          as: 'home',      component: Home },
  { path: '/timeflies', as: 'timeflies', component: Timeflies },
  { path: '/tictactoe', as: 'tictactoe', component: Tictactoe },
  { path: '/search',    as: 'search',    component: Search }
])
export class App {
  name: string;
  constructor() {
    this.name = 'angular 2';
  }
}
