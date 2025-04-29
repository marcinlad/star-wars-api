import { Injectable } from '@nestjs/common';
import { Character } from './dto/character.dto';
import { DatabaseService } from '../../modules/database/service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { QueryBuilders } from './utils/query-builders';

@Injectable()
export class CharactersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCharacter(id: number): Promise<Character | null> {
    const query = "SELECT * FROM characters WHERE id = $1";
    const result = await this.databaseService.query<Character>(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  async getCharacters(limit: number, offset: number): Promise<Character[]> {
    const query = "SELECT * FROM characters LIMIT $1 OFFSET $2";
    const result = await this.databaseService.query<Character>(query, [limit, offset]);

    return result.rows;
  }

  async updateCharacter(
    id: number,
    character: UpdateCharacterDto,
  ): Promise<Character | null> {
    const query = QueryBuilders.updateQuery(character);
    const values = Object.values(character);
    const res = await this.databaseService.query<Character>(query, [
      ...values,
      id,
    ]);

    if (res.rows.length === 0) {
      return null;
    }

    return res.rows[0];
  }

  async createCharacter(
    character: CreateCharacterDto,
  ): Promise<Character | null> {
    const query = QueryBuilders.createQuery(character);
    const values = Object.values(character);
    const res = await this.databaseService.query<Character>(query, values);

    if (res.rows.length === 0) {
      console.error('Error creating character:', res);
      return null;
    }

    return res.rows[0];
  }

  async deleteCharacter(id: number): Promise<boolean> {
    const query = 'DELETE FROM characters WHERE id = $1 RETURNING *';
    const res = await this.databaseService.query<Character>(query, [id]);

    return res.rows.length > 0;
  }
}
