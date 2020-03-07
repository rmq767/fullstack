import { Course } from './course.model';
import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop()
  @ApiProperty({ description: '课时名称' })
  name: string;
  @prop()
  @ApiProperty({ description: '文件' })
  file: string;
  @prop({ ref: 'Course ' })
  course: Ref<Course>;
}
