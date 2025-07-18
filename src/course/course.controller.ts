import { Body, Controller, Post, Get, Param, Put, Delete, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { UpdateCourseDto } from './update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

   @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create course with cover image',
    type: CreateCourseDto,
  })
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Course successfully created' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request - invalid data or file type' 
  })
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    return this.courseService.create(createCourseDto, coverImage);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'List of all courses' })
  async findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'Course found' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a course' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Course updated' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 204, description: 'Course deleted' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}