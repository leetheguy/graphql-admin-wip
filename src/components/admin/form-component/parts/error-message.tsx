import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ga-error-message',
})
export class FormComponent {
  @Prop() error: any;

  return() {
    return [
      <div class="ba br4 b--silver bg-washed-red pa2 red">
        <h4>An error occured while calling the database:<br/><br/></h4>
        {this.error}
      </div>
    ]
  }
}
