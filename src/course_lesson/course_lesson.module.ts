import { Module } from '@nestjs/common';
import { CourseLessonService } from './course_lesson.service';
import { CourseLessonController } from './course_lesson.controller';

@Module({
    controllers:[CourseLessonController],
    providers: [CourseLessonService]
})
export class CourseLessonModule {

}
