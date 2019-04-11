import { Component, Prop, State, Listen } from '@stencil/core';
// import { EventEmitter } from 'events';
import { GQAAppState } from '../utils/GQAAppState';
import { GQAModel } from '../utils/GQAModel';
import { GQATable } from '../utils/GQAWebService';

@Component({
  tag: 'gqa-main-view',
  styleUrl: 'main-view.css'
})
export class MainView {
  @Prop() side: String;
  @Prop() appState: GQAAppState;
  @State() model: GQAModel;
  @State() table: GQATable;

  @Listen('rightRowSelected')
  rowSelectionHandler(event: CustomEvent) {
    // console.info(event.detail, this.currentState.leftModel)
  }

  async componentWillLoad() {
    if(this.side == 'left') {
      this.model = this.currentState.leftModel;
      if(this.currentState.leftId) await this.model.getItemData(this.currentState.leftId);
    } else {
      this.model = this.currentState.rightModel;
      if(this.currentState.rightId) await this.model.getItemData(this.currentState.rightId);
    }
  }

  render() {
    return [
      <div>
        <h2>
          { this.model.item && this.model.item.id ? 'Edit' : 'New' } {this.model.table.singularName}
        </h2>
        <gqa-form-component appState={this.appState} side={this.side}/>

        <h2>
          {this.side == 'left'
            ? this.model.table.pluralName + ' List'
            : 'Select ' + this.model.table.singularName}
        </h2>
        <gqa-list-component appState={this.appState} side={this.side}/>
      </div>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}