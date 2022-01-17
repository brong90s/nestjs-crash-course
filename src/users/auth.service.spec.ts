import { Test } from '@nestjs/testing'
import { doesNotReject } from 'assert'
import { catchError } from 'rxjs'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { UsersService } from './users.service'

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  
  beforeEach(async () => {
    // Create a fake copy of the user service
    // by using 'Partial<>' mean that we are not required to define every methods that 'UsersService' has, but Typescript only check the ones that we define. So in here we define 'find' and 'create' methods so Typescript only check these two and it only make sure that we define them correctly.
    fakeUsersService = {
      // 'fake' version of 'find' methods from 'UsersService'
      find: () => Promise.resolve([]),
      // 'fake' version of 'create' methods from 'UsersService'
      create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User)
    }
    const module = await Test.createTestingModule({
      // 1. 'providers[]' is the listing of all different class that we might want to inject or register into/inside our DI container.
      // 2. once we add these providers in or this list of classes, the DI container can then figure out how to create any instance we want.
      // 3. whenever we create an instance of one of those classes, the DI container will create instance of all the dependencies of that class as well.
      providers: [
        AuthService,
        // this below object mean : 
        // 1. if any one asked for a copy for 'UsersService', then give them the value of 'fakeUsersService'
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile()
    
    // ask container to create an instance of 'AuthService'
    service = module.get(AuthService)
  })


  // 'it' statement does is, it try to test one aspect of our code inside this test.
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined()
  })

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('testing@gmail.com', 'adsf')

    expect(user.password).not.toEqual('adsf')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'affd', password: 'b'} as User])

    try {
      await service.signup('om', 'adsf')
    } catch(err) {
      // not working fine with async and return Promise
    }
    
  })
})