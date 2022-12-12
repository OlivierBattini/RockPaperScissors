import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ApiPrefix } from 'src/constants/api';
import { Game } from 'src/app/data/game.model';
import { HttpError } from '../errors/http.error';
import {
  PlayHandRequest,
  PlayHandResponse,
  StartNewGameRequest,
  StartNewGameResponse,
} from './game.dto';
import { GameService } from './game.service';

@Controller(ApiPrefix.GAME)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * Requests creation of a new game and returns game identifier (UUID)
   * @param {StartNewGameRequest} request - Request DTO validated using ClassValidatorPipe global nest pipe
   * @return {StartNewGameResponse} Response DTO
   */
  @Post('/new')
  @HttpCode(201)
  async createNewGame(
    @Body() request: StartNewGameRequest,
  ): Promise<StartNewGameResponse> {
    try {
      const newGame = await this.gameService.createNewGame(request.userName);
      if (newGame instanceof Game) {
        const response: StartNewGameResponse = {
          gameId: newGame.id,
        };
        return response;
      } else {
        HttpError.internalServerError('Could not create new game');
      }
    } catch (error: any) {
      console.error(error);
      HttpError.internalServerError('Unexpected error while creating new game');
    }
  }

  /**
   * Submits player selected "hand", randomly generates computer "hand" and returns game status / result
   * @param {PlayHandRequest} request - Request DTO validated using ClassValidatorPipe global nest pipe
   * @return {PlayHandResponse} Response DTO
   */
  @Post('/play')
  @HttpCode(200)
  async playHand(@Body() request: PlayHandRequest): Promise<PlayHandResponse> {
    try {
      const currentGame = await this.gameService.playHand(
        request.gameId,
        request.userHand,
      );
      if (currentGame instanceof Game) {
        const response: PlayHandResponse = {
          gameId: currentGame.id,
          userName: currentGame.userName,
          userHands: currentGame.userHands,
          computerHands: currentGame.computerHands,
          gameStatus: currentGame.gameStatus,
        };
        return response;
      } else {
        HttpError.badRequest('Could not find game with provided id');
      }
    } catch (error: any) {
      console.error(error);
      HttpError.internalServerError(
        'Unexpected error while submitting player hand',
      );
    }
  }
}
