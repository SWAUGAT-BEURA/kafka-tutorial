import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { CreateUserDto } from 'src/dto';

@Controller('auth')
export class AuthModuleController {
    constructor(private readonly authServiceService:AuthServiceService){}

    @Post('sign-up')
    async createUser(@Body(ValidationPipe) createUserDto:CreateUserDto){
        return this.authServiceService.createUser(createUserDto)
    }

    @Get('get-user/:id')
    async getUser(@Param('id') id:string){
        return this.authServiceService.getUser(id)
    }
}
