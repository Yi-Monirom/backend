import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLookInput } from './dto/create-look.input';
import { Look } from './entities/look.entity';

@Injectable()
export class LookService {
  constructor(
    @InjectRepository(Look)
    private readonly lookRepository: Repository<Look>,
  ) {}

  async create(createLookInput: CreateLookInput): Promise<Look> {
    const look = this.lookRepository.create(createLookInput);
    return this.lookRepository.save(look);
  }

  async findAll(): Promise<Look[]> {
    return this.lookRepository.find();
  }

  async findOne(id: number): Promise<Look> {
    const look = await this.lookRepository.findOne({ where: { id } });
    if (!look) throw new NotFoundException(`Look #${id} not found`);
    return look;
  }

  async remove(id: number): Promise<Look> {
    const look = await this.findOne(id);
    await this.lookRepository.remove(look);
    return look;
  }
}
