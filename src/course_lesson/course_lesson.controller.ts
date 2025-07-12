import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CourseLessonService } from './course_lesson.service';
import { CourseLesson } from 'src/schema/course_lesson.schema';
import { CreateCourseLessonDto } from './create-course-lesson.dto';
import { UpdateCourseLessonDto } from './update-course-lesson.dto';

@Controller('courses/:courseId/lessons')
export class CourseLessonController {
  constructor(private readonly lessonService: CourseLessonService) {}

  @Post()
  async create(
    @Param('courseId') courseId: string,
    @Body() createCourseLessonDto: CreateCourseLessonDto,
  ): Promise<CourseLesson> {
    return this.lessonService.create({ ...createCourseLessonDto, courseId });
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
  async update(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
    @Body() updateCourseLessonDto: UpdateCourseLessonDto,
  ): Promise<CourseLesson> {
    return this.lessonService.update(lessonId, updateCourseLessonDto);
  }

  @Delete(':lessonId')
  async remove(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.lessonService.remove(lessonId);
  }
}