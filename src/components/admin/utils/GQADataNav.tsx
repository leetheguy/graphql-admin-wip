import { GQAWebService, GQATable } from "./GQAWebService";
import { GQAModel } from './GQAModel';
import { GQAAppState } from './GQAAppState';

import _ from 'lodash';

export class GQADataNav {
  webService: GQAWebService;
  appState: GQAAppState;

  constructor(appState) {
    this.appState = appState;
    this.webService = this.currentState.webService;
  }

  async buildDataFromUrl() {
    let model: GQAModel;
    let models: Array<GQAModel> = [];
    let path = _(window.location.pathname).split('/').compact().drop().value();

    // This for loop is needed to maintain async.
    for(const part of path) {
      if(this.webService.getTableByName(part)) {
        model = new GQAModel(this.appState, this.webService.getTableByName(part));
        await model.getListData();
        models.push(model);
      } else if(!!Number(part)) {
        await _.last(models).getItemData(Number(part));
      }
    }

    _.each(models, model => this.appState.store.dispatch({type: 'push_model', model: model}));
  }

  async resetPages(tableName: string, id = 0) {
    let model = new GQAModel(this.appState, this.webService.getTableByName(tableName));
    if(id) await model.getItemData(id);
    this.appState.store.dispatch({type: 'reset_model', model: model});
    return model;
  }

  async pushPage(tableName: string, id = 0) {
    console.info(tableName)
    let model = new GQAModel(this.appState, this.webService.getTableByName(tableName));
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
    history.pushState(null, model.table.singularName, '/gqa-admin/' + stateString + '/');
  }

  get currentState() { return this.appState.store.getState() }
}
