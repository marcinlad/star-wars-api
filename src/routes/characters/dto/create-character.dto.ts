import { OmitType } from '@nestjs/swagger';
import { Character } from './character.dto';

export class CreateCharacterDto extends OmitType(Character, ['id']) {}
