import { App } from './appa';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerSerivce } from './logger/logger.sevice';
import { UserController } from './users/users.controller';

async function bootstrap() {
  const logger = new LoggerSerivce();
  const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));
  await app.init();
}

bootstrap();
