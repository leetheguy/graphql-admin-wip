import { Component } from '@stencil/core';

@Component({
  tag: 'ga-dashboard',
})
export class GADashboard {
  render() {
    return [
    <ion-grid class="w-100">
      <ion-row class="h-100">
        <ion-col size="2" no-padding class="bg-dark-gray near-white h-100">
          <ga-admin-menu/>
        </ion-col>
        <ion-col size="10">
        </ion-col>
      </ion-row>
    </ion-grid>
    ]
  }
}