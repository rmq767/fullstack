import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  @ApiProperty({ description: '用户名', example: 'user1' })
  username: string;
  @prop()
  @ApiProperty({ description: '密码', example: 'pass1' })
  password: string;
}
