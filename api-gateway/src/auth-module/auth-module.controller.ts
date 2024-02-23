import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { CreateUserDto } from 'src/dto';

@Controller('auth')
export class AuthModuleController {
    constructor(private readonly authServiceService:AuthServiceService){}

    @Post('sign-up')
    createUser(@Body(ValidationPipe) createUserDto:CreateUserDto){
        return this.authServiceService.createUser(createUserDto)
    }
}
