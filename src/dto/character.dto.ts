import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Character {
  @ApiProperty({
    description: 'Unique identifier for the character',
    example: 1,
    required: false,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Name of the character',
    example: 'Luke Skywalker',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Episodes the character appeared in',
    example: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  })
  @IsArray()
  @ArrayNotEmpty()
  episodes: string[];

  @ApiProperty({ example: 'Tatooine', required: false })
  @IsOptional()
  @IsString()
  planet?: string;
}
