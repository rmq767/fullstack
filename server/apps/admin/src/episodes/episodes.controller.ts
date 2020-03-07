import { Course } from './../../../../libs/db/src/models/course.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Episode } from './../../../../libs/db/src/models/episode.model';
import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly Coursemodel: ReturnModelType<typeof Course>,
  ) {}
  @Get('option')
  async option() {
    const courses = (await this.Coursemodel.find()).map(v => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '课时管理',
      translate: false, //解决$course报错
      column: [
        {
          label: '课时名称',
          prop: 'name',
          span: 24,
          row: true,
        },
        {
          label: '所属课程',
          prop: 'course',
          type: 'select',
          row: true,
          dicData: courses,
        },
        {
          label: '视频文件',
          prop: 'file',
          type: 'upload',
          row: true,
          span: 24,
          width: '120',
          action: '/upload',
          params: {
            is: 'video',
          },
          listType: 'picture-img',
        },
      ],
    };
  }
}
