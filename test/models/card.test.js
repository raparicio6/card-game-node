const Card = require('../../app/models/card');

describe('Card', () => {
  it('initialize card throws TypeError with Cannot initialize Card class message', () => {
    expect(() => {
      new Card(); // eslint-disable-line no-new
    }).toThrowError(new TypeError('Cannot initialize Card class'));
  });
});
