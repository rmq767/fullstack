import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  @ApiProperty({ description: '用户名', example: 'user1' })
  username: string;
  @prop({
    select: false, //除非手动查询，否则不会返回
    set(val) {
      return val ? hashSync(val) : val;
    },
    get(val) {
      return val;
    },
  })
  @ApiProperty({ description: '密码', example: 'pass1' })
  password: string;
}
