import { Component, Prop, State, Listen } from '@stencil/core';
// import { EventEmitter } from 'events';
import { GAState } from '../utils/GAState';
import { GAModel } from '../utils/GAModel';
import { GATable } from '../utils/GAWebService';

@Component({
  tag: 'ga-main-view',
  styleUrl: 'main-view.css'
})
export class MainView {
  @Prop() side: String;
  @Prop() appState: GAState;
  @Prop() model: GAModel;

  @State() table: GATable;

  async componentWillLoad() { }

  render() {
    return [
      <div>
        <ga-form-component appState={this.appState} side={this.side} model={this.model}/>

        <ga-list-component appState={this.appState} model={this.model} side={this.side}/>
      </div>
    ];
  }

  get currentState() { return this.appState.store.getState() }
}