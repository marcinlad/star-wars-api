import { UpdateCharacterDto } from 'src/dto/update-character.dto';

export class QueryBuilders {
  static getQuery(ids: number[]) {
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');

    return `SELECT * FROM characters WHERE id IN (${placeholders})`;
  }

  static updateQuery(character: UpdateCharacterDto) {
    const updates = Object.keys(character)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = Object.values(character);

    return `UPDATE characters SET ${updates} WHERE id = $${values.length + 1} RETURNING *`;
  }

  static createQuery(character: UpdateCharacterDto) {
    const keys = Object.keys(character);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(',');

    return `INSERT INTO characters (${keys.join(',')}) VALUES (${placeholders}) RETURNING *`;
  }
}
