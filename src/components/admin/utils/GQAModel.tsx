import { GQAWebService, GQATable } from "./GQAWebService";

import _ from 'lodash';
import { GQAAppState } from './GQAAppState';

export class GQAModel {
  appState: GQAAppState;
  webService: GQAWebService;
  table: GQATable;

  list: any = null;
  item: any = {};

  constructor(appState: GQAAppState, table: GQATable) {
    this.appState = appState;
    this.webService = this.currentState.webService;
    this.table = table;
    this.item = this.getEmptyData();
  }

  async getListData() {
    await this.webService.runListQuery(this.table)
    .then(result => this.list = result.data.data[this.table.dataName])
    .catch(error => console.error(error));
    return this.list;
  }

  getEmptyData() {
    let empty = {};
    _.each(this.table.fields, field => {
      empty[field.dataName] = field.inputType == 'table'
      ? '{ id: null }'
      : null;
    });
    _.unset(empty, 'id');
    return empty
  }

  async getItemData(id: any) {
    await this.webService.runItemQuery(this.table, id)
    .then(result =>
      this.item = result.data.data[this.table.dataName].length > 0
      ? result.data.data[this.table.dataName][0]
      : this.item
    )
    .catch(error => console.error(error));
    return this.item;
  }

  async createItem(data: any) {
    await this.webService.runInsertMutation(this.table, data)
    .then(result => this.item = result.data.data[this.table.dataName][0])
    .catch(error => console.error(error));
    return this.item;
  }

  async updateItem(data: any) {
    await this.webService.runUpdateMutation(this.table, data)
    .then(result => null)
    .catch(error => console.error(error));
    return this.item;
  }

  async deleteItem(data: any) {
    await this.webService.runDeleteMutation(this.table, data)
    .then(result => null)
    .catch(error => console.error(error));
    return this.item;
  }

  get currentState() { return this.appState.store.getState() }
}