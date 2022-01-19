import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

// 1. go and find 'Express' library
// 2. find the interface called 'Request'
// 3. added one more property inside there called 'currentUser'
// 4. so the 'req: Request' object might have 'currentUser' and if it is defined, it going to set to a 'User' entity instance
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//       session?: any;
//     }
//   }
// }

// OR
export interface IGetUserAuthInfoRequest extends Request {
  currentUser?: User
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
