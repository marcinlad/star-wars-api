import { CharactersService } from './service';
import { mock } from 'vitest-mock-extended';
import { DatabaseService } from '../../modules/database/service';

const mocks = {
  database: mock<DatabaseService>(),
};

describe('CharacterService', () => {
  const characterService = new CharactersService(mocks.database);

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacter', () => {
    it('should return character if found', async () => {
      const id = 1;
      const character = { id, name: 'John Doe' };

      mocks.database.query.mockResolvedValue({
        rows: [character],
      } as any);

      const result = await characterService.getCharacter(id);

      expect(result).toEqual(character);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        [id],
      );
    });

    it('should return null if character not found', async () => {
      const id = 1;

      mocks.database.query.mockResolvedValue({
        rows: [],
      } as any);

      const result = await characterService.getCharacter(id);

      expect(result).toBeNull();

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        [id],
      );
    });
  });

  describe('getCharacters', () => {
    it('should return an empty array if nothing found', async () => {
      mocks.database.query.mockResolvedValue({
        rows: [],
      } as any);

      const result = await characterService.getCharacters(10, 0);

      expect(result).toEqual([]);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        [10, 0],
      );
    });

    it('should return characters if found', async () => {
      const characters = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];

      mocks.database.query.mockResolvedValue({
        rows: characters,
      } as any);

      const result = await characterService.getCharacters(10, 0);

      expect(result).toEqual(characters);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        [10, 0],
      );
    });
  });

  describe('updateCharacter', () => {
    it('should update character', async () => {
      const id = 1;
      const character = { name: 'John Doe' };
      const updatedCharacter = { id, ...character };

      mocks.database.query.mockResolvedValue({
        rows: [updatedCharacter],
      } as any);

      const result = await characterService.updateCharacter(id, character);

      expect(result).toEqual(updatedCharacter);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE'),
        [...Object.values(character), id],
      );
    });

    it('should return null if character not found', async () => {
      const id = 1;
      const character = { name: 'John Doe' };

      mocks.database.query.mockResolvedValue({
        rows: [],
      } as any);

      const result = await characterService.updateCharacter(id, character);

      expect(result).toBeNull();

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE'),
        [...Object.values(character), id],
      );
    });
  });

  describe('createCharacter', () => {
    it('should create character', async () => {
      const character = { name: 'John Doe' } as any;
      const createdCharacter = { id: 1, ...character };

      mocks.database.query.mockResolvedValue({
        rows: [createdCharacter],
      } as any);

      const result = await characterService.createCharacter(character);

      expect(result).toEqual(createdCharacter);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT'),
        Object.values(character),
      );
    });

    it('should return null if character not created', async () => {
      const character = { name: 'John Doe' } as any;

      mocks.database.query.mockResolvedValue({
        rows: [],
      } as any);

      const result = await characterService.createCharacter(character);

      expect(result).toBeNull();

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT'),
        Object.values(character),
      );
    });
  });

  describe('deleteCharacter', () => {
    it('should delete character', async () => {
      const id = 1;

      mocks.database.query.mockResolvedValue({
        rows: [{ id }],
      } as any);

      const result = await characterService.deleteCharacter(id);

      expect(result).toBe(true);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('DELETE'),
        [id],
      );
    });

    it('should return false if character not found', async () => {
      const id = 1;

      mocks.database.query.mockResolvedValue({
        rows: [],
      } as any);

      const result = await characterService.deleteCharacter(id);

      expect(result).toBe(false);

      expect(mocks.database.query).toHaveBeenCalledWith(
        expect.stringContaining('DELETE'),
        [id],
      );
    });
  });
});
