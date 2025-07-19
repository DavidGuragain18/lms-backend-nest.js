import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CourseLessonService } from './course_lesson.service';
import { CourseLesson } from 'src/schema/course_lesson.schema';
import { CreateCourseLessonDto } from './create-course-lesson.dto';
import { UpdateCourseLessonDto } from './update-course-lesson.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { InterceptorsConsumer } from '@nestjs/core/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('courses/:courseId/lessons')
export class CourseLessonController {
  constructor(private readonly lessonService: CourseLessonService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("pdfUrl", multerOptions))
  @ApiBody({
    type: CreateCourseLessonDto,
    description: "Create a new course lesson",
  })
  async create(
    @Param('courseId') courseId: string,
    @Body() createCourseLessonDto: CreateCourseLessonDto,
    @UploadedFile() pdfUrl: Express.Multer.File,
    // @Fileup
  ): Promise<CourseLesson> {
    console.log("Create course dto", createCourseLessonDto, pdfUrl);
    return this.lessonService.create(createCourseLessonDto, courseId, pdfUrl);
  }

  @Get()
  async findAllByCourse(
    @Param('courseId') courseId: string,
  ): Promise<CourseLesson[]> {
    return this.lessonService.findAllByCourse(courseId);
  }

  @Get(':lessonId')
  async findOne(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<CourseLesson> {
    return this.lessonService.findOne(lessonId);
  }

  @Put(':lessonId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("pdfUrl", multerOptions))
  @ApiBody({
    type: UpdateCourseLessonDto,
    description: "Update a course lesson",
  })
  async update(
    @Param('lessonId') lessonId: string,
    @Body() updateCourseLessonDto: UpdateCourseLessonDto,
    @UploadedFile() pdfUrl?: Express.Multer.File
  ): Promise<CourseLesson> {
    return this.lessonService.update(lessonId, updateCourseLessonDto, pdfUrl);
  }

  @Delete(':lessonId')
  async remove(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.lessonService.remove(lessonId);
  }
}