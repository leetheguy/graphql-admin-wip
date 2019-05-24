import { Component } from '@stencil/core';

@Component({
  tag: 'ga-dashboard',
})
export class GADashboard {
  render() {
    return [
      <graphql-admin/>
    ]
  }
}