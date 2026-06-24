import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: createUserInput.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { resetToken: token } });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserInput.name !== undefined) user.name = updateUserInput.name;
    if (updateUserInput.email !== undefined) user.email = updateUserInput.email;
    if (updateUserInput.phone !== undefined) user.phone = updateUserInput.phone;
    if (updateUserInput.avatarUrl !== undefined) user.avatarUrl = updateUserInput.avatarUrl;
    if (updateUserInput.password !== undefined) {
      user.password = await bcrypt.hash(updateUserInput.password, 10);
    }
    if (updateUserInput.resetToken !== undefined) user.resetToken = updateUserInput.resetToken;
    if (updateUserInput.resetTokenExpiry !== undefined) user.resetTokenExpiry = updateUserInput.resetTokenExpiry;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }
}
