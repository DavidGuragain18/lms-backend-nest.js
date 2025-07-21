import { Module } from '@nestjs/common';
import { TestQuestionController } from './test_question.controller';
import { TestQuestionService } from './test_question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestQuestion, testQuestionSchema } from 'src/schema/course.test.schema';

@Module({
  controllers: [TestQuestionController],
  providers: [TestQuestionService],
  imports: [
    MongooseModule.forFeature([{ name: TestQuestion.name, schema: testQuestionSchema }]),
  ]
})
export class TestQuestionModule {}
