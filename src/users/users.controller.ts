import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerSerivce } from '../logger/logger.sevice';

export class UserController extends BaseController {
  constructor(logger: LoggerSerivce) {
    super(logger);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'login');
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }
}