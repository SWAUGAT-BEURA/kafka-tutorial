import { Injectable,Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MakePaymentDto } from 'src/dto';

@Injectable()
export class PaymentService {
    constructor(@Inject('PAYMENT_MICROSERVICE') private client: ClientKafka) { }
    makePayment(makePaymentDto: MakePaymentDto) {
        return this.client.emit('process_payment', JSON.stringify(makePaymentDto));
    }
}
