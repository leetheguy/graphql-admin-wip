import 'source-map-support/register';
import { Component } from '@stencil/core';

// TODO routes should be generated dynamically so pages don't need reloading
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="ga-dashboard-page" />
          <ion-route url="ga-admin/" component="ga-dashboard-page" />
          <ion-route url="ga-admin/:anything" component="ga-admin-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
