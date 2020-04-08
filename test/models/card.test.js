const Card = require('../../app/models/card');

describe('Card', () => {
  it('initialize card throws TypeError with Cannot initialize Card class message', () => {
    try {
      new Card(); // eslint-disable-line no-new
    } catch (error) {
      expect(error).toStrictEqual(new TypeError('Cannot initialize Card class'));
    }
  });
});
