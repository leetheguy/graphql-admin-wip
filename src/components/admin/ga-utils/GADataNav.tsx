//TODO URL should be passed in as a string through a prop.
//TODO This should not interfere with the actual URL.
import { GAWebService } from "./GAWebService";
import { GAModel } from './GAModel';
import { GAState } from './GAState';

import _ from 'lodash';

export class GADataNav {
  webService: GAWebService;
  appState: GAState;

  constructor(appState) {
    this.appState = appState;
    this.webService = this.currentState.webService;
  }

  async buildDataFromUrl() {
    let model: GAModel;
    let models: Array<GAModel> = [];
    let path = _(window.location.pathname).split('/').compact().drop().value();

    // This for loop is needed to maintain async.
    for(const part of path) {
      if(this.webService.getTableByName(part)) {
        model = new GAModel(this.appState, this.webService.getTableByName(part));
        await model.getListData();
        models.push(model);
      } else if(!!Number(part)) {
        await _.last(models).getItemData(Number(part));
      }
    }

    this.appState.store.dispatch({type: 'empty_models'});
    _.each(models, model => this.appState.store.dispatch({type: 'push_model', model: model}));
  }

  async resetPages(tableName: string, id = 0) {
    let model = new GAModel(this.appState, this.webService.getTableByName(tableName));
    await model.getListData();
    if(id) await model.getItemData(id);
    this.appState.store.dispatch({type: 'reset_model', model: model});
    return model;
  }

  async pushPage(tableName: string, id = 0) {
    let model = new GAModel(this.appState, this.webService.getTableByName(tableName));
    await model.getListData();
    if(id) await model.getItemData(id);
    this.appState.store.dispatch({type: 'push_model', model: model})
    return model;
  }

  popPage() {
    this.appState.store.dispatch({type: 'pop_model'})
  }

  rebuildUrl() {
    let model = this.currentState.models[0]
    let stateString = _(this.currentState.models)
    .map(model => {
      return model.table.dataName + (model.item.id ? '/' + model.item.id : '');
    })
    .join('/');
    history.pushState(null, model.table.singularName, '/admin/' + stateString + '/');
  }

  get currentState() { return this.appState.store.getState() }
}
