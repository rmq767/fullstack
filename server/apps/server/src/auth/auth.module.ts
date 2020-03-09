import { JwtStrategy } from './jwt.strategy';
import { localStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [localStrategy, JwtStrategy],
})
export class AuthModule {}
