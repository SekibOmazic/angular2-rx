/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

import {Home} from './home/home';
import {Timeflies} from './timeflies/timeflies';
import {Tictactoe} from './tictactoe/tictactoe';

// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

@Component({
  selector: 'app'
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ RouterOutlet, RouterLink, coreDirectives, appDirectives ],
  template: `
    <md-toolbar layout="row" class="md-default-theme">
      <img src="angular-shield.png" alt="Angular2" height="60" width="60">
      <h1 class="md-toolbar-tools" layout-align-gt-sm="center">RxJs and Angular2</h1>
    </md-toolbar>
    <div layout="row" flex>
        <md-sidenav layout="column" class="md-sidenav-left md-whiteframe-z2 md-locked-open" md-component-id="left">
          <ul class="rxjs-menu">
            <li><a router-link="home" class="md-button md-default-theme"><span>Home</span></a></li>
            <li><a router-link="timeflies" class="md-button md-default-theme">Timeflies</a></li>
            <li><a router-link="tictactoe" class="md-button md-default-theme">Tic Tac Toe</a></li>
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
  { path: '/tictactoe', as: 'tictactoe', component: Tictactoe }
])
export class App {
  name: string;
  constructor(router: Router, browserLocation: BrowserLocation) {
    this.name = 'Angular 2';

    // we need to manually go to the correct uri until the router is fixed
    let uri = browserLocation.path();
    router.navigate(uri);
  }
}
