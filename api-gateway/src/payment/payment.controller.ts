import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from '../dto/make-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }
    
    @Post('pay')
    async makePayment(@Body(ValidationPipe) paymentDto: MakePaymentDto) {
        return this.paymentService.makePayment(paymentDto);
    }
}
