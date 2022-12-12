import * as dotenv from 'dotenv';
dotenv.config();

export class Env {
  public static get HTTP_PORT(): number {
    return parseInt(process.env.HTTP_PORT) || 3000;
  }

  public static get DB_URL(): string {
    return process.env.DB_URL || 'postgresql://localhost:5432/rpsgame';
  }

  public static get DB_LOGGING(): boolean {
    return process.env.DB_LOGGING.toLowerCase() === 'true';
  }
}
