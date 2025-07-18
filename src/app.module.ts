import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';
import { CourseLessonService } from './course_lesson/course_lesson.service';
import { CourseLessonModule } from './course_lesson/course_lesson.module';
import { CourseLessonController } from './course_lesson/course_lesson.controller';
import { LessonTestModule } from './lesson_test/lesson_test.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
   MongooseModule.forRoot('mongodb://localhost:27017/'),
   AuthenticationModule,
   CourseModule,
   CourseLessonModule,
   LessonTestModule,
   UploadModule,
  ],
  controllers: [AppController, CourseController, CourseLessonController],
  providers: [AppService, CourseService, CourseLessonService],
})
export class AppModule {}
