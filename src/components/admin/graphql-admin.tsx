import { Component, Listen, State, Element, Prop } from '@stencil/core';

import { GAWebService } from './ga-utils/GAWebService';
import { GADataNav } from './ga-utils/GADataNav';
import { GAState } from './ga-utils/GAState';
import { GAModel } from './ga-utils/GAModel';

import _ from 'lodash';

@Component({
  tag: 'graphql-admin',
  styleUrl: 'graphql-admin.css'
})
export class AdminPage {
  @Prop() dataSource = 'https://captain-cecil.herokuapp.com/v1alpha1/graphql';

  @Element() el!: HTMLStencilElement;

  @State() models: Array<GAModel>;
  @State() leftModel: GAModel;
  @State() rightModel: GAModel;
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

    await GAState.appState.store.dispatch({type: 'update_model', index: index, model: model})
    this.updateModels();
  }

  @Listen('modelUpdated')
  async modelUpdatedHandler(event: CustomEvent) {
    let side = event.detail.side;
    let model = event.detail.model;
    let index = this.models.length - (side == 'left' && this.models.length == 2 ? 2 :  1);

    GAState.appState.store.dispatch({type: 'update_model', index: index, model: model})

    this.updateModels();
  }

  @Listen('formSubmittedEvent')
  async formSubmittedHandler(event: CustomEvent) {
    await this.navigation.buildDataFromUrl();

    this.updateModels();
  }

  webService: GAWebService;
  navigation: GADataNav;

  async componentWillLoad() {
    GAWebService.url = this.dataSource;
    GAState.appState = new GAState();

    this.navigation = new GADataNav();
    this.webService = GAState.currentState.webService;

    await this.webService.init();
    await this.navigation.buildDataFromUrl();
    this.navigation.rebuildUrl();

    window.onpopstate = async () => { 
      await GAState.appState.store.dispatch({type: 'pop_model'});
      this.updateModels();
    }

    this.updateModels();
  }

  updateModels() {
    this.models = _.takeRight(GAState.currentState.models, 2)
    this.leftModel = new GAModel(this.models[0].table);
    this.leftModel.item = this.models[0].item;
    this.leftModel.list = this.models[0].list;
    if(this.models[1]) {
      this.rightModel = new GAModel(this.models[1].table);
      this.rightModel.item = this.models[1].item;
      this.rightModel.list = this.models[1].list;
    }
    this.buildContent();
  }

  buildContent() {
    this.content = null;
    this.content =
      <ion-grid>
        <ion-row>
          <ion-col>
            <ga-form model={this.leftModel} side="left"/>
          </ion-col>
          {!!this.rightModel ? 
            <ion-col>
              <ga-form model={this.rightModel} side="right"/>
            </ion-col>
          : ''}
        </ion-row>
        <ion-row>
          <ion-col>
            <ga-list model={this.leftModel} side="left"/>
          </ion-col>
          {!!this.rightModel ? 
            <ion-col>
              <ga-list model={this.rightModel} side="right"/>
            </ion-col>
          : ''}
        </ion-row>
      </ion-grid>
  }

  render() {
    return [
      <ga-header/>,
      <ion-content>
        <ion-grid no-padding class="h-100">
          <ion-row class="h-100">
            <ion-col size="2" no-padding class="bg-dark-gray near-white h-100">
              <ga-admin-menu/>
            </ion-col>
            <ion-col size="10">
              {this.content}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
