import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';    
import { CreateUserDto } from 'src/dto';


@Injectable()
export class AuthServiceService {
    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly authClient:ClientKafka
    ){}

    createUser(createUserDto:CreateUserDto){
        return this.authClient.send('create-user',JSON.stringify(createUserDto))
    }
}
