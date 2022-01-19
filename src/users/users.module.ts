import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // }
  ]
})
export class UsersModule {

  // this 'CurrentUserMiddleware' is sit between 'Cookie-SessionMiddleware' and 'AdminGuard'
  // here is the flow:
  // 1. Request
  // 2. 'Cookie-SessionMiddleware'
  // 3. 'CurrentUserMiddleware'
  // 4. AdminGuard
  // 5. Request Handler
  // 6. Response

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
