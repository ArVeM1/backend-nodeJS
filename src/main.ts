import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.sevice';
import { ExeptionFilter } from './errors/exeption.filter';
import { UserController } from './users/users.controller';
import { App } from './app';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUsersController } from './users/users.controller.interface';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/user.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUserRepository } from './users/user.repository.interface';
import { UserRepository } from './users/user.repository';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUsersController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IUserRepository>(TYPES.UsersRepository).to(UserRepository).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
