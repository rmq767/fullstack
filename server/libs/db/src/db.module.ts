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
    TypegooseModule.forRootAsync({
      //异步加载为了读到CommonModule里面的DbModule
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
          useUnifiedTopology: true,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
