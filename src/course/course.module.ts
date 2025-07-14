import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, courseSchema } from 'src/schema/course.schema';

@Module({
    controllers: [CourseController],
    providers: [CourseService],
    imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: courseSchema }]),
  ],
  exports:[
    MongooseModule
  ]
})
export class CourseModule {
    
}
