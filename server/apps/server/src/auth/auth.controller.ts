import { LoginDto } from './dto/login.dto';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import {
  User,
  UserDocument,
} from './../../../../libs/db/src/models/user.model';
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>, //ReturnModelType<typeof User>,才能使用mongo的语法
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() body: RegisterDto) {
    const { username, password } = body;
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() body: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }
  @Get('user')
  @ApiOperation({ summary: '用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    //User类型的mongoose文档
    return user;
  }
}
