import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

// this interceptor used to intercept the incoming request to our application. 
// 1. each request we take a look at the request cookie through the request session property
// 2. we used that cookie or that session to figure out who the current user is or who the person that's making this request is.
// 3. then we fetch that person by using our 'usersService' and assign that user to 'request.currentUser'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService){}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const { userId } = request.session || {}

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