import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { DatabaseModule } from './data/database.module';

@Module({
  imports: [GameModule, DatabaseModule],
})
export class AppModule {}
