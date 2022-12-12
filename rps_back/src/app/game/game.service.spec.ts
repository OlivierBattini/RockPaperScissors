import { Hand, GameResult } from '../../constants/game';
import { getUserResult } from './game.service';

describe('User score calculation', () => {
  it('be GameResult.USER_WIN when playing PAPER against ROCK', () => {
    expect(getUserResult(Hand.PAPER, Hand.ROCK)).toBe(GameResult.USER_WIN);
  });

  it('be GameResult.USER_WIN when playing ROCK against SCISSORS', () => {
    expect(getUserResult(Hand.ROCK, Hand.SCISSORS)).toBe(GameResult.USER_WIN);
  });

  it('be GameResult.USER_WIN when playing SCISSORS against PAPER', () => {
    expect(getUserResult(Hand.SCISSORS, Hand.PAPER)).toBe(GameResult.USER_WIN);
  });

  it('be 0 when playing ROCK against ROCK', () => {
    expect(getUserResult(Hand.ROCK, Hand.ROCK)).toBe(GameResult.DRAW);
  });

  it('be 0 when playing SCISSORS against SCISSORS', () => {
    expect(getUserResult(Hand.SCISSORS, Hand.SCISSORS)).toBe(GameResult.DRAW);
  });

  it('be 0 when playing SCISSORS against SCISSORS', () => {
    expect(getUserResult(Hand.SCISSORS, Hand.SCISSORS)).toBe(GameResult.DRAW);
  });

  it('be GameResult.USER_LOSS when playing ROCK against PAPER', () => {
    expect(getUserResult(Hand.ROCK, Hand.PAPER)).toBe(GameResult.USER_LOSS);
  });

  it('be GameResult.USER_LOSS when playing SCISSORS against ROCK', () => {
    expect(getUserResult(Hand.SCISSORS, Hand.ROCK)).toBe(GameResult.USER_LOSS);
  });

  it('be GameResult.USER_LOSS when playing PAPER against SCISSORS', () => {
    expect(getUserResult(Hand.PAPER, Hand.SCISSORS)).toBe(GameResult.USER_LOSS);
  });
});
