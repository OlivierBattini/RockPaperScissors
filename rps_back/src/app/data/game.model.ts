import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { GameStatus, Hand } from '../../constants/game';

@Table({
  tableName: 'game',
  updatedAt: false,
  deletedAt: false,
})
export class Game extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID) // DataType.UUIDV4 not supported by postgres
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  userName: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.INTEGER))
  userHands: Hand[];

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.INTEGER))
  computerHands: Hand[];

  @AllowNull(false)
  @Column(DataType.INTEGER)
  gameStatus: GameStatus;
}
