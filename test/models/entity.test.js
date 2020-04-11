const Entity = require('../../app/models/entity');

describe('Entity', () => {
  it('initialize entity throws TypeError with Cannot initialize Entity class message', () => {
    expect(() => {
      new Entity(); // eslint-disable-line no-new
    }).toThrowError(new TypeError('Cannot initialize Entity class'));
  });
});
