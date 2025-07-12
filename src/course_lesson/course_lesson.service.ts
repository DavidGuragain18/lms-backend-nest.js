import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/schema/course.schema';
import { CourseLesson, CourseLessonDocument } from 'src/schema/course_lesson.schema';
import { CreateCourseLessonDto } from './create-course-lesson.dto';
import { UpdateCourseLessonDto } from './update-course-lesson.dto';

@Injectable()
export class CourseLessonService {
  constructor(
    @InjectModel(CourseLesson.name) 
    private readonly lessonModel: Model<CourseLessonDocument>,
    @InjectModel(Course.name) 
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseLessonDto: CreateCourseLessonDto): Promise<CourseLesson> {
    // Check if course exists
    const course = await this.courseModel.findById(createCourseLessonDto.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Create the lesson
    const lesson = new this.lessonModel(createCourseLessonDto);
    const savedLesson = await lesson.save();

    // Add lesson to course's lessons array
    await this.courseModel.findByIdAndUpdate(
      createCourseLessonDto.courseId,
      { $push: { lessons: savedLesson._id } },
      { new: true },
    );

    return savedLesson;
  }

  async findAllByCourse(courseId: string): Promise<CourseLesson[]> {
    const course = await this.courseModel.findById(courseId).populate('lessons');
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course.lessons as CourseLesson[];
  }

  async findOne(id: string): Promise<CourseLesson> {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async update(id: string, updateCourseLessonDto: UpdateCourseLessonDto): Promise<CourseLesson> {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      id,
      updateCourseLessonDto,
      { new: true },
    );
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    // Find the lesson to get the course reference
    const lesson = await this.lessonModel.findByIdAndDelete(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Remove the lesson reference from the course
    await this.courseModel.findByIdAndUpdate(
      lesson.course,
      { $pull: { lessons: lesson._id } },
    );

    return { deleted: true };
  }
}