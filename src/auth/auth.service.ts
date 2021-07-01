import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(data: CreateAuthDto): Promise<any> {
    const { email, password } = data;

    try {
      const user = this.userRepository.findOne({ email });
      if (user && (await bcrypt.compareSync(password, (await user).password))) {
        const payload = { email };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        return 'not found';
        // throw new UnauthorizedException('Please check your login Credentials');
      }
    } catch (error) {
      return error;
    }
  }
}
