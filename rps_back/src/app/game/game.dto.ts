import {
  IsDefined,
  IsEnum,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { GameStatus, Hand } from '../../constants/game';

export class StartNewGameRequest {
  @IsDefined()
  @MinLength(3)
  @MaxLength(32)
  userName: string;
}

export interface StartNewGameResponse {
  gameId: string;
}

export class PlayHandRequest {
  @IsDefined()
  @IsUUID('4')
  gameId: string;

  @IsDefined()
  @IsEnum(Hand)
  userHand: number;
}

export interface PlayHandResponse {
  gameId: string;
  userName: string;
  userHands: Hand[];
  computerHands: Hand[];
  gameStatus: GameStatus;
}
