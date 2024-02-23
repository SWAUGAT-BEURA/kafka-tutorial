import { Controller, Get ,ValidationPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern,Payload } from '@nestjs/microservices';
import { MakePaymentDto } from './dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('process_payment')
  handleProcessPayment(@Payload(ValidationPipe) data:MakePaymentDto){
    this.appService.processPayment(data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
