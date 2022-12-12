export enum GameStatus {
  PLAYING = 0,
  LOSS = 1,
  DRAW = 2,
  WIN = 3,
}

export enum Hand {
  ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
}

export const MAX_HANDS = 3;

export enum GameResult {
  DRAW = 0,
  USER_WIN = 1,
  USER_LOSS = 2,
}
