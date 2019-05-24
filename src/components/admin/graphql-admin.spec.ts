import { AppHome } from './graphql-admin';

describe('app', () => {
  it('builds', () => {
    expect(new AppHome()).toBeTruthy();
  });
});
