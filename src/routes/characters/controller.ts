import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  BadRequestException,
  Patch,
  Body,
  Delete,
  HttpCode,
  Post,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { CharactersService } from './service';
import { Character } from './dto/character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('characters')
@Controller()
export class CharactersController {
  constructor(private readonly service: CharactersService) {}

  @Get('characters')
  @ApiOperation({ summary: 'Get multiple characters by their IDs' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit for pagination',
    default: 1,
    maximum: 100,
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset for pagination',
    default: 0,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Characters retrieved successfully',
    type: [Character],
  })
  @ApiResponse({ status: 404, description: 'No characters found' })
  async getCharacters(@Query()  { limit, offset }: PaginationQueryDto): Promise<Character[]> {
    const characters = await this.service.getCharacters(limit, offset);

    if (characters.length === 0) {
      throw new NotFoundException('No characters found');
    }

    return characters;
  }

  @Get('character/:id')
  @ApiOperation({ summary: 'Get a single character by ID' })
  @ApiParam({ name: 'id', description: 'Character ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Character retrieved successfully',
    type: Character,
  })
  @ApiResponse({ status: 400, description: 'Invalid ID provided' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async getCharacter(@Param('id') id: number): Promise<Character> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const character = await this.service.getCharacter(id);

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }

  @Patch('character/:id')
  @ApiOperation({ summary: 'Update a character by ID' })
  @ApiParam({ name: 'id', description: 'Character ID', type: Number })
  @ApiBody({
    description: 'Character data to update',
    type: UpdateCharacterDto,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Character updated successfully',
    type: UpdateCharacterDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateCharacter(
    @Param('id') id: number,
    @Body() character: UpdateCharacterDto,
  ): Promise<UpdateCharacterDto> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID');
    }

    if (Object.keys(character).length === 0) {
      throw new BadRequestException('No data provided for update');
    }

    const updated = await this.service.updateCharacter(id, character);

    if (!updated) {
      throw new NotFoundException('Character not found');
    }

    return updated;
  }

  @Post('character')
  @ApiOperation({ summary: 'Create a new character' })
  @ApiResponse({
    status: 201,
    description: 'Character created successfully',
    type: CreateCharacterDto,
  })
  @ApiBody({
    description: 'Character data to create',
    type: CreateCharacterDto,
    required: true,
  })
  @ApiResponse({ status: 400, description: 'Invalid character data' })
  async createCharacter(
    @Body() character: CreateCharacterDto,
  ): Promise<Character> {
    const created = await this.service.createCharacter(character);

    if (!created) {
      throw new InternalServerErrorException(
        'Something went wrong while creating the character',
      );
    }

    return created;
  }

  @Delete('character/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a character by ID' })
  @ApiParam({ name: 'id', description: 'Character ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'Character deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID provided' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async deleteCharacter(@Param('id') id: number): Promise<void> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const deleted = await this.service.deleteCharacter(id);

    if (!deleted) {
      throw new NotFoundException('Character not found');
    }
  }
}
