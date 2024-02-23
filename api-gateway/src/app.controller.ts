import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return {
      statusCode: 200,
      message: this.appService.getHello(),
      date: new Date().toISOString()
      
    }
  }
}
