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
  async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const user = this.userRepository.create({
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        email: createUserDto.email,
        password: hashedPassword,
        createdDate: createUserDto.createdDate,
        updatedData: createUserDto.updatedDate,
      });

      await this.userRepository.save(user);
    } catch (error) {
      return error;
    }
  }
}
