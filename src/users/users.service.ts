import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const user = this.userRepository.create({
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        email: createUserDto.email,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      return error;
    }
  }
}
