import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true 
  }), UsersModule, ReportsModule],
  controllers: [AppController, ReportsController],
  providers: [AppService, ReportsService],
})
export class AppModule {}
