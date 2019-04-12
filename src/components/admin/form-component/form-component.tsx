import { Component, Prop, State } from '@stencil/core';
import { GQAAppState } from '../utils/GQAAppState';
import { GQAModel } from '../utils/GQAModel';
import { GQATable } from '../utils/GQAWebService';

import _ from 'lodash';
import moment from 'moment';
import Quill from 'quill'

@Component({
  tag: 'gqa-form-component',
  styleUrl: 'form-component.css'
})
export class FormComponent {
  @Prop() side: String;
  @Prop() appState: GQAAppState;

  @State() model: GQAModel;
  @State() table: GQATable;
  @State() data: any;
  @State() elements = [];
  @State() editing: boolean;
  @State() quill: Quill;

  async componentWillLoad() {
    this.model = this.side === 'left' ? this.currentState.leftModel : this.currentState.rightModel;
    this.table = this.model.table;
    if(this.model.item) {
      this.data = this.model.item
    } else {
      // this.data = this.model.getEmptyData();
      // this.appState.store.dispatch({
      //   type: 'set_left_model',
      //   model: this.data,
      //   id: null,
      // });
    }
    this.editing = !!this.data.id;

    this.elements = _(this.table.fields)
    .map(field => {field.order = !!field.order ? field.order : 1; return field})
    .orderBy('order')
    .map(field => {
      let fieldInput;
      let colSize = String(field.formColWidth || '');
      let element = null;

      if(field.formColWidth == -1) return null;

      switch(field.inputType) {
        case 'id':
          colSize = '1';
          fieldInput = <ion-input type="number" name={field.dataName} value={this.data[field.dataName]} readonly/>
          break;

        case 'number':
          fieldInput = <ion-input type="number" inputmode="numeric" autofocus={field.order == 0} name={field.dataName} value={this.data[field.dataName]}/>
          break;

        case 'table':
          let fieldId = this.model.item ? this.model.item[field.dataName].id : null;

          let route =
            window.location.origin +
            '/gqa-admin/' +
            this.table.dataName + '/' +
            (this.model.item && this.model.item.id ? this.model.item.id + '/' : '') +
            field.tableName + '/' + 
            (fieldId ? fieldId + '/' : '' );

          element = (this.side == 'left')
            ?
              (fieldId
                ?
                  [<ion-col size="6">
                    Current {field.singularName} ID: {fieldId}
                  </ion-col>,
                  <ion-col size="6">
                    <ion-button expand="block" onClick={() => window.location.href = route}>
                      Select {field.singularName}
                    </ion-button>
                  </ion-col>]
                :
                  <ion-col size="12">
                    <ion-button expand="block" onClick={() => window.location.href = route}>
                      Add {field.singularName}
                    </ion-button>
                  </ion-col>
              )
            :
              null
            ;
          break;

        case 'textarea':
          colSize = '12';
          fieldInput = <ion-textarea autofocus={field.order == 0} name={field.dataName} id="editor"></ion-textarea>;
          break;

        case 'select':
          fieldInput =
            <ion-select name={field.dataName} value="pounds">
              {_.map(field.selectOptions, option => <ion-select-option value={option}>{option}</ion-select-option>)}
            </ion-select>
          break;

        //TODO case 'image'

        case 'datetime-local':
          let date = moment.utc(this.data[field.dataName]).format('YYYY-MM-DD').toString();
          let time = moment.utc(this.data[field.dataName]).format('hh:mm:ss').toString();
          element = 
            <ion-col size={colSize}>
              <ion-row>
                <ion-col size="6" no-padding>
                  <ion-item>
                    <ion-label position="floating">{field.singularName + ' - Date'}</ion-label>
                    <ion-input type="date" inputmode="date" autofocus={field.order == 0} name={field.dataName} value={date} class="date-input"/>
                  </ion-item>
                </ion-col>
                <ion-col size="6" no-padding>
                  <ion-item>
                    <ion-label position="floating">{field.singularName + ' - Time'}</ion-label>
                    <ion-input type="time" inputmode="time" autofocus={field.order == 0} name={field.dataName} value={time} class="date-input"/>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-col>
          // element = <input id="foo" autofocus={field.order == 0} name={field.dataName}/>
        break;

        default:
          fieldInput =
            <ion-input 
              type="text" inputmode="text"
              autofocus={field.order == 0}
              name={field.dataName}
              value={this.data[field.dataName]}
              onIonChange={event => this.data[field.dataName] = event.detail.value}
              debounce={500}/>
      }

      if(fieldInput) element = element ||
        <ion-col size={colSize}>
          <ion-item>
            <ion-label position="floating">{field.singularName}</ion-label>
            {fieldInput}
          </ion-item>
        </ion-col>

      return element;
    }).value();
  }

  chooseFormComponent(field) {
    let fieldInput;

    switch(field.inputType) {
      case 'textarea':
        fieldInput = <ion-textarea autofocus={field.order == 0} name={field.dataName}></ion-textarea>;
        break;
      default:
        fieldInput = <ion-input type="text" inputmode="text" autofocus={field.order == 0} name={field.dataName} value={this.data[field.dataName]}/>;
    }
    return (
      <ion-col size-md={field.formColWidth}>
        <ion-item>
          <ion-label position="floating">{field.singularName}</ion-label>
          {fieldInput}
        </ion-item>
      </ion-col>
    )
  }

  componentDidLoad() {
    // let options = {
    //   theme: 'snow'
    // }

    // this.quill = new Quill('#editor', options);
  }

  formSubmitted(event) {
    event.preventDefault();
    if(this.data.id) {
      this.model.updateItem(this.data);
    } else {
      this.model.createItem(this.data);
    }
  }

  delete() {
    this.model.deleteItem(this.data);
  }

  render() {
    let buttonRow = this.editing
      ?
      <ion-row>
        <ion-col size="auto">
          <ion-button expand="block" color="danger" onClick={() => this.delete()}><ion-icon name="trash" slot="start"></ion-icon> Delete</ion-button>
        </ion-col>
        <ion-col>
          <ion-button expand="block" type="submit"><ion-icon name="save" slot="start"></ion-icon> Update</ion-button>
        </ion-col>
      </ion-row>
      :
      <ion-row>
        <ion-col>
          <ion-button expand="block" type="submit"><ion-icon name="save" slot="start"></ion-icon>Create</ion-button>
        </ion-col>
      </ion-row>
      ;

    return [
      <div>
        <form onSubmit={(event) => this.formSubmitted(event)}>
          <ion-grid class="ba br2 b--silver">
            <ion-row>
              {this.elements}
            </ion-row>
            {buttonRow}
          </ion-grid>
        </form>
      </div>
    ]
  }

  get currentState() { return this.appState.store.getState() }
}