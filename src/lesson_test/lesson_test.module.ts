import { Module } from '@nestjs/common';
import { LessonTestController } from './lesson_test.controller';
import { LessonTestService } from './lesson_test.service';

@Module({
  controllers: [LessonTestController],
  providers: [LessonTestService]
})
export class LessonTestModule {}
