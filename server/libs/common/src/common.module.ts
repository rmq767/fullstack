import { DbModule } from '@libs/db';
import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    //这两个模块是同步加载的，ConfigModule里面的配置可能没读到就进入DbModule了，导致读不到配置
    ConfigModule.forRoot({
      //配置模块
      isGlobal: true, //ConfigModule任意位置可以使用
    }),
    DbModule, //数据库模块
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
