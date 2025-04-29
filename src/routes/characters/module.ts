import { Module } from '@nestjs/common';
import { CharactersService } from './service';
import { CharactersController } from './controller';
import { DatabaseModule } from 'src/modules/database/module';

@Module({
  providers: [CharactersService],
  imports: [DatabaseModule],
  controllers: [CharactersController],
})
export class CharactersModule {}
