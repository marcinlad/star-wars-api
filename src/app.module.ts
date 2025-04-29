import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CharactersModule } from './routes/characters/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/docs/',
      rootPath: `${__dirname}/../docs`,
    }),
    CharactersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
