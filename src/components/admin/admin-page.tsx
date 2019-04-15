import { Component, Listen, State, Element } from '@stencil/core';

import { GQAWebService } from './utils/GQAWebService';
import { GQADataNav } from './utils/GQADataNav';
import { GQAAppState } from './utils/GQAAppState';
import { GQAModel } from './utils/GQAModel';

import _ from 'lodash';

@Component({
  tag: 'gqa-admin-page',
  styleUrl: 'admin-page.css'
})
export class AdminPage {
  @Element() el!: HTMLStencilElement;

  @State() models: Array<GQAModel>;
  @State() leftModel: Array<GQAModel>;
  @State() rightModel: Array<GQAModel>;

  @Listen('leftRowSelected')
  async leftRowSelectionHandler(event: CustomEvent) {
    await this.navigation.resetPages(event.detail.table, event.detail.id);
    this.navigation.rebuildUrl();
    this.updateModels();
  }

  @Listen('subTableSelected')
  async leftSubTableSelectionHandler(event: CustomEvent) {
    if(event.detail && event.detail.side == 'left' && this.models.length > 1) this.navigation.popPage();
    await this.navigation.pushPage(event.detail.table, event.detail.id);
    this.navigation.rebuildUrl();
    this.updateModels();
  }

  @Listen('rightSubTableSelected')
  async rightSubTableSelectionHandler(event: CustomEvent) {
    await this.navigation.pushPage(event.detail.table, event.detail.id);
    this.navigation.rebuildUrl();
    this.updateModels();
  }

  @Listen('rightRowSelected')
  rightRowSelectionHandler(event: CustomEvent) {
    console.info('right ', event)
    // console.info(event.detail, this.currentState.leftModel)
  }

  appState: GQAAppState;
  webService: GQAWebService;
  navigation: GQADataNav;

  leftColumn = null;
  rightColumn = null;

  async componentWillLoad() {
    this.appState = new GQAAppState();
    this.navigation = new GQADataNav(this.appState);
    this.webService = this.currentState.webService;

    await this.webService.init();
    await this.navigation.buildDataFromUrl();
    this.navigation.rebuildUrl();

    window.onpopstate = async () => { 
      await this.appState.store.dispatch({type: 'empty_models'});
      await this.navigation.buildDataFromUrl();
      this.updateModels();
    }

    this.updateModels();
  }

  updateModels() {
    this.models = _.takeRight(this.currentState.models, 2);
  }

  render() {
    this.leftColumn = <ion-col><gqa-main-view side="left" appState={this.appState} model={this.models[0]}/></ion-col>;
    this.rightColumn = !!this.models[1]
      ? <ion-col><gqa-main-view side="right" appState={this.appState} model={this.models[1]}/></ion-col>
      : null;

    let content = 
      <ion-grid>
        <ion-row>
          {this.leftColumn}
          {this.rightColumn}
          {/* <gqa-list-component model={new GQAModel(this.service, table)} table={table} /> */}
          {/* <gqa-main-view foo={this.foo} onFooClicked={(event) => this.foo = event.detail}/> */}
        </ion-row>
      </ion-grid>
    
    return [
      <gqa-header/>,
      <ion-content>
        <ion-grid no-padding class="h-100">
          <ion-row class="h-100">
            <ion-col size="2" class="bg-dark-gray near-white h-100">
              <gqa-admin-menu/>
            </ion-col>
            <ion-col size="10">
              {content}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}
