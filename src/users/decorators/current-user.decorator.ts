import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    // to get 'SessionObject'
    const request = context.switchToHttp().getRequest()
    
    // retrieve data from 'request object of interceptor'
    return request.currentUser
  }
)