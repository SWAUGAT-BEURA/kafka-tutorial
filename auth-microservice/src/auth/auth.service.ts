import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Db, Collection } from 'mongodb';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
    private readonly usersCollection: Collection;

    constructor(@Inject('DATABASE_CONNECTION') private db: Db,private readonly jwtService: JwtService) {
        this.usersCollection = db.collection('users');
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersCollection.findOne({ username: username });
        if (user && await bcrypt.compare(password, user.password)) {
          return user;
        }
        return null;
      }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;
    
        // Validate user credentials
        const user = await this.validateUser(username, password);
        if (!user) {
          throw new UnauthorizedException('Invalid username or password');
        }
    
        // Create JWT payload
        const payload = { username: user.username, sub: user.userId };
        
        // Return JWT token
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = {
          username: createUserDto.name,
          password: hashedPassword,
          email: createUserDto.email,
        };
        console.log(user);
        await this.usersCollection.insertOne(user);
        return user;
      }
    
      async findByUsername(username: string): Promise<any> {
        return this.usersCollection.findOne({ username });
      }
}
