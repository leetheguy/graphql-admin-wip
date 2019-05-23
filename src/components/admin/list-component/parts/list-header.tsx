import { Component } from '@stencil/core';

@Component({
  tag: 'ga-list-header',
  styleUrl: '../list-component.css'
})
export class ListHeader {
  render() {
    return [
      <ion-row>
        <ion-col>
          1
        </ion-col>
        <ion-col>
          2
        </ion-col>
        <ion-col>
          3
        </ion-col>
      </ion-row>
    ];
  }
}
