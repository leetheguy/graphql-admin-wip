import { Component, State, Prop, Event } from '@stencil/core';
import { GQAModel } from '../utils/GQAModel';
import { GQATable } from '../utils/GQAWebService';
import { GQAAppState } from '../utils/GQAAppState';

import _ from 'lodash';
import moment from 'moment';
import { EventEmitter } from 'events';

@Component({
  tag: 'gqa-list-component',
  styleUrl: 'list-component.css'
})
export class ListComponent {
  @Prop() side: String;
  @Prop() appState: GQAAppState;

  @Event() rightRowSelected: EventEmitter;

  @State() model: GQAModel;
  @State() table: GQATable;
  @State() data: any;
  @State() editing: boolean;
  @State() list: Array<object> = [];
  @State() item: object = null;
    

  async componentWillLoad() {
    this.model = this.side == 'left' ? this.currentState.leftModel : this.currentState.rightModel;
    this.table = this.model.table;
    this.data = this.model.list;
  }

  getColSize(field): string {
    let colSize: any = field.listColWidth;
    colSize = ['textarea', 'table'].includes(field.inputType) ? -1 : colSize;
    colSize = ['id'].includes(field.inputType) ? 1 : colSize;
    colSize = !!colSize ? String(colSize) : '';
    return String(colSize);
  }

  navToRow(id) {
    let route =
      window.location.origin +
      '/gqa-admin/' +
      this.model.table.dataName + '/' +
      id + '/';
    window.location.href = route;
  }

  render() {
    let bodyRows = _.map(this.data, (row, index: number) => {
      let columns = _.map(this.table.fields, field => {
        let output = row[field.dataName];
        switch(field.inputType) {
          case 'datetime-local':
            output = moment.utc(output).fromNow();
            break;
          default:
          break
        }

        let colSize = this.getColSize(field)
        return colSize != '-1'
        ?
          <ion-col size={colSize}>
            {output}
          </ion-col>
        :
          null
        ;
      })
      let bgColor = index % 2 ? 'bg-lightest-blue' : '';

      let element =
        <ion-row class={bgColor + ' gqa-table-row'} onClick={() => {
          this.side == 'left'
          ? this.navToRow(row.id)
          : this.rightRowSelected.emit(({table: this.table, row: row.id} as any));
        }}>
          {columns}
        </ion-row>
      return element;
    })

    return [
      <ion-grid class="ba br2 b--silver">
        <ion-row class="bg-moon-gray">
          {_.map(this.table.fields, field  =>
            this.getColSize(field) != '-1' ?
              <ion-col size={this.getColSize(field)}>
                {field.singularName}
              </ion-col>
            : null
          )}
        </ion-row>
        {bodyRows}
      </ion-grid>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}