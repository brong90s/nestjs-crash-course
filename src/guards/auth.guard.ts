import {
  CanActivate, 
  ExecutionContext
} from '@nestjs/common'

export class AuthGuard implements CanActivate {
  // 'ExecutionContext' : in theory it can be used with different communication protocol such as HTTP, gRPC...
  canActivate(context: ExecutionContext) {
    // look at incoming request, and then decide allow or reject thosse request
    const request = context.switchToHttp().getRequest()

    // 1. if 'userId' exists, that mean user can access whatever route we've applied the guard to.
    // 2. if 'userId' is false, null, undefined or anything like that, so we'll prevent access to a given handler or controller
    return request.session.userId;
  }
}