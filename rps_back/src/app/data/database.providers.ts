import { Sequelize } from 'sequelize-typescript';

import { Env } from 'src/config/env';
import { Ioc } from 'src/constants/ioc';
import { Game } from './game.model';

function databaseCustomLogger(queryString, queryObject) {
  console.log(queryString);
  console.log(queryObject.bind);
}

export const databaseProviders = [
  {
    provide: Ioc.DATABASE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize(Env.DB_URL, {
        logging: Env.DB_LOGGING ? databaseCustomLogger : false,
        models: [Game],
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
