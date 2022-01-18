import { 
  AfterInsert, 
  AfterRemove, 
  AfterUpdate, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string; 

  @Column()
  @Exclude()
  password: string

  // Understand argument
  // 1. first argument '() => Report' => a function that return the 'Report' entity class. It used to solve circular dependency issue.
  // 2. second argument => a function that take an instance of report, and it going to return reports user.
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this.id)
  }
}