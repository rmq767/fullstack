import { Episode } from './episode.model';
import { prop, modelOptions, Ref, arrayProp } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true }, //查询虚拟字段episodes
  },
})
export class Course {
  @prop()
  @ApiProperty({ description: '课程名称' })
  name: string;
  @prop()
  @ApiProperty({ description: '封面图' })
  cover: string;
  @arrayProp({
    ref: 'Episode',
    localField: '_id',
    foreignField: 'course',
  })
  episodes: Ref<Episode>[];
}
