import { Episode } from './models/episode.model';
import { Course } from './models/course.model';
import { User } from './models/user.model';
import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';

const models = TypegooseModule.forFeature([User, Course, Episode]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/fullstack', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
