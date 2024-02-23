import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('getHello', () => {
        it('should return the hello message with status code 200', () => {
            const mockMessage = 'Hello, World!';
            jest.spyOn(appService, 'getHello').mockReturnValue(mockMessage);

            const result = appController.getHello();

            expect(result).toEqual({
                statusCode: 200,
                message: mockMessage,
                date: expect.any(String),
            });
        });
    });
});