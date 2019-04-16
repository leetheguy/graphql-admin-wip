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
  @Prop() model: GQAModel;

  @State() table: GQATable;

  async componentWillLoad() { }

  render() {
    return [
      <div>
        <gqa-form-component appState={this.appState} side={this.side} model={this.model}/>

        <gqa-list-component appState={this.appState} model={this.model} side={this.side}/>
      </div>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}