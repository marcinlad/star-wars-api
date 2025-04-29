import { OmitType, PartialType } from '@nestjs/swagger';
import { Character } from './character.dto';

export class UpdateCharacterDto extends PartialType(
  OmitType(Character, ['id']),
) {}
