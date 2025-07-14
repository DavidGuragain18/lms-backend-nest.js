import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { LessonTestService } from './lesson_test.service';
import { CreateTestDto } from './create-test.dto';
import { CourseTest } from 'src/schema/course.test.schema';
import { UpdateTestDto } from './update-test.dto';


@Controller('lessons/:lessonId/tests')
export class LessonTestController {
  constructor(private readonly testService: LessonTestService) {}

  @Post()
  async create(
    @Param('lessonId') lessonId: string,
    @Body() createTestDto: CreateTestDto,
  ): Promise<CourseTest> {
    return this.testService.create({ ...createTestDto, lesson: lessonId });
  }

  @Get()
  async findAllByLesson(
    @Param('lessonId') lessonId: string,
  ): Promise<CourseTest[]> {
    return this.testService.findAllByLesson(lessonId);
  }

  @Get(':testId')
  async findOne(
    @Param('testId', ParseUUIDPipe) testId: string,
  ): Promise<CourseTest> {
    return this.testService.findOne(testId);
  }

  @Put(':testId')
  async update(
    @Param('testId', ParseUUIDPipe) testId: string,
    @Body() updateTestDto: UpdateTestDto,
  ): Promise<CourseTest> {
    return this.testService.update(testId, updateTestDto);
  }

  @Delete(':testId')
  async remove(
    @Param('testId', ParseUUIDPipe) testId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.testService.remove(testId);
  }

  @Get(':testId/validate-answer')
  async validateAnswer(
    @Param('testId', ParseUUIDPipe) testId: string,
    @Query('question') questionIndex: number,
    @Query('answer') answerIndex: number,
  ): Promise<{ correct: boolean }> {
    const correct = await this.testService.validateAnswer(
      testId,
      questionIndex,
      answerIndex,
    );
    return { correct };
  }
}