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
          <ion-route url="/" component="ga-dashboard" />
          <ion-route url="admin/" component="ga-dashboard" />
          <ion-route url="admin/:anything" component="graphql-admin" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
