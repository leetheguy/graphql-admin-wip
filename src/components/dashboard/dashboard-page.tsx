import { Component } from '@stencil/core';

import _ from 'lodash';

@Component({
  tag: 'ga-dashboard-page',
  styleUrl: 'dashboard-page.css'
})
export class DashboardPage {
  render() {
    return [
      <ga-header/>,
      <ion-content>
        <ion-grid no-padding class="h-100">
          <ion-row class="h-100">
            <ion-col size="2" no-padding class="bg-dark-gray near-white h-100">
              <ga-admin-menu/>
            </ion-col>
            <ion-col size="10">
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ]
  }
}
