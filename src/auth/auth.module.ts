import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'mobile-project-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
