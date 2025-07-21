import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TestQuestionService } from "./test_question.service";
import { TestQuestion } from "src/schema/course.test.schema";
import { CreateTestQuestionDto } from "./create-test-question.dto";
import { UpdateTestQuestionDto } from "./update-test-question.dto";

@ApiTags('test-questions') // Groups endpoints under "test-questions" in Swagger
@Controller('test-question')
export class TestQuestionController {
  constructor(private readonly testQuestionService: TestQuestionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new test question' })
  @ApiBody({ type: CreateTestQuestionDto, description: 'Test question creation data' })
  @ApiResponse({ status: 201, description: 'Test question created successfully', type: TestQuestion })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  async create(@Body() createTestQuestionDto: CreateTestQuestionDto): Promise<TestQuestion> {
    return this.testQuestionService.create(createTestQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all test questions' })
  @ApiResponse({ status: 200, description: 'List of all test questions', type: [TestQuestion] })
  @ApiResponse({ status: 404, description: 'No test questions found' })
  async findAll(): Promise<TestQuestion[]> {
    return this.testQuestionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a test question by ID' })
  @ApiParam({ name: 'id', description: 'ID of the test question', example: '687dfbe86be859bf15944439' })
  @ApiResponse({ status: 200, description: 'Test question retrieved successfully', type: TestQuestion })
  @ApiResponse({ status: 404, description: 'Test question not found' })
  async findOne(@Param('id') id: string): Promise<TestQuestion> {
    return this.testQuestionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a test question by ID' })
  @ApiParam({ name: 'id', description: 'ID of the test question', example: '687dfbe86be859bf15944439' })
  @ApiBody({ type: UpdateTestQuestionDto, description: 'Updated test question data' })
  @ApiResponse({ status: 200, description: 'Test question updated successfully', type: TestQuestion })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiResponse({ status: 404, description: 'Test question not found' })
  async update(
    @Param('id') id: string,
    @Body() updateTestQuestionDto: UpdateTestQuestionDto,
  ): Promise<TestQuestion> {
    return this.testQuestionService.update(id, updateTestQuestionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a test question by ID' })
  @ApiParam({ name: 'id', description: 'ID of the test question', example: '687dfbe86be859bf15944439' })
  @ApiResponse({ status: 204, description: 'Test question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Test question not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.testQuestionService.remove(id);
  }
}