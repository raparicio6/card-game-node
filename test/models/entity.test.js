const Entity = require('../../app/models/entity');

describe('Entity', () => {
  it('initialize entity throws TypeError with Cannot initialize Entity class message', () => {
    try {
      new Entity(); // eslint-disable-line no-new
    } catch (error) {
      expect(error).toStrictEqual(new TypeError('Cannot initialize Entity class'));
    }
  });
});
