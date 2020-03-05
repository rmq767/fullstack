import { Episode } from './episode.model';
import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @prop()
  @ApiProperty({ description: '课程名称' })
  name: string;
  @prop()
  @ApiProperty({ description: '封面图' })
  cover: string;
  @arrayProp({ itemsRef: 'Episode' })
  episodes: Ref<Episode>[];
}
