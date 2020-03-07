import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //这两个模块是同步加载的，ConfigModule里面的配置可能没读到就进入DbModule了，导致读不到配置
    ConfigModule.forRoot({
      //配置模块
      isGlobal: true, //ConfigModule任意位置可以使用
    }),
    DbModule, //数据库模块
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
