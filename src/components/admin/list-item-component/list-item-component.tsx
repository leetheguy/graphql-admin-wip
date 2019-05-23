import { Component } from '@stencil/core';

@Component({
  tag: 'ga-list-item-component',
  styleUrl: 'list-item-component.css'
})
export class ListItemComponent {

  render() {
    return [
      <div>This is list item component.</div>
    ];
  }
}





