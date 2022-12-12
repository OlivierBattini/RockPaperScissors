import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Game } from '../data/game.model';
import { Hand, MAX_HANDS, GameResult, GameStatus } from '../../constants/game';

/**
 * Generates a hand for the computer (randomly or using algorithm if any)
 * @returns {Hand} Generated computer hand
 */
export function generateComputerHand(): Hand {
  return Math.floor(Math.random() * MAX_HANDS) as Hand;
}

/**
 * @param {Hand} userHand - Hand played by the user
 * @param {Hand} computerHand  - Hand played by the computer
 * @returns {GameResult} Returns result as GameResult
 */
export function getUserResult(userHand: Hand, computerHand: Hand): GameResult {
  return ((userHand - computerHand + MAX_HANDS) % MAX_HANDS) as GameResult;
}

@Injectable()
export class GameService {
  async createNewGame(userName: string): Promise<Game> {
    try {
      const newGame = await Game.create({
        id: uuidv4(),
        userName: userName,
        userHands: [],
        computerHands: [],
        gameStatus: GameStatus.PLAYING,
      });
      return newGame;
    } catch (error: any) {
      console.error(error);
    }
  }

  async playHand(gameId: string, userHand: Hand): Promise<Game> {
    // Check game exists and is currently playing
    const currentGame = await Game.findOne({
      where: {
        id: gameId,
        gameStatus: GameStatus.PLAYING,
      },
    });

    if (!(currentGame instanceof Game)) {
      return null;
    }

    // Computer plays
    const computerHand: Hand = generateComputerHand();

    // Update hands state
    currentGame.userHands = [...currentGame.userHands, userHand];
    currentGame.computerHands = [...currentGame.computerHands, computerHand];

    if (currentGame.userHands.length === MAX_HANDS) {
      // User played all hands : calculate score
      let userScore = 0;
      for (let h = 0; h < MAX_HANDS; h++) {
        const userResult: GameResult = getUserResult(userHand, computerHand);
        switch (userResult) {
          case GameResult.USER_WIN:
            userScore += 1;
            break;
          case GameResult.USER_LOSS:
            userScore += -1;
            break;
        }
      }

      // Update game status according to user score
      if (userScore > 0) {
        currentGame.gameStatus = GameStatus.WIN;
      } else if (userScore < 0) {
        currentGame.gameStatus = GameStatus.LOSS;
      } else {
        currentGame.gameStatus = GameStatus.DRAW;
      }
    }

    // Save and return
    const savedGame = await currentGame.save();
    return savedGame;
  }
}
