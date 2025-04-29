import { QueryBuilders } from './query-builders';

describe('QueryBuilders', () => {
  describe('updateQuery', () => {
    it.each([
      [
        { name: 'John', age: 30 },
        'UPDATE characters SET name = $1, age = $2 WHERE id = $3 RETURNING *',
      ],
      [
        { name: 'Jane' },
        'UPDATE characters SET name = $1 WHERE id = $2 RETURNING *',
      ],
    ])(
      'should return the correct update query for character %j',
      (character, expected) => {
        expect(QueryBuilders.updateQuery(character)).toEqual(expected);
      },
    );
  });

  describe('createQuery', () => {
    it.each([
      [
        { name: 'John', age: 30 },
        'INSERT INTO characters (name,age) VALUES ($1,$2) RETURNING *',
      ],
      [
        { name: 'Jane' },
        'INSERT INTO characters (name) VALUES ($1) RETURNING *',
      ],
    ])(
      'should return the correct create query for character %j',
      (character, expected) => {
        expect(QueryBuilders.createQuery(character)).toEqual(expected);
      },
    );
  });
});
