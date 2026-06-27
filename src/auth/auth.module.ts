import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('TOKEN_EXPIRY', '1d') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, JwtAuthGuard, GqlAuthGuard],
  exports: [JwtAuthGuard, UserModule, JwtModule],
})
export class AuthModule {}
