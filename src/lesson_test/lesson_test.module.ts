import { Module } from '@nestjs/common';
import { LessonTestController } from './lesson_test.controller';
import { LessonTestService } from './lesson_test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseTest, courseTestSchema } from 'src/schema/course.test.schema';
import { CourseLessonModule } from 'src/course_lesson/course_lesson.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [LessonTestController],
  providers: [LessonTestService],
  imports: [
     MongooseModule.forFeature([{ name: CourseTest.name, schema: courseTestSchema }]), 
     CourseModule,  
     CourseLessonModule,
  ]
})
export class LessonTestModule {}
