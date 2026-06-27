import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookService } from './look.service';
import { LookResolver } from './look.resolver';
import { Look } from './entities/look.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Look])],
  providers: [LookResolver, LookService],
  exports: [LookService],
})
export class LookModule {}
