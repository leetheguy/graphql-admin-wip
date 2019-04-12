import { Component } from '@stencil/core';
import _ from 'lodash';
import { GQAWebService } from './utils/GQAWebService';
import { GQADataNav } from './utils/GQANavigation';
import { GQAAppState } from './utils/GQAAppState';

@Component({
  tag: 'gqa-admin-page',
  styleUrl: 'admin-page.css'
})
export class AdminPage {
  appState: GQAAppState;
  webService: GQAWebService;
  navigation: GQADataNav;

  leftColumn = null;
  rightColumn = null;

  async componentWillLoad() {
    this.appState = new GQAAppState();
    this.webService = this.currentState.webService;

    await this.webService.init();
    this.navigation = new GQADataNav(this.appState);
    await this.navigation.buildDataFromUrl();
  }

  render() {
    this.navigation.rebuildUrl();

    // let content = 
    //   <ion-grid>
    //     <ion-row>
    //       {this.leftColumn}
    //       {this.rightColumn}
    //       {/* <gqa-list-component model={new GQAModel(this.service, table)} table={table} /> */}
    //       {/* <gqa-main-view foo={this.foo} onFooClicked={(event) => this.foo = event.detail}/> */}
    //     </ion-row>
    //   </ion-grid>

    let router = document.querySelector('ion-router');

    return [
      <gqa-header/>,
      <ion-content>
        <ion-grid no-padding>
          <ion-row>
            <ion-col size="2" class="bg-dark-gray near-white">
              <gqa-admin-menu/>
            </ion-col>
            {/* <ion-col size="10">
            </ion-col> */}
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}
