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

  @Listen('navTo')
  async navToHandler(event: CustomEvent) {
    await this.navigation.resetPages(event.detail.table);
    this.navigation.rebuildUrl();
    this.updateModels();
  }

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
  }

  @Listen('modelUpdated')
  async modelUpdatedHandler(event: CustomEvent) {
    let side = event.detail.side;
    let model = event.detail.model;
    let index = this.models.length - (side == 'left' && this.models.length == 2 ? 2 :  1);

    this.appState.store.dispatch({type: 'update_model', index: index, model: model})

    // _.each(this.currentState.models, model => model.getListData());
    // await this.navigation.buildDataFromUrl();

    this.updateModels();
  }

  @Listen('formSubmittedEvent')
  async formSubmittedHandler(event: CustomEvent) {
    // _.each(this.currentState.models, model => model.getListData());
    await this.navigation.buildDataFromUrl();

    this.updateModels();
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
    console.info('updating models')
    this.models = (_(this.currentState.models)
      .takeRight(2)
      .value() as any);
  }

  render() {
    this.leftColumn = <ion-col><gqa-main-view side="left" appState={this.appState} model={this.models[0]}/></ion-col>;
    this.rightColumn = !!this.models[1]
      ? <ion-col><gqa-main-view side="right" appState={this.appState} model={this.models[1]}/></ion-col>
      : null;

    let content = 
      <ion-grid>
        <ion-row>
          <ion-col>
            <gqa-form-component appState={this.appState} model={this.models[0]} side="left"/>
          </ion-col>
          {!!this.models[1] ? 
            <ion-col>
              <gqa-form-component appState={this.appState} model={this.models[1]} side="right"/>
            </ion-col>
          : ''}
        </ion-row>
        <ion-row>
          <ion-col>
            <gqa-list-component appState={this.appState} model={this.models[0]} side="left"/>
          </ion-col>
          {!!this.models[1] ? 
            <ion-col>
              <gqa-list-component appState={this.appState} model={this.models[1]} side="right"/>
            </ion-col>
          : ''}
        </ion-row>
      </ion-grid>
    
    return [
      <gqa-header/>,
      <ion-content>
        <ion-grid no-padding class="h-100">
          <ion-row class="h-100">
            <ion-col size="2" no-padding class="bg-dark-gray near-white h-100">
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
