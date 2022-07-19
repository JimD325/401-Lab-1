const { db } = require('../src/models/db');

describe('models', () => {
  beforeEach(async () => {
    await db.sync();
  });

  it('has a User model', () => {});
});