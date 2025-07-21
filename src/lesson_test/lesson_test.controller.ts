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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LessonTestService } from './lesson_test.service';
import { CreateTestDto } from './create-test.dto';
import { CourseTest } from 'src/schema/course.test.schema';
import { UpdateTestDto } from './update-test.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('lesson-tests') // Groups endpoints under "lesson-tests" in Swagger
@Controller('lessons/:lessonId/tests')
export class LessonTestController {
  constructor(private readonly testService: LessonTestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new test for a lesson' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson', example: '687dfbe86be859bf15944438' })
  @ApiBody({ type: CreateTestDto, description: 'Test creation data' })
  @ApiResponse({ status: 201, description: 'Test created successfully', type: CourseTest })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  async create(
    @Param('lessonId') lessonId: string,
    @Body() createTestDto: CreateTestDto,
  ): Promise<CourseTest> {
    return this.testService.create({ ...createTestDto, lesson: lessonId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all tests for a specific lesson' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson', example: '687dfbe86be859bf15944438' })
  @ApiResponse({ status: 200, description: 'List of tests retrieved successfully', type: [CourseTest] })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async findAllByLesson(
    @Param('lessonId') lessonId: string,
  ): Promise<CourseTest[]> {
    return this.testService.findAllByLesson(lessonId);
  }

  @Get(':testId')
  @ApiOperation({ summary: 'Get a specific test by ID' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson', example: '687dfbe86be859bf15944438' })
  @ApiParam({ name: 'testId', description: 'ID of the test (UUID)', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Test retrieved successfully', type: CourseTest })
  @ApiResponse({ status: 404, description: 'Test not found' })
  async findOne(
    @Param('testId', ParseUUIDPipe) testId: string,
  ): Promise<CourseTest> {
    return this.testService.findOne(testId);
  }

  @Put(':testId')
  @ApiOperation({ summary: 'Update a specific test by ID' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson', example: '687dfbe86be859bf15944438' })
  @ApiParam({ name: 'testId', description: 'ID of the test (UUID)', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateTestDto, description: 'Updated test data' })
  @ApiResponse({ status: 200, description: 'Test updated successfully', type: CourseTest })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiResponse({ status: 404, description: 'Test not found' })
  async update(
    @Param('testId', ParseUUIDPipe) testId: string,
    @Body() updateTestDto: UpdateTestDto,
  ): Promise<CourseTest> {
    return this.testService.update(testId, updateTestDto);
  }

  @Delete(':testId')
  @HttpCode(HttpStatus.NO_CONTENT) // Changed to 204 for DELETE success with no content
  @ApiOperation({ summary: 'Delete a specific test by ID' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson', example: '687dfbe86be859bf15944438' })
  @ApiParam({ name: 'testId', description: 'ID of the test (UUID)', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 204, description: 'Test deleted successfully' })
  @ApiResponse({ status: 404, description: 'Test not found' })
  async remove(
    @Param('testId', ParseUUIDPipe) testId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.testService.remove(testId);
  }

  @Get(':testId/validate-answer')
  @ApiOperation({ summary: 'Validate a user answer for a specific test question' })
  @ApiParam({ name: 'lessonId', description: 'ID of the lesson', example: '687dfbe86be859bf15944438' })
  @ApiParam({ name: 'testId', description: 'ID of the test (UUID)', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiQuery({ name: 'question', description: 'Index of the question', example: 0, type: Number })
  @ApiQuery({ name: 'answer', description: 'Index of the selected answer', example: 1, type: Number })
  @ApiResponse({ status: 200, description: 'Validation result returned', })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid query parameters' })
  @ApiResponse({ status: 404, description: 'Test not found' })
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