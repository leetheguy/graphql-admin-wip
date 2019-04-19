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
  @State() leftModel: GQAModel;
  @State() rightModel: GQAModel;
  @State() content: any;

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
  async rightRowSelectionHandler(event: CustomEvent) {
    let model = this.models[0];
    _.each(model.table.fields, field => {
      if(field.inputType == 'table' && field.tableName == event.detail.table) {
        model.item[field.dataName] = event.detail.id;
      }
    });
    let index = this.models.length - 2;

    await this.appState.store.dispatch({type: 'update_model', index: index, model: model})
    this.updateModels();
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

  async componentWillLoad() {
    this.appState = new GQAAppState();
    this.navigation = new GQADataNav(this.appState);
    this.webService = this.currentState.webService;

    await this.webService.init();
    await this.navigation.buildDataFromUrl();
    this.navigation.rebuildUrl();

    window.onpopstate = async () => { 
      await this.appState.store.dispatch({type: 'pop_model'});
      this.updateModels();
    }

    this.updateModels();
  }

  updateModels() {
    this.models = _.takeRight(this.currentState.models, 2)
    this.leftModel = new GQAModel(this.appState, this.models[0].table);
    this.leftModel.item = this.models[0].item;
    this.leftModel.list = this.models[0].list;
    if(this.models[1]) {
      this.rightModel = new GQAModel(this.appState, this.models[1].table);
      this.rightModel.item = this.models[1].item;
      this.rightModel.list = this.models[1].list;
    }
    this.buildContent();
  }

  buildContent() {
    console.info('building content')
    this.content = null;
    this.content =
      <ion-grid>
        <ion-row>
          <ion-col>
            <gqa-form-component appState={this.appState} model={this.leftModel} side="left"/>
          </ion-col>
          {!!this.rightModel ? 
            <ion-col>
              <gqa-form-component appState={this.appState} model={this.rightModel} side="right"/>
            </ion-col>
          : ''}
        </ion-row>
        <ion-row>
          <ion-col>
            <gqa-list-component appState={this.appState} model={this.leftModel} side="left"/>
          </ion-col>
          {!!this.rightModel ? 
            <ion-col>
              <gqa-list-component appState={this.appState} model={this.rightModel} side="right"/>
            </ion-col>
          : ''}
        </ion-row>
      </ion-grid>
  }

  render() {
    return [
      <gqa-header/>,
      <ion-content>
        <ion-grid no-padding class="h-100">
          <ion-row class="h-100">
            <ion-col size="2" no-padding class="bg-dark-gray near-white h-100">
              <gqa-admin-menu/>
            </ion-col>
            <ion-col size="10">
              {this.content}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}
