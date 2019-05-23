import { Component } from '@stencil/core';

@Component({
  tag: 'ga-error-view',
  styleUrl: 'error-view.css'
})
export class ErrorView {

  render() {
    return [
      <h1>DERP!</h1>
    ]
  }

}
