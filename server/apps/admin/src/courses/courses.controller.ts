import { InjectModel } from 'nestjs-typegoose';
import { Course } from './../../../../libs/db/src/models/course.model';
import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}
  @Get('option')
  option() {
    return {
      title: '课程管理',
      searchMenuSpan: 8,
      column: [
        {
          label: '课程名称',
          prop: 'name',
          sortable: true,
          search: true,
          regex: true,
          row: true,
        },
        {
          label: '课程封面图',
          prop: 'cover',
          type: 'upload',
          listType: 'picture-img',
          row: true,
          width: 120,
          action: '/upload',
        },
      ],
    };
  }
}
