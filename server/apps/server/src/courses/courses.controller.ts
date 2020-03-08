import { Course } from './../../../../libs/db/src/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
  routes: {
    create: false,
    update: false,
    delete: false,
  },
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model) {}
}
