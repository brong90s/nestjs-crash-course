import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService){}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const { userId } = request.session

    // if user does exist, then make a query 
    if(userId) {
      const user = await this.usersService.findOne(userId)
      // assign to 'request object' in order to 'decorator' be able to retrieve
      request.currentUser = user
    }

    // else just run the actual route handler
    return handler.handle()
  }
}