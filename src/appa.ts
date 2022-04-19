import express, { Express } from 'express';
import { Server } from 'http';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerSerivce } from './logger/logger.sevice';
import { UserController } from './users/users.controller';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerSerivce;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(logger: LoggerSerivce, userController: UserController, exeptionFilter: ExeptionFilter) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
