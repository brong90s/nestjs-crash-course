import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity'

@Injectable()
export class UsersService {
  // repo: Repository<User>
  // constructor(repo: Repository<User>) {
  //   this.repo = repo
  // }

  // SAME AS 
  // constructor(private repo: Repository<User>) {}


  // 1. our argument name is 'repo'
  // 2. 'private' just used to do the abbreviate of property definition and assignment like above
  // 3. the type meditation of 'repo' is 'Repository', and we also applied a generic type to it of 'User'. MEAN => 'repo' is going to be an instance of a typeorm 'Repository' that deals with instances of 'User'
  // 4. '@InjectRepository(User)' this going to tell Dependency Injection system that we need the 'Repository<User>'
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  create(email: string, password: string) {
    // create a new instance of user.entity then assign email and password to that user.entity
    const user = this.repo.create({email, password})

    // save to database
    return this.repo.save(user)
  }

  findOne(id: number) {
    if(!id) {
      return null
    }
    return this.repo.findOne(id)
  }

  find(email: string) {
    return this.repo.find({email})
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)
    console.log(id)
    if(!user) {
      throw new NotFoundException('User not found!')
    }
    // 'Object.assign()' : take all properties and value of 'attrs' and copy them directly over to 'user' and overwriting any properties that already in there
    Object.assign(user, attrs)

    return this.repo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return this.repo.remove(user)
  }
}
